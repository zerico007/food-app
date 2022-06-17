import { ChangeEvent, useCallback, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@mui/icons-material";

import { Button, Input } from "..";
import { useApi, useRecipes, useSearch, useTheme } from "../../context";

const determineBorderColor = (theme: "light" | "dark") => {
  return theme === "light"
    ? "3px solid var(--main-blue)"
    : "3px solid var(--main-pink-hovered)";
};

const StyledSearch = styled.div<{
  isFocused: boolean;
  theme: "light" | "dark";
}>`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  align-items: center;
  background-color: #fff;
  color: var(--main-white);
  width: 35rem;
  height: 3.5rem;
  font-size: 1rem;
  font-weight: normal;
  border-radius: 0.3rem;
  box-sizing: border-box;
  border: ${(props) =>
    props.isFocused ? determineBorderColor(props.theme) : "none"};

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export default function Search() {
  const { getByQuery } = useApi();
  const { setRecipes } = useRecipes();
  const { setQuery, category } = useSearch();
  const { theme } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  const handleSearch = useCallback(async () => {
    const fetchedRecipes = await getByQuery(searchTerm, "0", category);
    setRecipes(fetchedRecipes);
    setQuery(searchTerm);
    setSearchTerm("");
  }, [getByQuery, searchTerm, setQuery, setRecipes, category]);

  const handleSearchByEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <StyledSearch theme={theme} isFocused={isFocused}>
      <Input
        width="90%"
        padding="0.5rem"
        type="text"
        placeholder="Search for a recipe ..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleSearchByEnter}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Button
        onClick={handleSearch}
        theme="nav"
        width="fit-content"
        content={<SearchIcon style={{ color: "var(--main-text-color)" }} />}
      />
    </StyledSearch>
  );
}
