import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useSessionState } from "../../utils";

interface IApiContext {
  responseInfo: ResponseInfo;
  isLoading: boolean;
  setResponseInfo: (responseInfo: ResponseInfo) => void;
  getByQuery: (
    query: string,
    offSet?: string,
    type?: string
  ) => Promise<IRecipe[]>;
  getRecipeDetails: (recipeId: string) => Promise<IRecipeDetails>;
}

const ApiContext = createContext<IApiContext>({
  responseInfo: {} as ResponseInfo,
  isLoading: false,
  setResponseInfo: () => {},
  getByQuery: () => {
    return Promise.resolve([]);
  },
  getRecipeDetails: () => {
    return Promise.resolve({} as IRecipeDetails);
  },
});

const API_KEY = "ca682ad0c2734f9f8af18638e7b6d796";
const ROOT_SEARCH = "https://api.spoonacular.com/recipes/complexSearch";
const ROOT_DETAILS = "https://api.spoonacular.com/recipes/";

const foodSearchApi = axios.create({
  baseURL: ROOT_SEARCH,
});

const foodDetailsApi = axios.create({
  baseURL: ROOT_DETAILS,
});

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseInfo, setResponseInfo] = useSessionState<ResponseInfo>(
    "responseInfo",
    {
      offset: 0,
      number: 0,
      totalResults: 0,
    }
  );
  const getByQuery = useCallback(
    async (query: string, offSet?: string, type?: string) => {
      setIsLoading(true);
      try {
        const response = await foodSearchApi.get(
          `?query=${query}&offset=${offSet ?? "0"}&type=${
            type ?? ""
          }&apiKey=${API_KEY}`
        );
        const { offset, number, totalResults } = response.data;
        setResponseInfo({ offset, number, totalResults });
        return response.data.results;
      } catch (error) {
        console.log(error);
        return [] as IRecipe[];
      } finally {
        setIsLoading(false);
      }
    },
    [setResponseInfo]
  );

  const getRecipeDetails = useCallback(
    async (recipeId: string) => {
      setIsLoading(true);
      try {
        const response = await foodDetailsApi.get(
          `${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`
        );
        const {
          id,
          title,
          image,
          imageType,
          summary,
          instructions,
          extendedIngredients,
        } = response.data;
        const ingredients = extendedIngredients.map(
          ({ original }: { original: string }) => original
        );
        return {
          id,
          title,
          image,
          imageType,
          summary,
          instructions,
          ingredients,
        };
      } catch (error) {
        console.log(error);
        return {} as IRecipeDetails;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  const providerValue = useMemo(
    (): IApiContext => ({
      responseInfo,
      isLoading,
      setResponseInfo,
      getByQuery,
      getRecipeDetails,
    }),
    [getByQuery, getRecipeDetails, isLoading, responseInfo, setResponseInfo]
  );

  return (
    <ApiContext.Provider value={providerValue}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
