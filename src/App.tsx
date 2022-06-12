import React from "react";
import styled from "styled-components";
import { NavBar } from "./components";

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
      Hello, food app.
    </AppContainer>
  );
}

export default App;
