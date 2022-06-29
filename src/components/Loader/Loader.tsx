import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--button-red);

  p {
    color: var(--button-red);
    font-size: 1.5rem;
  }
`;

export default function Loader() {
  return (
    <LoaderContainer>
      <MutatingDots height="100" width="100" color="var(--button-red)" />
      <p>Loading...</p>
    </LoaderContainer>
  );
}
