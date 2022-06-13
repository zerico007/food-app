import styled from "styled-components";
import { NavBar, RecipeBox } from "./components";
import { useRecipes, useApi } from "./context";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--main-white);
  width: 100vw;
  padding: 1rem;
`;

const RecipesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: auto;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 4rem;
`;

function App() {
  const { recipes } = useRecipes();
  const { responseInfo } = useApi();
  return (
    <AppContainer className="App">
      <NavBar />
      {!!recipes.length && (
        <h3 style={{ marginTop: "4rem" }}>
          {`Showing ${recipes.length} recipes from ${responseInfo.totalResults}`}
        </h3>
      )}
      <RecipesContainer>
        {recipes?.map((recipe) => (
          <RecipeBox key={recipe.id} recipe={recipe} />
        ))}
      </RecipesContainer>
    </AppContainer>
  );
}

export default App;
