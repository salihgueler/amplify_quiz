import quizReducer, {
  toggleCategory,
} from "../redux/slices/selectCategorySlice";

describe("quiz reducer", () => {
  const initialState = {
    selectedCategories: [],
  };

  it("should handle initial state", () => {
    expect(quizReducer(undefined, { type: "unknown" })).toEqual({
      selectedCategories: [],
    });
  });

  it("should handle toggleCategory", () => {
    const actual = quizReducer(initialState, toggleCategory("Science"));
    expect(actual.selectedCategories).toEqual(["Science"]);
  });

  it("should handle toggleCategory to remove a category", () => {
    const stateWithCategory = {
      selectedCategories: ["Science"],
    };
    const actual = quizReducer(stateWithCategory, toggleCategory("Science"));
    expect(actual.selectedCategories).toEqual([]);
  });

  it("should handle multiple categories", () => {
    let actual = quizReducer(initialState, toggleCategory("Science"));
    actual = quizReducer(actual, toggleCategory("History"));
    expect(actual.selectedCategories).toEqual(["Science", "History"]);
  });

  it("should handle removing one of multiple categories", () => {
    const stateWithCategories = {
      selectedCategories: ["Science", "History"],
    };
    const actual = quizReducer(stateWithCategories, toggleCategory("History"));
    expect(actual.selectedCategories).toEqual(["Science"]);
  });
});
