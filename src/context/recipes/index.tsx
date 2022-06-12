import { createContext, useContext, useMemo } from "react";
import { useSessionState } from "../../utils";

interface IRecipeContext {
  recipes: IRecipe[];
  setRecipes: (recipes: IRecipe[]) => void;
}

const RecipeContext = createContext<IRecipeContext>({
  recipes: [],
  setRecipes: () => {},
});

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useSessionState<IRecipe[]>("recipes", []);

  const providerValue = useMemo(
    (): IRecipeContext => ({
      recipes,
      setRecipes,
    }),
    [recipes, setRecipes]
  );

  return (
    <RecipeContext.Provider value={providerValue}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);
