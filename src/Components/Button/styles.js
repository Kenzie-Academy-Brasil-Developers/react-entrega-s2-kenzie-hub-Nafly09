import styled from "styled-components";

export const Container = styled.button`
  background: ${(props) => (props.whiteSchema ? "#f5f5f5" : "#638fe3")};
  box-sizing: border-box;
  color: ${(props) => (props.whiteSchema ? "#0c0d0d" : "#f5f5f5")};
  width: 100%;
  height: 45px;
  border-radius: 8px;
  border: 2px solid var(--blue);
  font-family: "Roboto Mono", monospace;
  margin-top: 16px;
  transition: 0.5s;
  :hover {
    border: 2px solid var(--black);
  }
`;
