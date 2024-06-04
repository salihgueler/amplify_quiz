import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

interface LeaderboardScreenProps {
  username: string;
  points: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const LeaderboardScreen: React.FC = () => {
  const client = generateClient<Schema>();
  const [leaderboardData, setLeaderboardData] = useState<
    LeaderboardScreenProps[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const data = await client.models.Leaderboard.list();
        setLeaderboardData(data.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [client]);

  const renderItem = ({ item }: { item: LeaderboardScreenProps }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.username}</Text>
      <Text style={styles.score}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={leaderboardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.leaderboardContainer}
          ListEmptyComponent={<Text>No leaderboard data available.</Text>}
        />
      )}
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
