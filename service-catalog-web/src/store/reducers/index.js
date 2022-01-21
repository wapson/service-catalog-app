import { combineReducers } from "redux";
import auth from "./auth";
import snackbar from "./snackbar";
import servicesList from "./servicesList";
import filteredServicesList from "./filteredServicesList";
import loadingReducer from "redux-loading-middleware/loadingReducer";

export default combineReducers({
  auth,
  snackbar,
  servicesList,
  loadingReducer,
  filteredServicesList,
});
