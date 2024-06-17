import profileReducer, {
  setUserData,
  setProfilePictureFile,
  setUploadProgress,
} from "../redux/slices/profileSlice";

interface UserData {
  profilePicture: string;
  username: string;
  id: string;
  email: string;
}

describe("profile reducer", () => {
  const initialState = {
    userData: {
      profilePicture: "https://via.placeholder.com/150",
      username: "",
      id: "",
      email: "",
    },
    uploadProgress: 0,
  };

  it("should handle initial state", () => {
    expect(profileReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setUserData", () => {
    const mockData: UserData = {
      profilePicture: "https://via.placeholder.com/150",
      username: "testuser",
      id: "1",
      email: "test@example.com",
    };
    const actual = profileReducer(initialState, setUserData(mockData));
    expect(actual.userData).toEqual(mockData);
  });

  it("should handle setProfilePictureFile", () => {
    const mockUrl = "https://via.placeholder.com/200";
    const actual = profileReducer(initialState, setProfilePictureFile(mockUrl));
    expect(actual.userData.profilePicture).toEqual(mockUrl);
  });

  it("should handle setUploadProgress", () => {
    const progress = 50;
    const actual = profileReducer(initialState, setUploadProgress(progress));
    expect(actual.uploadProgress).toEqual(progress);
  });
});
