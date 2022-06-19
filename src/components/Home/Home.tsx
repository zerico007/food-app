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
import { useRecipes, useApi, useSearch, useTheme } from "../../context";
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

const fadeInHero = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Heading = styled.div<{ theme: "light" | "dark" }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) =>
    theme === "dark" ? "var(--main-white)" : "var(--main-red)"};
  width: 50%;

  @media (max-width: 500px) {
    width: 100%;
  }
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

const ResponsiveBtn = styled(Button)`
  width: 300px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const HeroImageContainer = styled.div`
  height: 300px;
  width: 35rem;
  margin: 1rem auto;
  animation: ${fadeInHero} 0.8s ease-in-out;

  @media (max-width: 500px) {
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
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
  const { theme } = useTheme();

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
        <Heading theme={theme}>
          <p>
            {`Showing ${
              number < totalResults ? number : totalResults
            } results of ${totalResults}`}
          </p>
          <Paginate />
          <ResponsiveBtn
            onClick={clearSession}
            content="clear search"
            theme="secondary"
            height="56px"
          />
        </Heading>
      );
    } else {
      if (!totalResults && number) {
        return (
          <Heading theme={theme}>
            <p>{`No results found for "${query}". Try again.`}</p>
          </Heading>
        );
      }
    }
  }, [number, query, totalResults, theme, clearSession]);

  return (
    <Wrapper>
      <HeroImageContainer>
        <img
          src="https://live.staticflickr.com/65535/52145892038_5e3a5891ff_c.jpg"
          loading="eager"
          alt="foods pic"
        />
      </HeroImageContainer>
      <Heading theme={theme}>
        <h2 style={{ fontWeight: 500, fontFamily: "Dancing Script" }}>
          Search for your favorite recipe!
        </h2>
      </Heading>
      <SearchDiv>
        <Search />
        <Select
          options={selectOptions}
          onChange={handleChange}
          selected={category ? { value: category, label: category } : null}
          margin="1rem 0"
          width="35rem"
        />
        <ResponsiveBtn
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
          height="56px"
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
