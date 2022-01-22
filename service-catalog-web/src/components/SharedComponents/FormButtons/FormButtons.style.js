import styled from "styled-components";

export const FormButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  margin: 1rem;
  background-color: ${(props) => props.theme.whiteColor};
  color: ${(props) => props.theme.lightDarkColor};
  border: 1px solid ${(props) => props.theme.whiteColor};
  border-radius: 5px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  width: 100%;
  &:hover {
    transform: scale(1.05);
  }
  &:disabled {
    background-color: ${(props) => props.theme.lightDarkColor};
    color: ${(props) => props.theme.lightDarkColor};
  }
`;
