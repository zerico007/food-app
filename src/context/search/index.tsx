import { createContext, useContext, useMemo } from "react";
import { useSessionState } from "../../utils";

interface ISearchContext {
  query: string;
  setQuery: (query: string) => void;
}

const SearchContext = createContext<ISearchContext>({
  query: "",
  setQuery: () => {},
});

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useSessionState<string>("query", "");

  const providerValue = useMemo(
    (): ISearchContext => ({
      query,
      setQuery,
    }),
    [query, setQuery]
  );

  return (
    <SearchContext.Provider value={providerValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
