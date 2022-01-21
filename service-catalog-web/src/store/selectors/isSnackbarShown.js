import { createSelector } from "reselect";

export const snackbarSelector = (state) => state.snackbar;

export const isSnackbarShownSelector = createSelector(
  snackbarSelector,
  (snackbar) => snackbar.isSnackbarShown
);
