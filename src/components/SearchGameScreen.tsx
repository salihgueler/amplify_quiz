import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setUser } from "../redux/slices/userSlice";
import { fetchUserAttributes } from "aws-amplify/auth";
import { ScreenProps } from "../../App";

const SearchGameScreen = ({ navigation }: ScreenProps<"HomeScreen">) => {
  const dispatch: AppDispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    fetchUserAttributes().then((attributes) => {
      dispatch(
        setUser({
          username: attributes?.preferred_username ?? "",
          id: attributes?.sub ?? "",
          email: attributes?.email ?? "",
        })
      );
    });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome {username}.{"\n\n"}Click the button below{"\n"}
        to search for a game!
      </Text>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate("QuizCategoryScreen")}
      >
        <Text style={styles.searchButtonText}>Search Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  searchButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchGameScreen;
