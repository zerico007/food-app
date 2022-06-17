import styled from "styled-components";

import { RecipeBox, Paginate, Button, Search } from "..";
import { useRecipes, useApi, useSearch, useTheme } from "../../context";
import { useClearSession } from "../../hooks";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;
const RecipesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: auto;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const Heading = styled.div<{ theme: "light" | "dark" }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${(props) =>
    props.theme === "light" ? "var(--main-blue)" : "var(--main-white)"};
`;

export default function Recipes() {
  const { recipes } = useRecipes();
  const { responseInfo } = useApi();
  const { query } = useSearch();
  const { clearSession } = useClearSession();
  const { theme } = useTheme();

  const { totalResults, number } = responseInfo;

  return (
    <Wrapper>
      <Search />
      {!!recipes.length ? (
        <Heading theme={theme}>
          <p>
            {`Showing ${
              number < totalResults ? number : totalResults
            } results of ${totalResults} for "${query}".`}
          </p>
          <Paginate />
          <Button
            onClick={clearSession}
            content="clear search"
            theme="secondary"
          />
        </Heading>
      ) : query ? (
        <Heading theme={theme}>
          <p>{`No results for "${query}".`}</p>
        </Heading>
      ) : (
        <Heading theme={theme}>
          <h2 style={{ fontWeight: 500 }}>Search for your favorite recipe!</h2>
        </Heading>
      )}
      <RecipesContainer>
        {recipes?.map((recipe) => (
          <RecipeBox key={recipe.id} recipe={recipe} />
        ))}
      </RecipesContainer>
    </Wrapper>
  );
}
