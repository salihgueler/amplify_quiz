// src/components/ResultScreen.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack";
import { fetchUserAttributes } from "aws-amplify/auth";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { resetScore, setScore } from "../redux/slices/resultSlice";
import { RootStackParamList } from "../../App";

type ResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ResultScreen"
>;

const ResultScreen: React.FC<ResultScreenProps> = ({ navigation, route }) => {
  const dispatch: AppDispatch = useDispatch();
  const score = useSelector((state: RootState) => state.result.score);
  const client = generateClient<Schema>();

  useEffect(() => {
    const routeScore = route.params?.score || 0;
    dispatch(setScore(routeScore));
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your score: {score}</Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={async () => {
          const attributes = await fetchUserAttributes();
          const currentItemList = await client.models.Leaderboard.list({
            filter: {
              username: {
                eq: attributes.preferred_username,
              },
            },
          });
          const currentItem = currentItemList.data[0];
          await client.models.Leaderboard.update({
            id: currentItem.id,
            points: currentItem.points + score,
          });
          dispatch(resetScore());
          navigation.replace("HomeScreen");
        }}
      >
        <Text style={styles.searchButtonText}>Save Result</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  searchButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ResultScreen;
