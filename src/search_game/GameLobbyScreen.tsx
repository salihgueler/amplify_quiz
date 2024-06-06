import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const category of params.selectedCategories) {
          const games = await client.models.GamePool.list({
            filter: {
              category: {
                eq: category,
              },
            },
          });

          if (games.data.length !== 0) {
            setInformationText("Game Found, generating questions");
            const response = await client.queries.askBedrock({
              category,
            });
            const res = JSON.parse(response.data?.body!);
            const content: string = res.content[0].text;
            navigation.replace("QuestionScreen", { content });
            break;
          } else {
            setInformationText("Game created, waiting for other players.");
            await client.models.GamePool.create({
              category,
              queue: [user.userId],
            });
          }
        }
      } catch (error) {
        setInformationText("An error occurred while looking for a game.");
        console.error(error);
      }
    };

    fetchData();
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
