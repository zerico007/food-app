import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { HTMLAttributes } from "react";

import { Button } from "..";

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
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
`;

const ValueBox = styled.div`
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 60px;
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
    if (value + increment > max) {
      onChange(max);
    }
    onChange(value + increment);
  };

  const handleDecrement = () => {
    if (value - increment < min) {
      onChange(min);
    }
    onChange(value - increment);
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
        <ValueBox>{value}</ValueBox>
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
