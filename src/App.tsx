import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Routes, Route } from "react-router-dom";

import { NavBar, RecipesContainer, Loader, RecipeDetails } from "./components";
import { useApi, useTheme } from "./context";

const AppContainer = styled.div<{ theme: "light" | "dark" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme === "light" ? "var(--main-white)" : "var(--oxford-blue-lite)"};
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
  const { theme } = useTheme();
  return (
    <AppContainer className="App" theme={theme}>
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
