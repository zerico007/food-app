import styled from "styled-components";
import parse from "html-react-parser";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useClearSession } from "../../hooks";
import { useRecipeDetails } from "../../context";
import { Button } from "..";

const Parent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

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
    font-family: "Dancing Script", cursive;
    font-weight: 600;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  width: 70%;
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
  width: 80%;
  height: 100%;
  padding: 0.5rem;
  color: var(--main-text-color);

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const NumberCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--button-red);
  color: var(--main-white);
  margin-right: 0.5rem;
`;

const SummaryBox = styled.div`
  width: 80%;
  padding: 1rem;

  p,
  p > * {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const InstructionsBox = styled.div`
  * {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
  }
  padding: 1rem;
`;

export default function RecipeDetails() {
  const { recipeDetails } = useRecipeDetails();
  const { clearSession } = useClearSession();
  const navigate = useNavigate();

  const { image, ingredients, instructions, summary, title } = recipeDetails;

  return (
    <Parent>
      <Button
        theme="primary"
        width="13rem"
        content={
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ArrowBackIosNew />
            <span>Back to search</span>
          </div>
        }
        onClick={() => {
          clearSession();
          navigate("/food-app");
        }}
        margin="2rem 0"
      />
      <Wrapper>
        <h1>{title}</h1>

        <ImageContainer>
          <img src={image} alt={title} loading="eager" />
        </ImageContainer>
        <InfoContainer>
          <SummaryBox>
            <h2>Summary</h2>
            <p>{parse(summary)}</p>
          </SummaryBox>
          <div style={{ padding: "1rem" }}>
            <h2>Ingredients</h2>
            <ul style={{ listStyle: "none" }}>
              {ingredients.map((ingredient: string, index: number) => (
                <li key={index}>
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    <NumberCircle> &#10004;</NumberCircle>
                    <p>{ingredient}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: "1rem" }}>
            <h2>Instructions</h2>
            {instructions && (
              <InstructionsBox>{parse(instructions)}</InstructionsBox>
            )}
          </div>
        </InfoContainer>
      </Wrapper>
    </Parent>
  );
}
