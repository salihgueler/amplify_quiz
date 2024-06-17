import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  setQuestions,
  setScore,
  setCurrentQuestionIndex,
  setSelectedOption,
  incrementScore,
  decrementScore,
} from "../redux/slices/questionSlice";
import { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack";
import { fetchUserAttributes } from "aws-amplify/auth";

export interface QuestionData {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

type QuestionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "QuestionScreen"
>;

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { questions, score, currentQuestionIndex, selectedOption } =
    useSelector((state: RootState) => state.question);

  const client = generateClient<Schema>();
  const params = route.params || { content: "", gameId: "" };

  useEffect(() => {
    const lines = params.content.split("\n");
    const jsonStart = lines.findIndex((line: string) =>
      line.trim().startsWith("[")
    );
    const jsonEnd = lines.findLastIndex((line: string) =>
      line.trim().endsWith("]")
    );
    if (jsonStart !== -1) {
      const jsonString = lines
        .slice(jsonStart, jsonEnd + 1)
        .join("\n")
        .trim();

      try {
        const parsedQuestions: QuestionData[] = JSON.parse(jsonString).map(
          (questionObj: any) => ({
            questionText: questionObj.question,
            options: questionObj.options,
            correctAnswer: questionObj.correctAnswer,
          })
        );
        dispatch(setQuestions(parsedQuestions));
      } catch (error) {
        console.error("Error parsing JSON string:", error);
      }
    } else {
      console.error("JSON start not found in params.content");
    }

    // Subscribe to game updates
    const subscription = client.models.Game.observeQuery({
      filter: { id: { eq: params.gameId } },
    }).subscribe({
      next: ({ items }) => {
        if (items.length > 0) {
          const gameData = items[0];
          if (gameData.finished) {
            navigation.navigate("ResultScreen", { score: score });
          } else {
            dispatch(setCurrentQuestionIndex(gameData.currentQuestionIndex));
          }
        }
      },
      error: (error) => {
        console.error("Error subscribing to game updates:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []); // The empty array ensures useEffect is called only once

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const renderOptions = () => {
    return currentQuestion.options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionButton,
          selectedOption === index ? styles.selectedOption : null,
        ]}
        onPress={() => dispatch(setSelectedOption(index))}
      >
        <Text
          style={[
            styles.optionText,
            selectedOption === index ? styles.selectedOptionText : null,
          ]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    ));
  };

  const handleOptionSelect = async (optionIndex: number) => {
    const isCorrect =
      currentQuestion.options[optionIndex] === currentQuestion.correctAnswer;
    if (isCorrect) {
      dispatch(incrementScore());
    } else {
      dispatch(decrementScore());
    }

    if (currentQuestionIndex + 1 === questions.length) {
      await client.models.Game.update({
        id: params.gameId,
        finished: true,
      });
      navigation.navigate("ResultScreen", { score: score });
    } else {
      // Update the game with the next question index
      await client.models.Game.update({
        id: params.gameId,
        currentQuestionIndex: currentQuestionIndex + 1,
      });
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    }
    dispatch(setSelectedOption(null));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
      <View style={styles.optionsContainer}>{renderOptions()}</View>
      {selectedOption !== null && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => handleOptionSelect(selectedOption)}
        >
          <Text style={styles.nextButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}
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
    width: "100%",
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
});

export default QuestionScreen;
