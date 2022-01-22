import styled from "styled-components";

export const Navbar = styled.nav`
  background-color: ${(props) => props.theme.lightDarkColor};
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};
`;

export const List = styled.ul`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
`;

export const NavSide = styled.div`
  display: flex;
`;

export const Icon = styled.i`
  font-size: 2rem;
  color: ${(props) => props.theme.whiteColor};
  margin: 0.5rem;
`;

export const Button = styled.button`
  border: none;
  cursor: pointer;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;
