// src/redux/slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  selectedCategories: string[];
}

const initialState: QuizState = {
  selectedCategories: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(
          (c) => c !== category
        );
      } else {
        state.selectedCategories.push(category);
      }
    },
  },
});

export const { toggleCategory } = quizSlice.actions;
export default quizSlice.reducer;
