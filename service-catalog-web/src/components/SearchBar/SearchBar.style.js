import styled, { css } from "styled-components";

export const baseSearchBarStyles = css`
  height: 25px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.lightGreyColor};
  background-color: ${(props) => props.theme.whiteColor};
  outline: none;
  padding-left: 0.5rem;
`;

export const SearchBar = styled.input`
  ${baseSearchBarStyles};
  width: 250px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const SearchSelect = styled.select`
  ${baseSearchBarStyles};
  border: 2px solid ${(props) => props.theme.lightGreyColor};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;
