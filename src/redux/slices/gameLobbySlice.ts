// src/redux/gameLobbySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameLobbyState {
  informationText: string;
  loading: boolean;
}

const initialState: GameLobbyState = {
  informationText: "Looking for a game...",
  loading: true,
};

const gameLobbySlice = createSlice({
  name: "gameLobby",
  initialState,
  reducers: {
    setInformationText(state, action: PayloadAction<string>) {
      state.informationText = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setInformationText, setLoading } = gameLobbySlice.actions;

export default gameLobbySlice.reducer;
