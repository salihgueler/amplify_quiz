import { renderHook, act } from "@testing-library/react-hooks";
import useUserData from "../hooks/useUserData";

describe("useUserData", () => {
  it("should initialize with an empty user data object", () => {
    const { result } = renderHook(() => useUserData());
    expect(result.current.userData).toEqual({});
  });

  it("should fetch and update user data", async () => {
    const mockFetchUserData = jest.fn().mockResolvedValue({
      name: "John Doe",
      email: "john@example.com",
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useUserData(mockFetchUserData)
    );

    expect(result.current.userData).toEqual({});
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.fetchUserData();
    });

    await waitForNextUpdate();

    expect(mockFetchUserData).toHaveBeenCalled();
    expect(result.current.userData).toEqual({
      name: "John Doe",
      email: "john@example.com",
    });
    expect(result.current.isLoading).toBe(false);
  });
});
