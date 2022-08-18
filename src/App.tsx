import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Routes, Route } from "react-router-dom";

import { NavBar, Home, Loader, RecipeDetails } from "./components";
import { useApi, useTheme } from "./context";
import { useEffect, useCallback, useMemo } from "react";

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

  const prefersDarkMode = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)"),
    []
  );

  const handleThemeChange = useCallback(
    (event: MediaQueryListEvent) => {
      if (event.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    },
    [setTheme]
  );

  useEffect(() => {
    prefersDarkMode.addEventListener("change", handleThemeChange);
    return () => {
      prefersDarkMode.removeEventListener("change", handleThemeChange);
    };
  }, [handleThemeChange, prefersDarkMode]);
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
