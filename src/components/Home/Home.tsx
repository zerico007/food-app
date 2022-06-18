import { useCallback, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronRight, KeyboardArrowDown } from "@mui/icons-material";

import {
  Paginate,
  Button,
  Search,
  Select,
  Option,
  Recipes,
  AdvancedSearch,
} from "..";
import { useRecipes, useApi, useSearch } from "../../context";
import { useClearSession } from "../../hooks";

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  } to {
    opacity: 0;
    transform: translateY(-100px);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--main-white);
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .advanced-search.close {
    animation: ${fadeOut} 0.3s ease-in-out;
  }
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

export default function Home() {
  const { recipes, setRecipes } = useRecipes();
  const { responseInfo, getByQuery } = useApi();
  const { query, setCategory, category, nutrients } = useSearch();
  const { clearSession } = useClearSession();

  const { totalResults, number } = responseInfo;

  const [, setSelectedOption] = useState<Option | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const toggleAdvancedSearch = useCallback(() => {
    if (showAdvancedSearch) {
      const advancedSearchDiv = document.querySelector(
        ".advanced-search"
      ) as HTMLDivElement;
      advancedSearchDiv?.classList.add("close");
      setTimeout(() => {
        setShowAdvancedSearch(false);
      }, 300);
    } else {
      setShowAdvancedSearch(true);
    }
  }, [showAdvancedSearch]);

  const handleAdvancedSearch = useCallback(async () => {
    if (query) {
      const newFetchedRecipes = await getByQuery(
        query,
        "0",
        category,
        nutrients
      );
      setRecipes(newFetchedRecipes);
    }
  }, [query, category, getByQuery, nutrients, setRecipes]);

  const handleChange = useCallback(
    async (selected: Option | null) => {
      setSelectedOption(selected);
      setCategory(selected?.value as string);

      if (query) {
        const newRecipes = await getByQuery(query, "0", category, nutrients);
        setRecipes(newRecipes);
      }
    },
    [setCategory, query, category, getByQuery, setRecipes, nutrients]
  );

  const determineHeading = useCallback(() => {
    if (number && totalResults) {
      return (
        <Heading>
          <p>
            {`Showing ${
              number < totalResults ? number : totalResults
            } results of ${totalResults}`}
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
      if (!totalResults && number) {
        return (
          <Heading>
            <p>{`No results found for "${query}". Try again.`}</p>
          </Heading>
        );
      }
      return (
        <Heading>
          <h2 style={{ fontWeight: 500 }}>Search for your favorite recipe!</h2>
        </Heading>
      );
    }
  }, [number, query, totalResults, clearSession]);

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
        <Button
          onClick={toggleAdvancedSearch}
          theme="primary"
          content={
            <div
              style={{ display: "flex", height: "100%", alignItems: "center" }}
            >
              <span>ADVANCED SEARCH</span>
              {showAdvancedSearch ? <KeyboardArrowDown /> : <ChevronRight />}
            </div>
          }
        />
        {showAdvancedSearch && (
          <AdvancedSearch
            onCancel={toggleAdvancedSearch}
            onSubmit={handleAdvancedSearch}
            className="advanced-search"
          />
        )}
      </SearchDiv>
      {determineHeading()}
      <Recipes recipes={recipes} />
    </Wrapper>
  );
}
