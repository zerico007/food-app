import styled from "styled-components";
import { NavBar, RecipesContainer } from "./components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--main-white);
  width: 100vw;
  padding: 1rem;
`;

function App() {
  return (
    <AppContainer className="App">
      <NavBar />
      <RecipesContainer />
    </AppContainer>
  );
}

export default App;
