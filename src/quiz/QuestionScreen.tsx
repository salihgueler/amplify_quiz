import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const client = generateClient<Schema>();
  const params = route.params || { content: "", gameId: "" };

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("params.content:", params.content);
    console.log("params.gameId:", params.gameId);

    const lines = params.content.split("\n");
    const jsonStart = lines.findIndex((line: string) =>
      line.trim().startsWith("[")
    );
    console.log("jsonStart:", jsonStart);

    if (jsonStart !== -1) {
      const jsonString = lines.slice(jsonStart).join("\n").trim();
      console.log("jsonString:", jsonString);

      try {
        const parsedQuestions: QuestionData[] = JSON.parse(jsonString).map(
          (questionObj: any) => ({
            questionText: questionObj.question,
            options: questionObj.options,
            correctAnswer: questionObj.correctAnswer,
          })
        );
        setQuestions(parsedQuestions);
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
          console.log("Game data received:", gameData);
          setCurrentQuestionIndex(gameData.currentQuestionIndex);
        }
      },
      error: (error) => {
        console.error("Error subscribing to game updates:", error);
      },
    });

    return () => {
      console.log("Cleaning up subscription");
      subscription.unsubscribe();
    };
  }, [client, params.content, params.gameId]);

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
        onPress={() => handleOptionSelect(index)}
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
    setSelectedOption(optionIndex);
    const isCorrect =
      currentQuestion.options[optionIndex] === currentQuestion.correctAnswer;
    let newScore = score;
    if (isCorrect) {
      newScore += 10;
    } else {
      newScore -= 10;
    }

    setScore(newScore);

    if (currentQuestionIndex + 1 === questions.length) {
      await client.models.Game.update({
        id: params.gameId,
        finished: true,
      });
      navigation.navigate("ResultScreen", { score: newScore });
    } else {
      // Update the game with the next question index
      await client.models.Game.update({
        id: params.gameId,
        currentQuestionIndex: currentQuestionIndex + 1,
      });
    }
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

type ResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ResultScreen"
>;

export const ResultScreen: React.FC<ResultScreenProps> = ({
  navigation,
  route,
}) => {
  const params = route.params?.score || 0;
  const client = generateClient<Schema>();

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your score: {params}</Text>
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
            points: currentItem.points + params,
          });
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
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuestionScreen;
