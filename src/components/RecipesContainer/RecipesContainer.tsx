import { useCallback, useState } from "react";
import styled from "styled-components";

import { RecipeBox, Paginate, Button, Search, Select, Option } from "..";
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

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const selectOptions = [
  "main course",
  "salad",
  "side dish",
  "dessert",
  "appetizer",
  "bread",
  "breakfast",
  "soup",
  "sauce",
  "drink",
  "beverage",
  "marinade",
  "fingerfood",
  "snack",
].map((option) => ({ value: option, label: option }));

export default function Recipes() {
  const { recipes } = useRecipes();
  const { responseInfo, getByQuery } = useApi();
  const { query, setCategory, category } = useSearch();
  const { clearSession } = useClearSession();
  const { theme } = useTheme();

  const { totalResults, number } = responseInfo;

  const [, setSelectedOption] = useState<Option | null>(null);

  const handleChange = useCallback(
    (selected: Option | null) => {
      setSelectedOption(selected);
      setCategory(selected?.value as string);

      if (query) {
        getByQuery(query, "0", category);
      }
    },
    [setCategory, query, category, getByQuery]
  );

  const determineHeading = useCallback(() => {
    if (!!recipes.length) {
      return (
        <Heading theme={theme}>
          <p>
            {`Showing ${
              number < totalResults ? number : totalResults
            } results of ${totalResults} for "${query}".`}
            {category ? ` Category: ${category}` : ""}
          </p>
          <Paginate />
          <Button
            onClick={clearSession}
            content="clear search"
            theme="secondary"
          />
        </Heading>
      );
    } else {
      if (query) {
        return (
          <Heading theme={theme}>
            <p>{`No results for "${query}".`}</p>
          </Heading>
        );
      }
      return (
        <Heading theme={theme}>
          <h2 style={{ fontWeight: 500 }}>Search for your favorite recipe!</h2>
        </Heading>
      );
    }
  }, [query, recipes, number, totalResults, theme, clearSession, category]);

  return (
    <Wrapper>
      <SearchDiv>
        <Search />
        <Select
          options={selectOptions}
          onChange={handleChange}
          selected={category ? { value: category, label: category } : null}
          margin="1rem 0"
        />
      </SearchDiv>
      {determineHeading()}
      <RecipesContainer>
        {recipes?.map((recipe) => (
          <RecipeBox key={recipe.id} recipe={recipe} />
        ))}
      </RecipesContainer>
    </Wrapper>
  );
}
