import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "..";
import { useApi, useRecipeDetails } from "../../context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  padding: 0.5rem;
  background-color: #fff;
  color: var(--button-red);
  width: 350px;
  height: auto;
  border-radius: 0.2rem;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 0.5rem;
  text-align: center;

  h3 {
    font-family: "Dancing Script", cursive;
  }
`;

const ResponsiveBtn = styled(Button)`
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export default function RecipeBox({ recipe }: { recipe: IRecipe }) {
  const { image, title, id } = recipe;
  const { getRecipeDetails } = useApi();
  const { setRecipeDetails } = useRecipeDetails();

  const navigate = useNavigate();

  const nutritionInfo = useMemo(() => {
    if (recipe.nutrition) {
      return recipe.nutrition?.nutrients.map(({ name, amount, unit }) => ({
        name,
        value: `${amount.toFixed(2)} ${unit}`,
      }));
    }
    return [];
  }, [recipe]);

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
      <InfoContainer>
        <h3>{title}</h3>
        {!!nutritionInfo.length &&
          nutritionInfo.map(({ name, value }) => (
            <h3 key={name}>{`${name}: ${value}`}</h3>
          ))}
        <ResponsiveBtn
          onClick={handleGetRecipeDetails}
          content="view recipe"
          theme="primary"
          height="56px"
        />
      </InfoContainer>
    </Container>
  );
}
