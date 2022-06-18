import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useClearSession } from "../../hooks";
import { useTheme } from "../../context";
import { Toggle } from "..";
import { useCallback } from "react";

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background-color: var(--main-blue);
  color: var(--main-white);
  width: 100%;
  height: 4.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;

  div {
    margin: 0 auto;
  }
`;

const Logo = styled.h2`
  color: var(--main-white);
  cursor: pointer;
`;

export default function NavBar() {
  const navigate = useNavigate();
  const { clearSession } = useClearSession();
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <StyledNav>
      <Logo
        onClick={() => {
          navigate("/food-app");
          clearSession();
        }}
      >
        Foodie!
      </Logo>
      <Toggle toggleOn={theme === "light"} onClick={handleThemeToggle} />
    </StyledNav>
  );
}
