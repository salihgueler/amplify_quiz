// src/redux/resultSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultState {
  score: number;
}

const initialState: ResultState = {
  score: 0,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload;
    },
    resetScore(state) {
      state.score = 0;
    },
  },
});

export const { setScore, resetScore } = resultSlice.actions;

export default resultSlice.reducer;
