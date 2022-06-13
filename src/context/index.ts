import { combineProviders } from "react-combine-providers";
import { SearchProvider } from "./search";
import { ApiProvider } from "./api";
import { RecipeProvider } from "./recipes";

const providers = combineProviders();
providers.push(ApiProvider);
providers.push(RecipeProvider);
providers.push(SearchProvider);

export const ContextProvider = providers.master();

export { useApi } from "./api";
export { useRecipes } from "./recipes";
export { useSearch } from "./search";
