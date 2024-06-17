import gameLobbyReducer, {
  setInformationText,
  setLoading,
} from "../redux/slices/gameLobbySlice";

describe("game lobby reducer", () => {
  const initialState = {
    informationText: "Looking for a game...",
    loading: true,
  };

  it("should handle initial state", () => {
    expect(gameLobbyReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setInformationText", () => {
    const text = "Game found, waiting for players...";
    const actual = gameLobbyReducer(initialState, setInformationText(text));
    expect(actual.informationText).toEqual(text);
  });

  it("should handle setLoading", () => {
    const actual = gameLobbyReducer(initialState, setLoading(false));
    expect(actual.loading).toEqual(false);
  });
});
