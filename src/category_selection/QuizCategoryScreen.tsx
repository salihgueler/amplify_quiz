import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Props {
  navigation: any; // Replace with the appropriate type for navigation prop
}

const QuizCategoryScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories: string[] = [
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

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <TouchableOpacity
        key={category}
        style={[
          styles.categoryButton,
          selectedCategories.includes(category) &&
            styles.selectedCategoryButton,
        ]}
        onPress={() => toggleCategory(category)}
      >
        <Text
          style={[
            styles.categoryButtonText,
            selectedCategories.includes(category) &&
              styles.selectedCategoryButtonText,
          ]}
        >
          {category}
        </Text>
      </TouchableOpacity>
    ));
  };

  const handleNextScreen = () => {
    // Pass the selected categories to the next screen
    navigation.replace("GameLobbyScreen", { selectedCategories });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Quiz Categories</Text>
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {renderCategories()}
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
  categoryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  selectedCategoryButton: {
    backgroundColor: "#FF6347",
  },
  categoryButtonText: {
    color: "#FF6347",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedCategoryButtonText: {
    color: "#ffffff",
  },
  nextButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    marginBottom: 16,
    alignSelf: "stretch", // This will make the button fill the width
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // This will center the text within the button
  },
});

export default QuizCategoryScreen;
