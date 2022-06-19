import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useClearSession } from "../../hooks";
import { useTheme } from "../../context";
import { Toggle } from "..";
import { useCallback } from "react";

const StyledNav = styled.nav<{ theme: "light" | "dark" }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 2rem;
  background-color: ${(props) =>
    props.theme === "light" ? "var(--main-white)" : "var(--main-background)"};
  width: 100%;
  height: 4.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const Logo = styled.h2<{ theme: "light" | "dark" }>`
  color: ${(props) =>
    props.theme === "dark" ? "var(--main-white)" : "var(--main-background)"};
  cursor: pointer;
  font-family: "Dancing Script", cursive;
  font-size: 40px;
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
      <Logo
        onClick={() => {
          navigate("/food-app");
          clearSession();
        }}
        theme={theme}
      >
        Foodie!
      </Logo>
      <Toggle toggleOn={theme === "light"} onClick={handleThemeToggle} />
    </StyledNav>
  );
}
