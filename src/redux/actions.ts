export const TOGGLE_CATEGORY = "TOGGLE_CATEGORY";

export const toggleCategory = (category: string) => ({
  type: TOGGLE_CATEGORY,
  payload: category,
});
