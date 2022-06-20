import { HTMLAttributes, useState, ChangeEvent, KeyboardEvent } from "react";
import styled, { keyframes } from "styled-components";
import {
  Add,
  Remove,
  ChevronRight,
  KeyboardArrowDown,
} from "@mui/icons-material";

import { NumberPicker, Button, Input } from "..";
import { useSearch } from "../../context";

interface AdvancedSearchProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit: () => void;
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
  height: auto;
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

const IngredientsContainer = styled(Container)`
  height: auto;
  flex-wrap: nowrap;
`;

const SearchIngredientsButton = styled(Button)`
  :hover {
    background-color: transparent;
    text-decoration: underline;
    line-height: 1.5;
  }
`;

const ButtonsDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const IngredientBox = styled.div<{ plus: boolean }>`
  display: flex;
  width: 100px;
  height: 24px;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: ${({ plus }) =>
    plus ? "var(--main-green)" : "var(--main-red)"};
  color: var(--main-white);
  margin: 0.5rem;
`;

const IngredientBoxBtn = styled(Button)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--main-text-color);

  :hover {
    background-color: var(--main-text-color);
  }
`;

const IngredientsList = styled.div`
  display: flex;
  width: 80%;
  height: auto;
  flex-wrap: wrap;
`;

export default function AdvancedSearch({
  onCancel,
  onSubmit,
  ...props
}: AdvancedSearchProps) {
  const {
    setNutrients,
    nutrients,
    includeIngredients,
    excludeIngredients,
    setExcludeIngredients,
    setIncludeIngredients,
  } = useSearch();

  const { maxFat, maxCalories, maxProtein, maxCarbs } = nutrients;

  const [searchByIngredients, setSearchByIngredients] = useState(false);
  const [includeIngredientsText, setIncludeIngredientsText] = useState("");
  const [excludeIngredientsText, setExcludeIngredientsText] = useState("");

  const toggleSearchByIngredients = () => {
    setSearchByIngredients(!searchByIngredients);
  };

  const handleIncludeIngredientsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIncludeIngredientsText(e.target.value);
  };

  const handleExcludeIngredientsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExcludeIngredientsText(e.target.value);
  };

  const handleIncludeIngredientsSubmit = () => {
    setIncludeIngredients([...includeIngredients, includeIngredientsText]);
    setIncludeIngredientsText("");
  };

  const handleExcludeIngredientsSubmit = () => {
    setExcludeIngredients([...excludeIngredients, excludeIngredientsText]);
    setExcludeIngredientsText("");
  };

  const handleIncludeByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleIncludeIngredientsSubmit();
    }
  };

  const handleExcludeByEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleExcludeIngredientsSubmit();
    }
  };

  const removeIncludeIngredient = (ingredient: string) => {
    setIncludeIngredients(includeIngredients.filter((i) => i !== ingredient));
  };

  const removeExcludeIngredient = (ingredient: string) => {
    setExcludeIngredients(excludeIngredients.filter((i) => i !== ingredient));
  };

  const handleMaxFatChange = (value: number) => {
    setNutrients({ ...nutrients, maxFat: value });
  };

  const handleMaxCarbsChange = (value: number) => {
    setNutrients({ ...nutrients, maxCarbs: value });
  };

  const handleMaxProteinChange = (value: number) => {
    setNutrients({ ...nutrients, maxProtein: value });
  };

  const handleMaxCaloriesChange = (value: number) => {
    setNutrients({ ...nutrients, maxCalories: value });
  };

  return (
    <Wrapper {...props}>
      <Container>
        {[
          {
            label: "Max Carbs",
            id: "max-carbs",
            value: maxCarbs,
            onChange: handleMaxCarbsChange,
          },
          {
            label: "Max Protein",
            id: "max-protein",
            value: maxProtein,
            onChange: handleMaxProteinChange,
          },
          {
            label: "Max Fat",
            id: "max-fat",
            value: maxFat,
            onChange: handleMaxFatChange,
          },
          {
            label: "Max Calories",
            id: "max-calories",
            value: maxCalories,
            onChange: handleMaxCaloriesChange,
          },
        ].map(({ label, id, value, onChange }) => (
          <NumberPicker
            label={label}
            min={0}
            max={3000}
            id={id}
            key={id}
            value={value}
            onChange={onChange}
            increment={10}
            margin="1rem 0"
          />
        ))}
      </Container>
      <SearchIngredientsButton
        theme="tertiary"
        content={
          <div
            style={{ display: "flex", height: "100%", alignItems: "center" }}
          >
            <span>search by ingredients</span>
            {searchByIngredients ? <KeyboardArrowDown /> : <ChevronRight />}
          </div>
        }
        onClick={toggleSearchByIngredients}
        width="80%"
        margin="0.5rem auto"
      />
      {searchByIngredients && (
        <IngredientsContainer>
          {[
            {
              label: "Include Ingredients",
              icon: <Add />,
              value: includeIngredientsText,
              list: includeIngredients,
              onChange: handleIncludeIngredientsChange,
              onClick: handleIncludeIngredientsSubmit,
              remove: removeIncludeIngredient,
              onKeyPress: handleIncludeByEnter,
            },
            {
              label: "Exclude Ingredients",
              icon: <Remove />,
              value: excludeIngredientsText,
              list: excludeIngredients,
              onChange: handleExcludeIngredientsChange,
              onClick: handleExcludeIngredientsSubmit,
              remove: removeExcludeIngredient,
              onKeyPress: handleExcludeByEnter,
            },
          ].map(
            ({
              label,
              icon,
              value,
              onChange,
              list,
              onClick,
              remove,
              onKeyPress,
            }) => (
              <IngredientsContainer key={label}>
                <Input
                  type="text"
                  width="80%"
                  height="66px"
                  border="1px solid #ccc"
                  margin="0.5rem auto"
                  padding="0.25rem 0.5rem"
                  showLabel
                  label={label}
                  key={label}
                  value={value}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  icon={
                    <Button
                      theme="primary"
                      width="24px"
                      height="24px"
                      content={icon}
                      onClick={onClick}
                    />
                  }
                />
                <IngredientsList>
                  {list.map((ingredient, index) => (
                    <IngredientBox plus={label.includes("Include")} key={index}>
                      <span>{ingredient}</span>
                      <IngredientBoxBtn
                        theme="primary"
                        content={<Remove />}
                        margin="0"
                        onClick={() => remove(ingredient)}
                      />
                    </IngredientBox>
                  ))}
                </IngredientsList>
              </IngredientsContainer>
            )
          )}
        </IngredientsContainer>
      )}
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
          onClick={onSubmit}
        />
      </ButtonsDiv>
    </Wrapper>
  );
}
