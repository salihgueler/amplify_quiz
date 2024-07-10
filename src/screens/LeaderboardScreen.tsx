import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import useLeaderboardData from "../hooks/useLeaderboardData";

interface LeaderboardData {
  username: string;
  points: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const LeaderboardItem: React.FC<{ item: LeaderboardData }> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.name}>{item.username}</Text>
    <Text style={styles.score}>{item.points}</Text>
  </View>
);

const LeaderboardScreen: React.FC = () => {
  const { leaderboardData, loading, error } = useLeaderboardData();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={leaderboardData}
        renderItem={({ item }) => <LeaderboardItem item={item} />}
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
