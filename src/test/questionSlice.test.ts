import questionReducer, {
  setQuestions,
  setScore,
  setCurrentQuestionIndex,
  setSelectedOption,
  incrementScore,
  decrementScore,
  QuestionData,
} from "../redux/slices/questionSlice";

describe("question reducer", () => {
  const initialState = {
    questions: [] as QuestionData[],
    score: 0,
    currentQuestionIndex: 0,
    selectedOption: null,
  };

  it("should handle initial state", () => {
    expect(questionReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setQuestions", () => {
    const mockQuestions: QuestionData[] = [
      {
        questionText: "Sample question?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: "Option 1",
      },
    ];
    const actual = questionReducer(initialState, setQuestions(mockQuestions));
    expect(actual.questions).toEqual(mockQuestions);
  });

  it("should handle setScore", () => {
    const score = 50;
    const actual = questionReducer(initialState, setScore(score));
    expect(actual.score).toEqual(score);
  });

  it("should handle setCurrentQuestionIndex", () => {
    const index = 1;
    const actual = questionReducer(
      initialState,
      setCurrentQuestionIndex(index)
    );
    expect(actual.currentQuestionIndex).toEqual(index);
  });

  it("should handle setSelectedOption", () => {
    const option = 2;
    const actual = questionReducer(initialState, setSelectedOption(option));
    expect(actual.selectedOption).toEqual(option);
  });

  it("should handle incrementScore", () => {
    const actual = questionReducer(initialState, incrementScore());
    expect(actual.score).toEqual(10);
  });

  it("should handle decrementScore", () => {
    const actual = questionReducer(initialState, decrementScore());
    expect(actual.score).toEqual(-10);
  });
});
