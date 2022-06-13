import styled from "styled-components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { NavBar, RecipesContainer, Loader } from "./components";
import { useApi } from "./context";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: var(--main-white);
  width: 100vw;
  padding: 1rem;
`;

function App() {
  const { isLoading } = useApi();
  return (
    <AppContainer className="App">
      <NavBar />
      {isLoading ? <Loader /> : <RecipesContainer />}
    </AppContainer>
  );
}

export default App;
