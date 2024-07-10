// useCategorySelection.test.tsx
import { renderHook, act } from "@testing-library/react-hooks";
import useCategorySelection from "../hooks/useCategorySelection";

describe("useCategorySelection", () => {
  it("should initialize with the provided initial categories", () => {
    const { result } = renderHook(() =>
      useCategorySelection(["History", "Science"])
    );
    expect(result.current.selectedCategories).toEqual(["History", "Science"]);
  });

  it("should initialize with an empty array when no initial categories are provided", () => {
    const { result } = renderHook(() => useCategorySelection([]));
    expect(result.current.selectedCategories).toEqual([]);
  });

  it("should toggle a category correctly when toggled multiple times", () => {
    const { result } = renderHook(() => useCategorySelection([]));

    act(() => {
      result.current.toggleCategory("History");
    });
    expect(result.current.selectedCategories).toEqual(["History"]);

    act(() => {
      result.current.toggleCategory("Science");
    });
    expect(result.current.selectedCategories).toEqual(["History", "Science"]);

    act(() => {
      result.current.toggleCategory("History");
    });
    expect(result.current.selectedCategories).toEqual(["Science"]);
  });
  it("should handle duplicate initial categories correctly", () => {
    const { result } = renderHook(() =>
      useCategorySelection(["History", "History", "Science"])
    );
    expect(result.current.selectedCategories).toEqual(["History", "Science"]);
  });

  it("should toggle a category correctly", () => {
    const { result } = renderHook(() => useCategorySelection([]));

    act(() => {
      result.current.toggleCategory("History");
    });
    expect(result.current.selectedCategories).toEqual(["History"]);

    act(() => {
      result.current.toggleCategory("History");
    });
    expect(result.current.selectedCategories).toEqual([]);
  });
});
