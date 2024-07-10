/**
 * A custom React hook for managing the selection of categories.
 *
 * @param {string[]} initialCategories - An array of initial categories to be selected.
 * @returns {Object} An object containing the selected categories and a function to toggle a category.
 * @returns {string[]} selectedCategories - An array of currently selected categories.
 * @returns {Function} toggleCategory - A function to toggle the selection of a category.
 *
 * @example
 * const { selectedCategories, toggleCategory } = useCategorySelection(['History', 'Science']);
 *
 * // Toggle the 'History' category
 * toggleCategory('History');
 *
 * // The selectedCategories array will now contain ['Science']
 */
import { useState } from "react";

const useCategorySelection = (initialCategories: string[]) => {
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);

  /**
   * Toggles the selection of a category.
   *
   * @param {string} category - The category to be toggled.
   */
  const toggleCategory = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  return { selectedCategories, toggleCategory };
};

export default useCategorySelection;
