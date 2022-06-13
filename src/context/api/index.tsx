import axios, { AxiosResponse } from "axios";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useSessionState } from "../../utils";

interface IApiContext {
  responseInfo: ResponseInfo;
  getByQuery: (query: string) => Promise<IRecipe[]>;
}

const ApiContext = createContext<IApiContext>({
  responseInfo: {} as ResponseInfo,
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
  const [responseInfo, setResponseInfo] = useSessionState<ResponseInfo>(
    "responseInfo",
    {
      offset: 0,
      number: 0,
      totalResults: 0,
    }
  );
  const getByQuery = useCallback(
    async (query: string) => {
      try {
        const response = (await foodApi.get(
          `?query=${query}&apiKey=${API_KEY}`
        )) as AxiosResponse<ApiResponse>;
        const { offset, number, totalResults } = response.data;
        setResponseInfo({ offset, number, totalResults });
        return response.data.results;
      } catch (error) {
        console.log(error);
        return [] as IRecipe[];
      }
    },
    [setResponseInfo]
  );

  const providerValue = useMemo(
    (): IApiContext => ({
      responseInfo,
      getByQuery,
    }),
    [getByQuery, responseInfo]
  );

  return (
    <ApiContext.Provider value={providerValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);