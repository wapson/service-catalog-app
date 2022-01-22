import styled from "styled-components";

export const RecentlyAddedList = styled.div`
  border-right: 1px solid ${(props) => props.theme.lightGreyColor};
  width: 550px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  overflow-y: scroll;
`;
