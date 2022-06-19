import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useClearSession } from "../../hooks";
import { useTheme } from "../../context";
import { Toggle } from "..";
import { useCallback } from "react";

const backgroundColor = (theme: string) => {
  if (theme === "light") {
    return "var(--main-white)";
  }
  return "var(--main-background)";
};

const StyledNav = styled.nav<{ theme: "light" | "dark" }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 2rem;
  background-color: ${({ theme }) => backgroundColor(theme)};
  width: 100%;
  height: 4.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;

  h2 {
    color: ${({ theme }) =>
      theme === "dark" ? "var(--main-white)" : "var(--main-background)"};
    cursor: pointer;
    font-family: "Dancing Script", cursive;
    font-size: 40px;
  }
`;

export default function NavBar() {
  const navigate = useNavigate();
  const { clearSession } = useClearSession();
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <StyledNav theme={theme}>
      <h2
        onClick={() => {
          navigate("/food-app");
          clearSession();
        }}
      >
        Foodie!
      </h2>
      <Toggle toggleOn={theme === "light"} onClick={handleThemeToggle} />
    </StyledNav>
  );
}
