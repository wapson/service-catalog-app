import styled from "styled-components";

export const SideBar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  div {
    height: 100%;
    width: 300px;
    background-color: ${(props) => props.theme.lightGreyColor};
    button {
      margin: 1.5rem;
      border: none;
      cursor: pointer;
      i {
        font-size: 2rem;
        color: ${(props) => props.theme.whiteColor};
      }
    }
    ul {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      li {
        button {
          color: ${(props) => props.theme.whiteColor};
          font-size: 2rem;
        }
        border-bottom: 1px solid ${(props) => props.theme.whiteColor};
        padding-bottom: 0.5rem;
      }
    }
  }
`;
