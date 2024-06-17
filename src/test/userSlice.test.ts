import userReducer, { setUser } from "../redux/slices/userSlice";

describe("user reducer", () => {
  const initialState = {
    username: "",
    id: "",
    email: "",
  };

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setUser", () => {
    const userData = {
      username: "testuser",
      id: "1",
      email: "test@example.com",
    };
    const actual = userReducer(initialState, setUser(userData));
    expect(actual).toEqual(userData);
  });
});
