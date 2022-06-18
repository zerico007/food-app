import { useCallback } from "react";

import { useRecipes, useApi, useSearch, useRecipeDetails } from "../../context";

export function useClearSession() {
  const { setRecipes } = useRecipes();
  const { setResponseInfo } = useApi();
  const { setQuery, setCategory, setNutrients } = useSearch();
  const { setRecipeDetails } = useRecipeDetails();

  const clearSession = useCallback(() => {
    setQuery("");
    setCategory("");
    setResponseInfo({
      totalResults: 0,
      number: 0,
      offset: 0,
    });
    setRecipes([]);
    setRecipeDetails({} as IRecipeDetails);
    setNutrients({
      maxCalories: 0,
      maxCarbs: 0,
      maxProtein: 0,
      maxFat: 0,
    });
  }, [
    setQuery,
    setResponseInfo,
    setRecipes,
    setRecipeDetails,
    setCategory,
    setNutrients,
  ]);

  return { clearSession };
}
