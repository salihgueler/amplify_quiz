import { act, renderHook } from "@testing-library/react-hooks";
import useProfilePicture from "../hooks/useProfilePicture";

describe("useProfilePicture", () => {
  it("should initialize with an empty profile picture", () => {
    const { result } = renderHook(() => useProfilePicture());
    expect(result.current.profilePicture).toBe("");
  });

  it("should update the profile picture", () => {
    const { result } = renderHook(() => useProfilePicture());
    act(() => {
      result.current.setProfilePicture("https://example.com/profile.jpg");
    });
    expect(result.current.profilePicture).toBe(
      "https://example.com/profile.jpg"
    );
  });
});
