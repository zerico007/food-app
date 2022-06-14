import { createContext, useContext, useMemo } from "react";
import { useSessionState } from "../../utils";

interface IRecipeDetailsContext {
  recipeDetails: IRecipeDetails;
  setRecipeDetails: (recipe: IRecipeDetails) => void;
}

const RecipeDetailsContext = createContext<IRecipeDetailsContext>({
  recipeDetails: {} as IRecipeDetails,
  setRecipeDetails: () => {},
});

export const RecipeDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [recipeDetails, setRecipeDetails] = useSessionState<IRecipeDetails>(
    "recipeDetails",
    {} as IRecipeDetails
  );

  const context = useMemo(
    () => ({ recipeDetails, setRecipeDetails }),
    [recipeDetails, setRecipeDetails]
  );

  return (
    <RecipeDetailsContext.Provider value={context}>
      {children}
    </RecipeDetailsContext.Provider>
  );
};

export const useRecipeDetails = () => useContext(RecipeDetailsContext);
