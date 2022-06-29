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
  width: 53px;
  height: 28px;
  border-radius: 14px;
  background-color: ${(props) =>
    !props.toggleOn ? "var(--button-red)" : "#fff"};
  position: relative;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;

const ToggleButton = styled.div<{ toggleOn: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background-color: ${(props) =>
    !props.toggleOn ? "var(--main-white)" : "var(--button-red)"};
  transition: all 0.3s ease-in-out;
  position: relative;
  cursor: pointer;
  position: absolute;
  top: 1px;
  left: ${(props) => (props.toggleOn ? "0" : "25px")};
`;

export default function Toggle({
  toggleOn,
  onClick,
}: {
  toggleOn: boolean;
  onClick: () => void;
}) {
  const iconStyle = {
    color: toggleOn ? "var(--button-red)" : "var(--main-white)",
  };
  return (
    <ToggleWrapper>
      <ToggleContainer toggleOn={toggleOn}>
        <ToggleButton toggleOn={toggleOn} onClick={onClick} />
      </ToggleContainer>
      {!toggleOn ? (
        <DarkMode style={iconStyle} />
      ) : (
        <LightMode style={iconStyle} />
      )}
    </ToggleWrapper>
  );
}
