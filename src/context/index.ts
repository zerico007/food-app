import { combineProviders } from "react-combine-providers";
import { SearchProvider } from "./search";
import { ApiProvider } from "./api";
import { RecipeProvider } from "./recipes";
import { RecipeDetailsProvider } from "./recipeDetails";
import { ThemeProvider } from "./theme";

const providers = combineProviders();
providers.push(ApiProvider);
providers.push(RecipeProvider);
providers.push(SearchProvider);
providers.push(RecipeDetailsProvider);
providers.push(ThemeProvider);

export const ContextProvider = providers.master();

export { useApi } from "./api";
export { useRecipes } from "./recipes";
export { useSearch } from "./search";
export { useRecipeDetails } from "./recipeDetails";
export { useTheme } from "./theme";
