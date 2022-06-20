import { createContext, useContext, useMemo } from "react";
import { useSessionState } from "../../utils";

interface ISearchContext {
  query: string;
  category: string;
  nutrients: INutrientsQuery;
  includeIngredients: string[];
  excludeIngredients: string[];
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setNutrients: (nutrients: INutrientsQuery) => void;
  setIncludeIngredients: (ingredients: string[]) => void;
  setExcludeIngredients: (ingredients: string[]) => void;
}

const initialNutrients: INutrientsQuery = {
  maxCalories: 0,
  maxCarbs: 0,
  maxFat: 0,
  maxProtein: 0,
};

const SearchContext = createContext<ISearchContext>({
  query: "",
  category: "",
  nutrients: initialNutrients,
  includeIngredients: [],
  excludeIngredients: [],
  setQuery: () => {},
  setCategory: () => {},
  setNutrients: () => {},
  setIncludeIngredients: () => {},
  setExcludeIngredients: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useSessionState<string>("query", "");
  const [category, setCategory] = useSessionState<string>("category", "");
  const [nutrients, setNutrients] = useSessionState<INutrientsQuery>(
    "nutrients",
    initialNutrients
  );
  const [includeIngredients, setIncludeIngredients] = useSessionState<string[]>(
    "includeIngredients",
    []
  );
  const [excludeIngredients, setExcludeIngredients] = useSessionState<string[]>(
    "excludeIngredients",
    []
  );

  const providerValue = useMemo(
    (): ISearchContext => ({
      query,
      setQuery,
      category,
      setCategory,
      setNutrients,
      nutrients,
      setIncludeIngredients,
      includeIngredients,
      setExcludeIngredients,
      excludeIngredients,
    }),
    [
      query,
      setQuery,
      category,
      setCategory,
      setNutrients,
      nutrients,
      setIncludeIngredients,
      includeIngredients,
      setExcludeIngredients,
      excludeIngredients,
    ]
  );

  return (
    <SearchContext.Provider value={providerValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
