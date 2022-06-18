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

const ToggleContainer = styled.div<{ toggleOn: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${(props) =>
    !props.toggleOn ? "var(--oxford-blue)" : "var(--main-background)"};
  position: relative;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;

const ToggleButton = styled.div<{ toggleOn: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  background-color: ${(props) =>
    !props.toggleOn ? "var(--main-background)" : "var(--oxford-blue)"};
  transition: all 0.3s ease-in-out;
  position: relative;
  cursor: pointer;
  position: absolute;
  left: ${(props) => (props.toggleOn ? "0" : "25px")};
`;

export default function Toggle({
  toggleOn,
  onClick,
}: {
  toggleOn: boolean;
  onClick: () => void;
}) {
  return (
    <ToggleWrapper>
      <ToggleContainer toggleOn={toggleOn}>
        <ToggleButton toggleOn={toggleOn} onClick={onClick} />
      </ToggleContainer>
      {!toggleOn ? <DarkMode /> : <LightMode />}
    </ToggleWrapper>
  );
}
