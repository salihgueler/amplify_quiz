import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CategoryButtonProps {
  category: string;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected && styles.selectedCategoryButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.categoryButtonText,
          isSelected && styles.selectedCategoryButtonText,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default CategoryButton;
