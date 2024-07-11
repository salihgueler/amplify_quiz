import resultReducer, {
  setScore,
  resetScore,
} from "../redux/slices/resultSlice";

describe("result reducer", () => {
  const initialState = {
    score: 0,
  };

  it("should handle initial state", () => {
    expect(resultReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setScore", () => {
    const score = 50;
    const actual = resultReducer(initialState, setScore(score));
    expect(actual.score).toEqual(score);
  });

  it("should handle resetScore", () => {
    const stateWithScore = { score: 50 };
    const actual = resultReducer(stateWithScore, resetScore());
    expect(actual.score).toEqual(0);
  });
});
