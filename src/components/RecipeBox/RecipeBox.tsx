import styled from "styled-components";
import { Button } from "..";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: transparent;
  color: var(--main-blue);
  width: 380px;
  height: 200px;
  border-radius: 0.2rem;
  border: 2px solid var(--main-blue);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
`;

const ImageContainer = styled.div`
  display: flex;
  width: 50%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
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
`;

export default function RecipeBox({ recipe }: { recipe: IRecipe }) {
  const { image, title } = recipe;

  return (
    <Container>
      <ImageContainer>
        <img src={image} alt={title} />
      </ImageContainer>
      <TitleContainer>
        <h5>{title}</h5>
        <Button content="view recipe" theme="primary" height="1.8rem" />
      </TitleContainer>
    </Container>
  );
}
