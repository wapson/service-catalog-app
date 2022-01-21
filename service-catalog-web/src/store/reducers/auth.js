import { produce } from "immer";

import SessionStorage from "../../helpers/sessionStorage";

export const initialState = {
  token: null,
  id: null,
  isAdmin: false,
  password: null,
  username: null,
};

const auth = produce((draftState, action) => {
  switch (action.type) {
    case "ADD_USER_SUCCESS":
    case "LOGIN_USER_SUCCESS":
      const { token, user } = action.payload;
      const { id, isAdmin, password, username } = user;
      new SessionStorage()
        .clearStorage()
        .setItem("token", token)
        .setItem("id", id)
        .setItem("isAdmin", isAdmin)
        .setItem("password", password)
        .setItem("username", username);
      draftState.token = token;
      draftState.id = id;
      draftState.isAdmin = isAdmin;
      draftState.password = password;
      draftState.username = username;
      return;
    case "LOAD_DATA_FROM_SESSION_STORAGE":
      draftState.token = action.payload.token;
      draftState.id = action.payload.id;
      draftState.isAdmin = action.payload.isAdmin;
      draftState.password = action.payload.password;
      draftState.username = action.payload.username;
      return;
    case "LOGOUT_USER":
      new SessionStorage().clearStorage();
      return initialState;
    default:
      return draftState;
  }
}, initialState);

export default auth;
