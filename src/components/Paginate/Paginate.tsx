import styled from "styled-components";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import { useApi, useSearch, useRecipes } from "../../context";
import { useCallback } from "react";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  align-items: center;
  justify-content: space-between;

  svg,
  p {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin: 0 0.5rem;

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

  const currentPage = offset / number + 1;
  const totalPages = Math.ceil(totalResults / number);

  const handleNext = useCallback(async () => {
    if (currentPage === totalPages) return;
    const newRecipes = await getByQuery(query, (offset + number).toString());
    setRecipes(newRecipes);
  }, [currentPage, totalPages, getByQuery, query, offset, number, setRecipes]);

  const handlePrev = useCallback(async () => {
    if (currentPage === 1) return;
    const newRecipes = await getByQuery(query, (offset - number).toString());
    setRecipes(newRecipes);
  }, [currentPage, getByQuery, query, offset, number, setRecipes]);

  const goToLastPage = useCallback(async () => {
    if (currentPage === totalPages) return;
    const newRecipes = await getByQuery(
      query,
      (totalPages * number - number).toString()
    );
    setRecipes(newRecipes);
  }, [currentPage, totalPages, getByQuery, query, number, setRecipes]);

  const goToFirstPage = useCallback(async () => {
    if (currentPage === 1) return;
    const newRecipes = await getByQuery(query, "0");
    setRecipes(newRecipes);
  }, [currentPage, getByQuery, query, setRecipes]);

  return (
    <Container>
      <p onClick={goToFirstPage}>First</p>
      <ArrowBackIos onClick={handlePrev} />
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <ArrowForwardIos onClick={handleNext} />
      <p onClick={goToLastPage}>Last</p>
    </Container>
  );
}
