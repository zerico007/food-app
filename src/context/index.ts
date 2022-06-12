import { combineProviders } from "react-combine-providers";

import { ApiProvider } from "./api";
import { RecipeProvider } from "./recipes";

const providers = combineProviders();
providers.push(ApiProvider);
providers.push(RecipeProvider);

export const ContextProvider = providers.master();

export { useApi } from "./api";
export { useRecipes } from "./recipes";
