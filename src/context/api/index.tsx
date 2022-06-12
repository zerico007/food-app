import axios from "axios";
import { createContext, useCallback, useContext, useMemo } from "react";

interface IApiContext {
  getByQuery: (query: string) => Promise<IRecipe[]>;
}

const ApiContext = createContext<IApiContext>({
  getByQuery: () => {
    return Promise.resolve([]);
  },
});

const API_KEY = "ca682ad0c2734f9f8af18638e7b6d796";
const ROOT_URL = "https://api.spoonacular.com/recipes/complexSearch";

const foodApi = axios.create({
  baseURL: ROOT_URL,
});

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const getByQuery = useCallback(async (query: string) => {
    try {
      const response = await foodApi.get(`?query=${query}&apiKey=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const providerValue = useMemo(
    (): IApiContext => ({
      getByQuery,
    }),
    [getByQuery]
  );

  return (
    <ApiContext.Provider value={providerValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
