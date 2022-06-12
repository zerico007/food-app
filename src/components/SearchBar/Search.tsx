import { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";

const StyledSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: var(--main-white);
  width: 25rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: normal;
  border-radius: 0.2rem;
  box-sizing: border-box;
  border: 1px solid var(--main-white);
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--main-white);
`;

export default function Search() {
  const [search, setSearch] = useState("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  return (
    <StyledSearch>
      <SearchInput
        type="text"
        placeholder="Search for a recipe ..."
        value={search}
        onChange={handleChange}
      />
    </StyledSearch>
  );
}
