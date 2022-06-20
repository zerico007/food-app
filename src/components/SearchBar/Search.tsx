import { ChangeEvent, useCallback, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@mui/icons-material";

import { Button, Input } from "..";
import { useApi, useRecipes, useSearch, useTheme } from "../../context";

const StyledSearch = styled.div<{
  isFocused: boolean;
  theme: "light" | "dark";
}>`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  align-items: center;
  background-color: #fff;
  color: var(--main-white);
  width: 35rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: normal;
  border-radius: 0.3rem;
  box-sizing: border-box;
  border: ${(props) =>
    props.isFocused ? "3px solid var(--main-red)" : "none"};

  @media (max-width: 580px) {
    width: 100%;
  }
`;

export default function Search() {
  const { getByQuery } = useApi();
  const { setRecipes } = useRecipes();
  const { setQuery, category, query } = useSearch();
  const { theme } = useTheme();

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const handleSearch = useCallback(async () => {
    const fetchedRecipes = await getByQuery(query, "0", category);
    setRecipes(fetchedRecipes);
  }, [getByQuery, query, setRecipes, category]);

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
        margin="0.5rem"
        type="text"
        placeholder="Search for a recipe ..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleSearchByEnter}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Button
        onClick={handleSearch}
        theme="primary"
        width="3rem"
        content={<SearchIcon style={{ color: "var(--main-white)" }} />}
      />
    </StyledSearch>
  );
}
