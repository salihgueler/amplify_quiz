import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} from "../redux/slices/learderboardSlice";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";

interface LeaderboardEntry {
  username: string;
  points: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const LeaderboardScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data: leaderboardData,
    loading,
    error,
  } = useSelector((state: RootState) => state.leaderboard);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      dispatch(fetchLeaderboardStart());
      try {
        const client = generateClient<Schema>();
        const data = await client.models.Leaderboard.list();
        dispatch(fetchLeaderboardSuccess(data.data));
      } catch (error) {
        dispatch(fetchLeaderboardFailure(`${error}`));
      }
    };

    fetchLeaderboardData();
  }, [dispatch]);

  const renderItem = ({ item }: { item: LeaderboardEntry }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.username}</Text>
      <Text style={styles.score}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
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
