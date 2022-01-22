import SessionStorage from "../../helpers/sessionStorage";

export const addService = (data) => async (dispatch, getState) => {
  let url = `<Insert endopoint url>/addService`;
  const { token } = getState().auth;
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error.message);
      }
      dispatch({
        type: "ADD_SERVICE_SUCCESS",
        singleService: responseData,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ADD_SERVICE_FAIL",
        error,
      });
    });
};

export const updateService = (data) => async (dispatch, getState) => {
  let url = `<Insert endopoint url>/updateService`;
  const { token } = getState().auth;
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error.message);
      }
      dispatch({
        type: "UPDATE_SERVICE_SUCCESS",
        updatedService: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "UPDATE_SERVICE_FAIL",
        error,
      });
    });
};

export const deleteService = (data) => async (dispatch, getState) => {
  let url = `<Insert endopoint url>/deleteService`;
  const { token } = getState().auth;
  fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error.message);
      }
      dispatch({
        type: "DELETE_SERVICE_SUCCESS",
        id: data.id,
      });
    })
    .catch((error) => {
      dispatch({
        type: "DELETE_SERVICE_FAIL",
        error,
      });
    });
};

export const listFilteredServices =
  ({ page = 1, name = "", isName, isNextPage }) =>
  async (dispatch) => {
    const nameUrl = `&name=${encodeURIComponent(name)}`;
    const labelUrl = `&label=${encodeURIComponent(name)}`;
    let url = `<Insert endopoint url>/listServices?page=${page}${
      isName ? nameUrl : labelUrl
    }`;
    if (!name.length) return dispatch(clearFilteredList());
    return fetch(url)
      .then((res) => res.json())
      .then((responseData) => {
        dispatch({
          type: "FILTERED_LIST_SERVICES_SUCCESS",
          servicesList: responseData,
          isNextPage,
        });
        return responseData;
      });
  };

export const listServices =
  ({ page = 1, name = "", isNextFilteredPage = false, label = "" }) =>
  async (dispatch) => {
    const nameUrl = `&name=${encodeURIComponent(name)}`;
    const labelUrl = `&label=${encodeURIComponent(label)}`;
    const isNameEntered = !!name.length;
    const isLabelEntered = !!label.length;
    let url = `<Insert endopoint url>/listServices?page=${page}${
      isNameEntered ? nameUrl : ""
    }${isLabelEntered ? labelUrl : ""}`;
    return fetch(url)
      .then((res) => res.json())
      .then((responseData) => {
        if (isNameEntered || isLabelEntered) {
          dispatch({
            type: "FILTERED_LIST_SERVICES_SUCCESS",
            servicesList: responseData,
            isNextFilteredPage,
          });
        } else
          dispatch({
            type: "LIST_SERVICES_SUCCESS",
            servicesList: responseData,
          });
        return responseData;
      });
  };

export const getService = (serviceName) => async (dispatch) => {
  let url = `<Insert endopoint url>/getService?name=${encodeURIComponent(
    serviceName
  )}`;
  return fetch(url)
    .then((res) => res.json())
    .then((responseData) => {
      if (responseData.error) {
        throw new Error(responseData.error.message);
      }
      return responseData;
    })
    .catch((error) => error);
};

export const addUser = (data) => async (dispatch) => {
  let url = `<Insert endopoint url>/addUser`;
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
      throw res;
    })
    .then((responseData) => {
      dispatch({
        type: "ADD_USER_SUCCESS",
        payload: JSON.parse(responseData),
      });
      dispatch(showSnackbar({ message: "User registered" }));
    })
    .catch((error) => {
      dispatch({
        type: "ADD_USER_FAIL",
      });
      dispatch(
        showSnackbar({ message: "User could not be registered", isError: true })
      );
    });
};

export const loginUser = (data) => async (dispatch) => {
  let url = `<Insert endopoint url>/loginUser`;
  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
      throw res;
    })
    .then((responseData) => {
      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: JSON.parse(responseData),
      });
      dispatch(showSnackbar({ message: "User logged in" }));
    })
    .catch((error) => {
      dispatch({
        type: "LOGIN_USER_FAIL",
      });
      dispatch(
        showSnackbar({ message: "User could not logged in", isError: true })
      );
    });
};

export const showSnackbar = ({ message, isError = false }) => ({
  type: "SHOW_SNACKBAR",
  payload: {
    message,
    isError,
  },
});
export const hideSnackbar = () => ({ type: "HIDE_SNACKBAR" });

export const loadDataFromLocalStorage = () => ({
  type: "LOAD_DATA_FROM_SESSION_STORAGE",
  payload: {
    token: new SessionStorage().getItem("token"),
    id: new SessionStorage().getItem("id"),
    isAdmin: new SessionStorage().getItem("isAdmin"),
    password: new SessionStorage().getItem("password"),
    username: new SessionStorage().getItem("username"),
  },
});

export const logoutUser = () => ({ type: "LOGOUT_USER" });

export const clearFilteredList = () => ({ type: "CLEAR_FILTERED_LIST" });

export const clearServiceList = () => ({ type: "CLEAR_SERVICE_LIST" });
