// src/redux/profileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  profilePicture: string;
  username: string;
  id: string;
  email: string;
}

interface ProfileState {
  userData: UserData;
  uploadProgress: number;
}

const initialState: ProfileState = {
  userData: {
    profilePicture: "https://via.placeholder.com/150",
    username: "",
    id: "",
    email: "",
  },
  uploadProgress: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
    setProfilePictureFile(state, action: PayloadAction<string>) {
      state.userData.profilePicture = action.payload;
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
  },
});

export const { setUserData, setProfilePictureFile, setUploadProgress } =
  profileSlice.actions;

export default profileSlice.reducer;
