import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

import { useApi, useSearch, useRecipes } from "../../context";
import { useCallback } from "react";

const Container = styled.div`
  display: flex;
  width: 60%;
  height: 4rem;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    :hover {
      transform: scale(1.2);
    }
  }
`;

export default function Paginate() {
  const { responseInfo, getByQuery } = useApi();
  const { query } = useSearch();
  const { setRecipes } = useRecipes();
  const { totalResults, number, offset } = responseInfo;

  const handleNext = useCallback(async () => {
    const newRecipes = await getByQuery(query, (offset + number).toString());
    setRecipes(newRecipes);
  }, [getByQuery, query, offset, number, setRecipes]);

  const handlePrev = useCallback(async () => {
    const newRecipes = await getByQuery(query, (offset - number).toString());
    setRecipes(newRecipes);
  }, [getByQuery, query, offset, number, setRecipes]);

  const currentPage = offset / number + 1;

  return (
    <Container>
      <ArrowLeft onClick={handlePrev} />
      <p>{`Page ${currentPage} of ${Math.ceil(totalResults / number)}.`}</p>
      <ArrowRight onClick={handleNext} />
    </Container>
  );
}
