import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  border?: string;
  background?: string;
  showLabel?: boolean;
  label?: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: InputProps) => props.width};
  height: ${(props: InputProps) => props.height};
  margin: ${(props: InputProps) => props.margin};
  background-color: transparent;
  justify-content: center;
`;

const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: ${(props) => (props.showLabel ? "50%" : "100%")};
  border: ${(props) => props.border};
  outline: none;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border-radius: 0.2rem;
  background-color: ${(props) => props.background};
  color: var(--main-text-color);
  font-size: 14px;

  :focus {
    border: ${(props) =>
      props.border === "none" ? "none" : "2px solid var(--oxford-blue-lite)"};
  }
`;

const StyledLabel = styled.label`
  display: flex;
  color: var(--main-text-color);
  font-size: 0.8rem;

  :before {
    content: "${(props: InputProps) => props.label}";
  }
`;

export default function Input({
  width = "100%",
  height = "100%",
  padding = "0",
  margin = "0",
  border = "none",
  background = "transparent",
  showLabel = false,
  label = "",
  ...rest
}: InputProps) {
  return (
    <InputContainer
      width={width}
      height={height}
      background={background}
      margin={margin}
    >
      {showLabel && <StyledLabel htmlFor={rest.id} label={label} />}
      <StyledInput
        width={width}
        height={height}
        padding={padding}
        border={border}
        background={background}
        showLabel={showLabel}
        {...rest}
      />
    </InputContainer>
  );
}
