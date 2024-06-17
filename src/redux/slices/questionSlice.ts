// src/redux/questionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuestionData {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionState {
  questions: QuestionData[];
  score: number;
  currentQuestionIndex: number;
  selectedOption: number | null;
}

const initialState: QuestionState = {
  questions: [],
  score: 0,
  currentQuestionIndex: 0,
  selectedOption: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<QuestionData[]>) {
      state.questions = action.payload;
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    setCurrentQuestionIndex(state, action: PayloadAction<number>) {
      state.currentQuestionIndex = action.payload;
    },
    setSelectedOption(state, action: PayloadAction<number | null>) {
      state.selectedOption = action.payload;
    },
    incrementScore(state) {
      state.score += 10;
    },
    decrementScore(state) {
      state.score -= 10;
    },
  },
});

export const {
  setQuestions,
  setScore,
  setCurrentQuestionIndex,
  setSelectedOption,
  incrementScore,
  decrementScore,
} = questionSlice.actions;

export default questionSlice.reducer;
