import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeaderboardEntry {
  username: string;
  points: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface LeaderboardState {
  data: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaderboardState = {
  data: [],
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    fetchLeaderboardStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLeaderboardSuccess(state, action: PayloadAction<LeaderboardEntry[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchLeaderboardFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
