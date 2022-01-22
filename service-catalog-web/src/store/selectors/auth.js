import { createSelector } from "reselect";

export const authSelector = (state) => state.auth;

export const isAuthenticatedSelector = createSelector(
  authSelector,
  (auth) => !!auth.token
);
