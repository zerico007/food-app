import styled from "styled-components";
import parse from "html-react-parser";

import { useRecipeDetails } from "../../context";

const Wrapper = styled.div`
  width: 90%;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  background-color: #fff;
  border-radius: 0.2rem;

  * {
    font-family: "Josefin Sans", sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 48%;
  height: 100%;
  align-items: center;
  padding-top: 2.5rem;

  @media (max-width: 1000px) {
    width: 100%;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 48%;
  height: 100%;
  padding: 0.5rem;
  color: var(--main-text-color);

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export default function RecipeDetails() {
  const { recipeDetails } = useRecipeDetails();
  const { image, ingredients, instructions, summary, title } = recipeDetails;

  return (
    <Wrapper>
      <h1>{title}</h1>
      <Container>
        <ImageContainer>
          <img src={image} alt={title} loading="eager" />
        </ImageContainer>
        <InfoContainer>
          <div>
            <h4>Summary</h4>
            <p>{parse(summary)}</p>
          </div>
          <div>
            <h4>Ingredients</h4>
            <ul>
              {ingredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Instructions</h4>
            {instructions && <p>{parse(instructions)}</p>}
          </div>
        </InfoContainer>
      </Container>
    </Wrapper>
  );
}
