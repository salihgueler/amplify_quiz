import { generateClient } from "aws-amplify/api";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Schema } from "../../amplify/data/resource";

interface LeaderboardScreenProps {
  username: string;
  points: number;
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const LeaderboardScreen = () => {
  const client = generateClient<Schema>();

  const [leaderboardData, setLeaderboardData] = useState<
    LeaderboardScreenProps[]
  >([]);

  useEffect(() => {
    client.models.Leaderboard.list().then(
      (data) => setLeaderboardData(data.data),
      (error) => console.error(error)
    );
  });

  const renderItem = ({ item }: { item: LeaderboardScreenProps }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.username}</Text>
      <Text style={styles.score}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.leaderboardContainer}
        ListEmptyComponent={<Text>No leaderboard data available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  leaderboardContainer: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rank: {
    width: 30,
    fontWeight: "bold",
    color: "#FF6347",
  },
  name: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "bold",
  },
  score: {
    width: 80,
    textAlign: "right",
    fontWeight: "bold",
    color: "#FF6347",
  },
});

export default LeaderboardScreen;
