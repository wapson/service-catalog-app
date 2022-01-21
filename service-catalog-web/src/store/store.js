import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import loadingMiddleware from "redux-loading-middleware";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(loadingMiddleware, thunk))
    : applyMiddleware(loadingMiddleware, thunk)
);

export default store;
