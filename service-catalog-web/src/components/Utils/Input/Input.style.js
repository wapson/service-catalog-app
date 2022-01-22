import styled, { css } from "styled-components";

export const baseInputStyles = css`
  background-color: ${(props) => props.theme.lightDarkColor};
  border: 1px solid ${(props) => props.theme.whiteColor};
  border-radius: 5px;
  width: 350px;
  margin: 1rem;
  padding: 1rem;
  outline: none;
  color: ${(props) => props.theme.whiteColor};
  resize: none;
  &:focus {
    background-color: ${(props) => props.theme.whiteColor};
    color: ${(props) => props.theme.lightDarkColor};
  }
`;

export const Input = styled.input`
  ${baseInputStyles};
  height: 50px;
  padding-right: ${(props) => props.isPassword && "3.5rem"};
`;

export const InputVisibility = styled.i`
  color: ${(props) => props.theme.greyColor};
  position: relative;
  top: -4rem;
  left: 33.5rem;
  cursor: pointer;
  i {
    transform: scale(1.5);
  }
`;
