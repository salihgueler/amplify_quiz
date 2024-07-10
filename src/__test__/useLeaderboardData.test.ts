// useLeaderboardData.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import useLeaderboardData from "../hooks/useLeaderboardData";

describe("useLeaderboardData", () => {
  it("should fetch leaderboard data successfully", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLeaderboardData()
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.leaderboardData).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.leaderboardData).not.toEqual([]);
  });

  it("should handle error when fetching leaderboard data fails", async () => {
    // Mock the generateClient function to throw an error
    jest.mock("aws-amplify/api", () => ({
      generateClient: jest.fn().mockImplementation(() => ({
        models: {
          Leaderboard: {
            list: jest
              .fn()
              .mockRejectedValue(new Error("Failed to fetch leaderboard data")),
          },
        },
      })),
    }));

    const { result, waitForNextUpdate } = renderHook(() =>
      useLeaderboardData()
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.leaderboardData).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to fetch leaderboard data");
    expect(result.current.leaderboardData).toEqual([]);
  });
});
