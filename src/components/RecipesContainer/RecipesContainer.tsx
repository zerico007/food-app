import { useCallback } from "react";
import styled from "styled-components";
import { RecipeBox, Paginate, Button } from "..";
import { useRecipes, useApi, useSearch } from "../../context";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 4rem;
`;
const RecipesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
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
  const { recipes, setRecipes } = useRecipes();
  const { responseInfo, setResponseInfo } = useApi();
  const { query, setQuery } = useSearch();
  const { totalResults, number } = responseInfo;

  const clearSearch = useCallback(() => {
    setQuery("");
    setResponseInfo({
      totalResults: 0,
      number: 0,
      offset: 0,
    });
    setRecipes([]);
  }, [setQuery, setResponseInfo, setRecipes]);

  return (
    <Wrapper>
      {!!recipes.length ? (
        <Heading>
          <p>
            {`Showing ${number} results of ${totalResults} for "${query}".`}
          </p>
          <Paginate />
          <Button
            onClick={clearSearch}
            content="clear search"
            theme="secondary"
          />
        </Heading>
      ) : query ? (
        <Heading>
          <p>{`No results for "${query}".`}</p>
        </Heading>
      ) : (
        <Heading>
          <h3 style={{ fontWeight: 500 }}>Search for your favorite recipe!</h3>
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
