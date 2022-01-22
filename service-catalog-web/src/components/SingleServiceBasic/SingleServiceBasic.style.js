import styled from "styled-components";

export const SingleServiceBasic = styled.div`
  width: 100%;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  background-color: ${(props) => props.theme.lightDarkColor};
  border-radius: 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  > div {
    width: 100%;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      overflow: auto;
      max-height: 100px;
    }

    > section {
      width: 100%;
      display: flex;
      align-items: center;
      h1 {
        width: 100%;
        padding-bottom: 0;
      }
      i {
        transform: scale(1.5);
        color: ${(props) => props.theme.whiteColor};
      }
    }
  }
`;
