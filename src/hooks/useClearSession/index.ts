import { useCallback } from "react";

import { useRecipes, useApi, useSearch, useRecipeDetails } from "../../context";

export function useClearSession() {
  const { setRecipes } = useRecipes();
  const { setResponseInfo } = useApi();
  const { setQuery } = useSearch();
  const { setRecipeDetails } = useRecipeDetails();

  const clearSession = useCallback(() => {
    setQuery("");
    setResponseInfo({
      totalResults: 0,
      number: 0,
      offset: 0,
    });
    setRecipes([]);
    setRecipeDetails({} as IRecipeDetails);
  }, [setQuery, setResponseInfo, setRecipes, setRecipeDetails]);

  return { clearSession };
}
