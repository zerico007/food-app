import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
}

const StyledInput = styled.input<InputProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: none;
  outline: none;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: transparent;
  color: var(--main-text-color);
`;

export default function Input({
  width = "100%",
  height = "100%",
  padding = "0",
  margin = "0",
  ...rest
}: InputProps) {
  return (
    <StyledInput
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      {...rest}
    />
  );
}
