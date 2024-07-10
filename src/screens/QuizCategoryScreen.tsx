import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack";
import { RootStackParamList } from "../../App";
import useCategorySelection from "../hooks/useCategorySelection";
import CategoryButton from "../components/CategoryButton";

type Props = NativeStackScreenProps<RootStackParamList, "QuizCategoryScreen">;

const QuizCategoryScreen: React.FC<Props> = ({ navigation }) => {
  const categories: string[] = [
    "History of QuizKnock",
    "History",
    "Science",
    "Geography",
    "Sports",
    "Movies",
    "Music",
    "Literature",
    "Art",
    "Technology",
    "General Knowledge",
  ];

  const { selectedCategories, toggleCategory } = useCategorySelection([]);

  const handleNextScreen = () => {
    navigation.replace("GameLobbyScreen", { selectedCategories });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Quiz Categories</Text>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isSelected={selectedCategories.includes(category)}
            onPress={() => toggleCategory(category)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={handleNextScreen}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 16,
    textAlign: "center",
  },
  categoriesContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    marginBottom: 16,
    alignSelf: "stretch",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QuizCategoryScreen;
