import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
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
  const [informationText, setInformationText] = useState<string>(
    "Looking for a game..."
  );
  const { user } = useAuthenticator((context) => [context.user]);
  const client = generateClient<Schema>();
  const params = route?.params || { selectedCategories: [] };
  const subscriptionsRef = useRef<Array<{ unsubscribe: () => void }>>([]);

  useEffect(() => {
    const joinOrCreateGame = async (category: string) => {
      try {
        // Try to find an existing game
        const existingGames = await client.models.Game.list({
          filter: {
            category: { eq: category },
            finished: { eq: false },
          },
        });

        if (existingGames.data.length > 0) {
          setInformationText("Game Found, generating questions");

          const game = existingGames.data[0];
          // Add current player to the game
          await client.models.Player.create({
            username: user.username,
            gameId: game.id,
          });

          navigation.replace("QuestionScreen", { content: game.questions });
        } else {
          setInformationText("Game Found, generating questions");
          // Create a new game and generate questions
          const response = await client.queries.askBedrock({ category });
          const res = JSON.parse(response.data?.body!);
          const questions = res.content[0].text;

          const game = await client.models.Game.create({
            category,
            questions,
            finished: false,
          });

          // Add current player to the game
          await client.models.Player.create({
            username: user.username,
            gameId: game.data?.id,
          });

          navigation.replace("QuestionScreen", {
            content: game.data?.questions ?? "{}",
          });
        }
      } catch (error) {
        setInformationText("An error occurred while looking for a game.");
        console.error(error);
      }
    };

    if (subscriptionsRef.current.length === 0) {
      const categories = params.selectedCategories;
      categories.forEach((category) => joinOrCreateGame(category));

      // Cleanup subscriptions on component unmount
      return () => {
        subscriptionsRef.current.forEach((subscription) =>
          subscription.unsubscribe()
        );
        subscriptionsRef.current = [];
      };
    }
  }, [client, navigation, params.selectedCategories, user.username]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6347" />
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
