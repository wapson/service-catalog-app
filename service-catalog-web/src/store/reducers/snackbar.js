import { produce } from "immer";

export const initialState = {
  isSnackbarShown: false,
  isError: false,
  message: "",
};

const snackbar = produce((draftState, action) => {
  switch (action.type) {
    case "SHOW_SNACKBAR":
      const { isError, message } = action.payload;
      draftState.isSnackbarShown = true;
      draftState.isError = isError;
      draftState.message = message;
      return;
    case "HIDE_SNACKBAR":
      draftState.isSnackbarShown = false;
      draftState.message = null;
      return;
    default:
      return draftState;
  }
}, initialState);

export default snackbar;
