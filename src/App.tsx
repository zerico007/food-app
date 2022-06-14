import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Routes, Route } from "react-router-dom";

import { NavBar, RecipesContainer, Loader, RecipeDetails } from "./components";
import { useApi } from "./context";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: var(--main-white);
  width: 100vw;
  padding: 1rem;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 4rem;
`;

function App() {
  const { isLoading } = useApi();
  return (
    <AppContainer className="App">
      <NavBar />
      <InnerContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/food-app" element={<RecipesContainer />} />
            <Route path="/food-app/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        )}
      </InnerContainer>
    </AppContainer>
  );
}

export default App;
