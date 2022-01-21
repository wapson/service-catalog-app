import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store/store";

const GlobalStyle = createGlobalStyle`
html {
  font-size: 10px;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  overflow-y: hidden;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.modal-overlay {
  align-items: center;
  background-color: rgba(255, 255, 255, .25);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 998;
}
.modal{
  top: 50%;
  left: 50%;
  padding: 2rem;
  width: min-content;
  min-width:400px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.lightDarkColor};
  border-radius: 10px;
  outline: none;
  max-height: calc(100vh - 200px);
}
`;

const theme = {
  lightDarkColor: "#22333B",
  darkColor: "#0A0908",
  whiteColor: "#F2F4F3",
  greyColor: "#A9927D",
  lightGreyColor: "#5E503F",
};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
          <GlobalStyle />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
