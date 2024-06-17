import leaderboardReducer, {
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} from "../redux/slices/learderboardSlice";

interface LeaderboardEntry {
  username: string;
  points: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

describe("leaderboard reducer", () => {
  const initialState = {
    data: [] as LeaderboardEntry[],
    loading: false,
    error: null as string | null,
  };

  it("should handle initial state", () => {
    expect(leaderboardReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle fetchLeaderboardStart", () => {
    const actual = leaderboardReducer(initialState, fetchLeaderboardStart());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it("should handle fetchLeaderboardSuccess", () => {
    const mockData = [
      {
        username: "testuser",
        points: 100,
        id: "1",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
      },
    ];
    const actual = leaderboardReducer(
      initialState,
      fetchLeaderboardSuccess(mockData)
    );
    expect(actual.loading).toBe(false);
    expect(actual.data).toEqual(mockData);
  });

  it("should handle fetchLeaderboardFailure", () => {
    const errorMessage = "Failed to fetch";
    const actual = leaderboardReducer(
      initialState,
      fetchLeaderboardFailure(errorMessage)
    );
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(errorMessage);
  });
});
