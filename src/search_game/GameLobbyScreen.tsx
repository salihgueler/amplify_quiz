import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ScreenProps } from "../../App";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "@aws-amplify/api";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

const GameLobbyScreen = ({ navigation }: ScreenProps<"GameLobbyScreen">) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const client = generateClient<Schema>();

  const routeParams = navigation
    .getState()
    .routes.findLast((route) => route.name === "GameLobbyScreen");

  const params = routeParams?.params || { selectedCategories: [] };

  useEffect(() => {
    const fetchData = async () => {
      for (const element of params.selectedCategories) {
        const games = await client.models.GamePool.list({
          filter: {
            category: {
              eq: element,
            },
          },
        });

        if (games.data.length !== 0) {
          const response = await client.queries.askBedrock({
            category: element,
          });
          const res = JSON.parse(response.data?.body!);
          const content = res.content[0].text;
          break;
        } else {
          await client.models.GamePool.create({
            category: element,
            queue: [user.userId],
          });
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF6347" />
      <Text style={styles.loadingText}>Looking for a game...</Text>
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
  countdownText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 10,
  },
});

export default GameLobbyScreen;
