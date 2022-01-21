import styled from "styled-components";

export const SingleService = styled.div`
  cursor: ${(props) => (props.isOpen ? "initial" : "pointer")};
  width: ${(props) => props.width || "100%"};
  border: 1px solid ${(props) => props.theme.lightGreyColor};
  background-color: ${(props) => props.theme.lightDarkColor};
  height: ${(props) => (props.isOpen ? "auto" : "200px")};
  border-radius: 1rem;
  color: ${(props) => props.theme.whiteColor};
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-x: hidden;
    overflow-y: ${(props) => (props.isScrollable ? "auto" : "hidden")};};
    .first-row {
      width: 100%;
      height: 200px;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-column {
        width: 50%;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .header {
          width: 100%;
          margin: 2rem 0;
          display: flex;
          align-items:center;
          h1 {
            width: 45%;
            overflow-x: auto;
            margin: 0 2rem;
            font-size: 2rem;
            text-align:center;
          }
          i{
            transform: scale(1.5);
          }
        }
        .labels {
          overflow: auto;
          width: 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
      }
      .right-column {
        width: 50%;
        height: 200px;
        .description {
          margin: 2rem 0;
          font-size: 1.5rem;
          background-color: ${(props) => props.theme.greyColor};
          padding: 1rem;
          border: 2px solid ${(props) => props.theme.lightDarkColor};
          border-radius: 0.5rem;
          height: 160px;
          overflow-y: scroll;
          line-height: 1.5;
          width: 100%;
        }
      }
    }
    .second-row {
      width: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &--info {
        width: 100%;
        display: flex;
        margin: 1rem 0;
        .info {
          &--title {
            padding-left: 8rem;
            font-size: 2rem;
            width: 50%;
          }
          &--description {
            font-size: 1.5rem;
            width: 50%;
            p {
              padding: 0 1rem 0 0;
              display: inline-block;
            }
            a {
            }
          }
        }
        .labels {
          display: flex;
          flex-wrap: wrap;
          .label {
            color: ${(props) => props.theme.greyColor};
            font-size: 1.5rem;
            background-color: ${(props) => props.theme.lightGreyColor};
            padding: 0.5rem;
            border: 2px solid ${(props) => props.theme.darkColor};
            border-radius: 0.5rem;
            max-width: 100%;
            overflow-wrap: break-word;
            &__link {
              background-color: ${(props) => props.theme.lightGreyColor};
              &:hover {
                background-color: ${(props) => props.theme.whiteColor};
              }
            }
          }
        }
        .link {
          word-break: break-all;
          font-size: 1.5rem;
          background-color: ${(props) => props.theme.greyColor};
          padding: 0.5rem;
          border: 2px solid ${(props) => props.theme.darkColor};
          border-radius: 0.5rem;
          color: ${(props) => props.theme.greyColor};
          background-color: ${(props) => props.theme.lightGreyColor};
          &:hover {
            background-color: ${(props) => props.theme.whiteColor};
          }
        }
      }
    }
    .buttons {
      button {
        margin: 1rem;
        background-color: ${(props) => props.theme.whiteColor};
        color: ${(props) => props.theme.lightDarkColor};
        border: 1px solid ${(props) => props.theme.whiteColor};
        border-radius: 5px;
        padding: 1rem;
        cursor: pointer;
        transition: transform 0.2s ease;
        width: 7rem;
        i {
          font-size: 2rem;
        }
      }
      button:hover {
        transform: scale(1.05);
      }
      button:disabled {
        background-color: ${(props) => props.theme.lightDarkColor};
        color: ${(props) => props.theme.lightDarkColor};
      }
    }
  }
`;
