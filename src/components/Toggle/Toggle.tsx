import styled from "styled-components";
import { DarkMode, LightMode } from "@mui/icons-material";

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  align-items: center;
  background-color: transparent;
  width: 100px;
  height: 40px;
`;

const ToggleContainer = styled.div<{ on: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${(props) =>
    !props.on ? "var(--oxford-blue)" : "var(--main-pink)"};
  position: relative;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;

const ToggleButton = styled.div<{ on: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: ${(props) =>
    !props.on ? "var(--main-pink)" : "var(--oxford-blue)"};
  transition: all 0.3s ease-in-out;
  position: relative;
  cursor: pointer;
  position: absolute;
  left: ${(props) => (props.on ? "0" : "25px")};
`;

export default function Toggle({
  on,
  onClick,
}: {
  on: boolean;
  onClick: () => void;
}) {
  return (
    <ToggleWrapper>
      <ToggleContainer on={on}>
        <ToggleButton on={on} onClick={onClick} />
      </ToggleContainer>
      {!on ? <DarkMode /> : <LightMode />}
    </ToggleWrapper>
  );
}
