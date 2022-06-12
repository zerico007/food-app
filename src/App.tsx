import React from "react";
import styled from "styled-components";
import { NavBar, Button } from "./components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--main-white);
  width: 100%;
`;

function App() {
  return (
    <AppContainer className="App">
      <NavBar />
      <div
        className="buttons"
        style={{
          display: "flex",
          width: "40rem",
          justifyContent: "space-evenly",
        }}
      >
        <Button theme="primary" content="Primary button" />
        <Button theme="secondary" content="Secondary button" />
        <Button theme="tertiary" content="Tertiary button" />
      </div>
    </AppContainer>
  );
}

export default App;
