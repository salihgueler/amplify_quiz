// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/selectCategorySlice";
import leaderboardReducer from "./slices/learderboardSlice";
import profileReducer from "./slices/profileSlice";
import questionReducer from "./slices/questionSlice";
import resultReducer from "./slices/resultSlice";
import gameLobbyReducer from "./slices/gameLobbySlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    leaderboard: leaderboardReducer,
    profile: profileReducer,
    question: questionReducer,
    result: resultReducer,
    gameLobby: gameLobbyReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
