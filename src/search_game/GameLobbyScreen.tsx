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
    if (subscriptionsRef.current.length === 0) {
      const subscriptions = params.selectedCategories.map((category) =>
        client.models.GamePool.observeQuery({
          filter: {
            category: {
              eq: category,
            },
          },
        }).subscribe({
          next: async ({ items }) => {
            if (items.length !== 0) {
              const game = items[0];
              if (
                game.queue.length !== 0 &&
                !game.queue.includes(user.userId)
              ) {
                const updatedQueue = [...game.queue, user.userId];

                try {
                  await client.models.GamePool.update({
                    id: game.id,
                    queue: updatedQueue,
                  });
                } catch (error) {
                  setInformationText(
                    "An error occurred while updating the game queue."
                  );
                  console.error(error);
                  return;
                }
              }
              if (game.queue.some((playerId) => playerId !== user.userId)) {
                setInformationText("Game Found, generating questions");
                try {
                  const response = await client.queries.askBedrock({
                    category,
                  });
                  const res = JSON.parse(response.data?.body!);
                  const content = res.content[0].text;
                  navigation.replace("QuestionScreen", { content });
                } catch (error) {
                  setInformationText(
                    "An error occurred while generating questions."
                  );
                  console.error(error);
                }
              }
            } else {
              setInformationText("Game created, waiting for other players.");
              try {
                await client.models.GamePool.create({
                  category,
                  queue: [user.userId],
                });
              } catch (error) {
                setInformationText(
                  "An error occurred while creating the game."
                );
                console.error(error);
              }
            }
          },
          error: (error) => {
            setInformationText("An error occurred while looking for a game.");
            console.error(error);
          },
        })
      );

      subscriptionsRef.current = subscriptions;
    }

    // Cleanup subscriptions on component unmount
    return () => {
      subscriptionsRef.current.forEach((subscription) =>
        subscription.unsubscribe()
      );
      subscriptionsRef.current = [];
    };
  }, [client, navigation, params.selectedCategories, user.userId]);

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
