import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {RootStackParamList, ScreenProps} from "../../App";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import {generateClient} from "aws-amplify/api";
import {Schema} from "../../amplify/data/resource";
import {useAuthenticator} from "@aws-amplify/ui-react-native";
import {fetchUserAttributes} from "aws-amplify/auth";
import {Leaderboard} from "../../amplify/auth/post-confirmation/graphql/API";

export interface QuestionData {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

type QuestionScreenProps = NativeStackScreenProps<RootStackParamList, 'QuestionScreen'>;

const QuestionScreen: React.FC<QuestionScreenProps> = ({navigation, route}) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const params = route?.params || {content: []};

    const lines = params.content.split('\n');
    const jsonStart = lines.findIndex(line => line.trim().startsWith('['));
    const jsonString = lines.slice(jsonStart).join('\n').trim();
    const questions: QuestionData[] = JSON.parse(jsonString).map(
        (questionObj: any) => ({
            questionText: questionObj.question,
            options: questionObj.options,
            correctAnswer: questionObj.correctAnswer,
        })
    );

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

    const handleOptionSelect = (optionIndex: number) => {
        setSelectedOption(optionIndex);
        const isCorrect = currentQuestion.options[optionIndex] === currentQuestion.correctAnswer;
        if (isCorrect) {
            setScore(score + 10);
        }
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        if (currentQuestionIndex === questions.length - 1) {
            navigation.navigate("ResultScreen", score);
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

type ResultScreenProps = NativeStackScreenProps<RootStackParamList, 'ResultScreen'>;

export const ResultScreen: React.FC<ResultScreenProps> = ({navigation, route}) => {
    const params = route?.params || 0;
    const client = generateClient<Schema>();
    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>Your score: {params.toString()}</Text>
            <TouchableOpacity
                style={styles.searchButton}
                onPress={async () => {
                    const attribute = await fetchUserAttributes();
                    const currentItemList = await client.models.Leaderboard.list(
                        {
                            filter: {
                                username: {
                                    eq: attribute.preferred_username,
                                },
                            },
                        }
                    );
                    const currentItem = currentItemList.data[0];
                    await client.models.Leaderboard.update(
                        {
                            id: currentItem.id,
                            points: currentItem.points + params.valueOf(),
                        }
                    )
                    return navigation.replace("HomeScreen");
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
