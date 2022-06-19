import styled from "styled-components";
import { RecipeBox } from "..";

const RecipesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: auto;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export default function Recipes({ recipes }: { recipes: IRecipe[] }) {
  return (
    <RecipesContainer>
      {recipes.map((recipe) => (
        <RecipeBox key={recipe.id} recipe={recipe} />
      ))}
    </RecipesContainer>
  );
}
