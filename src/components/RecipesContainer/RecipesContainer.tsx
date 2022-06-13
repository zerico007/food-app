import styled from "styled-components";
import { RecipeBox } from "..";
import { useRecipes, useApi, useSearch } from "../../context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;
const RecipesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: auto;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 4rem;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--main-blue);
`;

export default function Recipes() {
  const { recipes } = useRecipes();
  const { responseInfo } = useApi();
  const { query } = useSearch();
  const { totalResults, number, offset } = responseInfo;

  return (
    <Wrapper>
      {!!recipes.length ? (
        <Heading>
          <p>
            {`Showing ${number} recipes of ${totalResults} for "${query}".`}
          </p>
          <p>{`Page ${offset + 1} of ${Math.ceil(totalResults / number)}.`}</p>
        </Heading>
      ) : (
        <Heading>No recipes found</Heading>
      )}
      <RecipesContainer>
        {recipes?.map((recipe) => (
          <RecipeBox key={recipe.id} recipe={recipe} />
        ))}
      </RecipesContainer>
    </Wrapper>
  );
}
