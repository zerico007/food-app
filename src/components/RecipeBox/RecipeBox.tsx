import { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "..";
import { useApi, useRecipeDetails } from "../../context";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  color: var(--main-blue);
  width: 580px;
  height: 200px;
  border-radius: 0.2rem;

  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 50%;
  height: 100%;

  @media (max-width: 500px) {
    width: 100%;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0.5rem;
  text-align: center;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export default function RecipeBox({ recipe }: { recipe: IRecipe }) {
  const { image, title, id } = recipe;
  const { getRecipeDetails } = useApi();
  const { setRecipeDetails } = useRecipeDetails();

  const navigate = useNavigate();

  const handleGetRecipeDetails = useCallback(async () => {
    try {
      const fetchedRecipe = await getRecipeDetails(id.toString());
      setRecipeDetails(fetchedRecipe);
      navigate(`/food-app/recipe/${id}`);
    } catch (error) {
      console.log(error);
    }
  }, [getRecipeDetails, id, navigate, setRecipeDetails]);

  return (
    <Container>
      <ImageContainer>
        <img src={image} alt={title} loading="lazy" />
      </ImageContainer>
      <TitleContainer>
        <h5>{title}</h5>
        <Button
          onClick={handleGetRecipeDetails}
          content="view recipe"
          theme="primary"
          height="1.8rem"
        />
      </TitleContainer>
    </Container>
  );
}
