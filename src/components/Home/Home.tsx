import { useCallback, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ChevronRight, KeyboardArrowDown } from "@mui/icons-material";

import {
  Paginate,
  Button,
  Search,
  Select,
  Option,
  Recipes,
  NumberPicker,
} from "..";
import { useRecipes, useApi, useSearch, useTheme } from "../../context";
import { useClearSession } from "../../hooks";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  } to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

  .advanced-search.close {
    animation: ${fadeOut} 0.3s ease-in-out;
  }
`;

const AdvancedSearch = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 35rem;
  overflow: hidden;
  margin-top: 1rem;
  border-radius: 0.5rem;
  padding: 1rem;
  height: 230px;
  background-color: #fff;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 580px) {
    width: 100%;
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
  const { recipes } = useRecipes();
  const { responseInfo, getByQuery } = useApi();
  const { query, setCategory, category } = useSearch();
  const { clearSession } = useClearSession();
  const { theme } = useTheme();

  const { totalResults, number } = responseInfo;

  const [, setSelectedOption] = useState<Option | null>(null);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [maxFat, setMaxFat] = useState(0);
  const [maxCarbs, setMaxCarbs] = useState(0);
  const [maxProtein, setMaxProtein] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);

  const advancedSearchRef = useRef<HTMLDivElement>(null);

  const toggleAdvancedSearch = useCallback(() => {
    if (showAdvancedSearch) {
      advancedSearchRef.current?.classList.add("close");
      setTimeout(() => {
        setShowAdvancedSearch(false);
      }, 300);
    } else {
      setShowAdvancedSearch(true);
    }
  }, [showAdvancedSearch]);

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
          height="1.7rem"
        />
        {showAdvancedSearch && (
          <AdvancedSearch ref={advancedSearchRef} className="advanced-search">
            {[
              {
                label: "Max Carbs",
                id: "max-carbs",
                value: maxCarbs,
                onChange: setMaxCarbs,
              },
              {
                label: "Max Protein",
                id: "max-protein",
                value: maxProtein,
                onChange: setMaxProtein,
              },
              {
                label: "Max Fat",
                id: "max-fat",
                value: maxFat,
                onChange: setMaxFat,
              },
              {
                label: "Max Calories",
                id: "max-calories",
                value: maxCalories,
                onChange: setMaxCalories,
              },
            ].map(({ label, id, value, onChange }) => (
              <NumberPicker
                label={label}
                min={0}
                max={1000}
                id={id}
                key={id}
                value={value}
                onChange={onChange}
                increment={10}
                margin="1rem 0"
              />
            ))}
          </AdvancedSearch>
        )}
      </SearchDiv>
      {determineHeading()}
      <Recipes recipes={recipes} />
    </Wrapper>
  );
}
