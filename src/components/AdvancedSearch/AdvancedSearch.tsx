import { HTMLAttributes, useState } from "react";
import styled, { keyframes } from "styled-components";

import { NumberPicker, Button } from "..";

interface AdvancedSearchProps extends HTMLAttributes<HTMLDivElement> {
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  } to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 35rem;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 0.5rem;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 580px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: 1rem;
  height: 230px;
`;

const ButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export default function AdvancedSearch({
  onCancel,
  onSubmit,
  ...props
}: AdvancedSearchProps) {
  const [maxFat, setMaxFat] = useState(0);
  const [maxCarbs, setMaxCarbs] = useState(0);
  const [maxProtein, setMaxProtein] = useState(0);
  const [maxCalories, setMaxCalories] = useState(0);

  const handleSubmit = () => {
    const values = { maxFat, maxCarbs, maxProtein, maxCalories };
    onSubmit(values);
  };

  return (
    <Wrapper {...props}>
      <Container>
        {[
          {
            label: "Max Carbs",
            id: "max-carbs",
            value: maxCarbs,
            onChange: setMaxCarbs,
          },
          {
            label: "Max Protein",
            id: "max-protein",
            value: maxProtein,
            onChange: setMaxProtein,
          },
          {
            label: "Max Fat",
            id: "max-fat",
            value: maxFat,
            onChange: setMaxFat,
          },
          {
            label: "Max Calories",
            id: "max-calories",
            value: maxCalories,
            onChange: setMaxCalories,
          },
        ].map(({ label, id, value, onChange }) => (
          <NumberPicker
            label={label}
            min={0}
            max={1000}
            id={id}
            key={id}
            value={value}
            onChange={onChange}
            increment={10}
            margin="1rem 0"
          />
        ))}
      </Container>
      <ButtonsDiv>
        <Button
          theme="tertiary"
          content="Cancel"
          height="2rem"
          width="6rem"
          onClick={onCancel}
        />
        <Button
          theme="primary"
          content="Apply"
          height="2rem"
          width="6rem"
          onClick={handleSubmit}
        />
      </ButtonsDiv>
    </Wrapper>
  );
}
