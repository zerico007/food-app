import { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: "primary" | "secondary" | "tertiary" | "nav";
  width?: string;
  height?: string;
  margin?: string;
  content: string | ReactNode;
}

const buttonCSS = {
  primary: css`
    background-color: var(--main-blue);
    color: var(--main-white);
    border: 2px solid var(--main-blue-hovered);

    :hover {
      background-color: var(--main-blue-hovered);
      border: 2px solid var(--main-blue);
    }
  `,
  secondary: css`
    background-color: var(--main-white);
    color: var(--main-blue);
    border: 2px solid var(--main-blue);

    :hover {
      background-color: var(--main-white-hovered);
    }
  `,
  tertiary: css`
    background-color: var(--main-pink);
    color: var(--main-white);
    border: 2px solid var(--main-pink-hovered);

    :hover {
      background-color: var(--main-pink-hovered);
      border: 2px solid var(--main-pink);
    }
  `,
  nav: css`
    background-color: transparent;
    color: var(--main-white);
    border: none;
  `,
};

const determineThemeCSS = (theme: ButtonProps["theme"]) => {
  return buttonCSS[theme];
};

const StyledButton = styled.button<Omit<ButtonProps, "content">>`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: 0.25rem;
  box-sizing: border-box;
  font-size: 0.9rem;
  font-weight: normal;
  text-transform: uppercase;
  border-radius: 0.2rem;
  transition: all 0.3s ease-in-out;

  :hover {
    transform: scale(1.05);
  }
  ${(props) => determineThemeCSS(props.theme)};
`;

export default function Button({
  theme = "primary",
  width = "10rem",
  height = "2.5rem",
  margin = "0.5rem",
  content,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      margin={margin}
      theme={theme}
      width={width}
      height={height}
      {...rest}
    >
      {content}
    </StyledButton>
  );
}
