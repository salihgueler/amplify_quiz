import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setInformationText, setLoading } from "../redux/slices/gameLobbySlice";
import { RootStackParamList } from "../../App";
import { Schema } from "../../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack";
import { generateClient } from "aws-amplify/api";

type GameLobbyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "GameLobbyScreen"
>;

const GameLobbyScreen: React.FC<GameLobbyScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { informationText, loading } = useSelector(
    (state: RootState) => state.gameLobby
  );
  const { user } = useAuthenticator((context) => [context.user]);
  const client = generateClient<Schema>();
  const params = route?.params || { selectedCategories: [] };
  const subscriptionsRef = useRef<Array<{ unsubscribe: () => void }>>([]);

  useEffect(() => {
    const joinOrCreateGame = async (category: string) => {
      try {
        const existingGames = await client.models.Game.list({
          filter: {
            category: { eq: category },
            finished: { eq: false },
          },
        });

        const game =
          existingGames.data.length > 0
            ? existingGames.data[0]
            : (
                await client.models.Game.create({
                  category,
                  questions: "[]",
                  currentQuestionIndex: 0,
                  finished: false,
                  ready: false,
                })
              ).data;

        // Add current player to the game
        await client.models.Player.create({
          username: user.username,
          gameId: game!.id,
        });

        // Subscribe to game updates to navigate when ready
        const subscription = client.models.Game.observeQuery({
          filter: { id: { eq: game!.id } },
        }).subscribe({
          next: async ({ items }) => {
            if (items.length > 0) {
              const updatedGame = items[0];
              // Check if game is ready to start
              if (updatedGame.ready) {
                dispatch(setInformationText("Game ready, starting..."));
                subscription.unsubscribe();
                navigation.replace("QuestionScreen", {
                  content: updatedGame.questions,
                  gameId: updatedGame.id,
                });
                return;
              }

              // If there are two players and the game is not ready, generate questions and set ready flag
              const players = await client.models.Player.list({
                filter: { gameId: { eq: updatedGame.id } },
              });
              if (players.data.length >= 2 && !updatedGame.ready) {
                dispatch(
                  setInformationText("Generating questions, please wait")
                );
                const response = await client.queries.askBedrock({ category });
                const res = JSON.parse(response.data?.body!);
                const questions = res.content[0].text;
                await client.models.Game.update({
                  id: updatedGame.id,
                  questions,
                  ready: true,
                });
              }
            }
          },
          error: (error) => {
            console.error("Error subscribing to game updates:", error);
            dispatch(
              setInformationText("An error occurred while looking for a game.")
            );
          },
        });

        subscriptionsRef.current.push(subscription);
      } catch (error) {
        console.error("Error joining or creating a game:", error);
        dispatch(
          setInformationText("An error occurred while looking for a game.")
        );
      }
    };

    const categories = params.selectedCategories;
    categories.forEach((category) => joinOrCreateGame(category));

    // Cleanup subscriptions on component unmount
    return () => {
      subscriptionsRef.current.forEach((subscription) =>
        subscription.unsubscribe()
      );
      subscriptionsRef.current = [];
    };
  }, [client, navigation, params.selectedCategories, user.username]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#FF6347" />}
      <Text style={styles.loadingText}>{informationText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 20,
  },
});

export default GameLobbyScreen;
