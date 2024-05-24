import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScreenProps } from "../../App";

export interface QuestionData {
  questionText: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

const QuestionScreen = ({ navigation }: ScreenProps<"GameLobbyScreen">) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions: QuestionData[] = [
    {
      questionText: "What is the capital of France?",
      options: [
        { text: "Paris", isCorrect: true },
        { text: "London", isCorrect: false },
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false },
      ],
    },
    {
      questionText: "What is the largest planet in our solar system?",
      options: [
        { text: "Earth", isCorrect: false },
        { text: "Jupiter", isCorrect: true },
        { text: "Mars", isCorrect: false },
        { text: "Saturn", isCorrect: false },
      ],
    },
    {
      questionText: "What is the smallest country in the world by land area?",
      options: [
        { text: "Monaco", isCorrect: false },
        { text: "Nauru", isCorrect: false },
        { text: "Vatican City", isCorrect: true },
        { text: "Tuvalu", isCorrect: false },
      ],
    },
    // Add more questions here
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const renderOptions = () => {
    return currentQuestion.options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          selectedOption === index ? styles.selectedOption : null,
        ]}
        onPress={() => handleOptionSelect(index)}
      >
        <Text
          style={[
            styles.optionText,
            selectedOption === index ? styles.selectedOptionText : null,
          ]}
        >
          {option.text}
        </Text>
      </TouchableOpacity>
    ));
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const isCorrect = currentQuestion.options[optionIndex].isCorrect;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestionIndex === questions.length - 1) {
      navigation.navigate("ResultScreen");
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      <View style={styles.optionsContainer}>{renderOptions()}</View>
      {selectedOption !== null && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const ResultScreen = ({ navigation }: ScreenProps<"ResultScreen">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your score: 100</Text>
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
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 24,
  },
  optionsContainer: {
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%", // Added this line
  },
  selectedOption: {
    backgroundColor: "#FF6347",
  },
  optionText: {
    color: "#FF6347",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedOptionText: {
    color: "#ffffff",
  },
  nextButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: "center",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default QuestionScreen;
