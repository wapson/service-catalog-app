import styled from "styled-components";

export const FilteredServicesList = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SearchSelect = styled.select`
  background-color: ${(props) => props.theme.whiteColor};
  border-radius: 5px;
  margin: 1rem;
  padding: 1.5rem 0;
  width: 100px;
`;
