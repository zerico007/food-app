import { createContext, useContext, useMemo } from "react";
import { useSessionState } from "../../utils";

interface ISearchContext {
  query: string;
  category: string;
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
}

const SearchContext = createContext<ISearchContext>({
  query: "",
  category: "",
  setQuery: () => {},
  setCategory: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useSessionState<string>("query", "");
  const [category, setCategory] = useSessionState<string>("category", "");

  const providerValue = useMemo(
    (): ISearchContext => ({
      query,
      setQuery,
      category,
      setCategory,
    }),
    [query, setQuery, category, setCategory]
  );

  return (
    <SearchContext.Provider value={providerValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
