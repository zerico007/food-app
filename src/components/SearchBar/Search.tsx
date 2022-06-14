import { ChangeEvent, useCallback, KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "@mui/icons-material";

import { Button } from "..";
import { useApi, useRecipes, useSearch } from "../../context";

const StyledSearch = styled.div`
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
  border: 3px solid var(--main-blue);
`;

const SearchInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: transparent;
  color: var(--main-text-color);
`;

export default function Search() {
  const { getByQuery } = useApi();
  const { setRecipes } = useRecipes();
  const { setQuery } = useSearch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  const handleSearch = useCallback(async () => {
    const fetchedRecipes = await getByQuery(searchTerm);
    setRecipes(fetchedRecipes);
    setQuery(searchTerm);
    setSearchTerm("");
  }, [getByQuery, searchTerm, setQuery, setRecipes]);

  const handleSearchByEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <StyledSearch>
      <SearchInput
        type="text"
        placeholder="Search for a recipe ..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleSearchByEnter}
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
