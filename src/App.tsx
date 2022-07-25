import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Routes, Route } from "react-router-dom";

import { NavBar, Home, Loader, RecipeDetails } from "./components";
import { useApi, useTheme } from "./context";
import { useEffect } from "react";

const AppContainer = styled.div<{ theme: "light" | "dark" }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme === "light"
      ? "var(--shell-background)"
      : "var(--main-background)"};
  width: 100vw;
  padding: 1rem;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 5rem;
`;

function App() {
  const { isLoading } = useApi();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  });
  return (
    <AppContainer className="App" theme={theme}>
      <NavBar />
      <InnerContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/food-app" element={<Home />} />
            <Route path="/food-app/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        )}
      </InnerContainer>
    </AppContainer>
  );
}

export default App;
