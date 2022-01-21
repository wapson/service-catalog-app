import styled from "styled-components";

export const StyledHeader = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.whiteColor};
  padding-bottom: 1rem;
`;

export const StyledParagraph = styled.p`
  text-align: center;
  text-align: ${(props) => props.textAlign};
  color: ${(props) => props.theme.whiteColor};
  color: ${(props) => props.color};
  font-size: 1.5rem;
  padding: 0 1rem 1rem;
`;

export const Styledlabel = styled.p`
  color: ${(props) => props.theme.darkColor};
  font-size: 1.5rem;
  font-weight: 400;
  margin: 1rem;
  background-color: ${(props) => props.theme.whiteColor};
  padding: 0.5rem;
  border: 2px solid ${(props) => props.theme.darkColor};
  border-radius: 0.5rem;
`;

export const Inputlabel = styled.label`
  color: ${(props) => props.theme.whiteColor};
  margin: 1rem;
  font-size: 1.5rem;
`;
