import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { HTMLAttributes } from "react";

import { Button, Input } from "..";

interface NumberPickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  increment?: number;
  margin?: string;
}

const Container = styled.div<{ margin: string }>`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 60px;
  justify-content: space-between;
  margin: ${(props) => props.margin};

  div {
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
`;

export default function NumberPicker({
  value,
  onChange,
  min = 0,
  max = 100,
  increment = 5,
  label,
  margin = "0",
  ...rest
}: NumberPickerProps) {
  const handleIncrement = () => {
    const newValue = value + increment;
    if (newValue > max) {
      onChange(max);
      return;
    }
    onChange(value + increment);
  };

  const handleDecrement = () => {
    const newValue = value - increment;
    if (newValue < min) {
      onChange(min);
      return;
    }
    onChange(value - increment);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //check if key is a digit and not backspace
    if (!e.key.match(/^\d$/) && e.key !== "Backspace") return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (isNaN(inputValue) || inputValue > max || inputValue < min) return;
    onChange(inputValue);
  };

  return (
    <Container {...rest} margin={margin}>
      <div>{label}</div>
      <Wrapper>
        <Button
          onClick={handleDecrement}
          theme="secondary"
          content={<Remove />}
          width="30px"
          height="100%"
          margin="0"
        />
        <Input
          value={value}
          onChange={handleInputChange}
          width="80px"
          height="100%"
          border="none"
          padding="1rem"
          onKeyDown={handleInputKeyDown}
        />
        <Button
          onClick={handleIncrement}
          theme="primary"
          content={<Add />}
          width="30px"
          height="100%"
          margin="0"
        />
      </Wrapper>
    </Container>
  );
}
