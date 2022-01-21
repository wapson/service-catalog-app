import { produce } from "immer";

export const initialState = [];

const filteredServicesList = produce((draftState, action) => {
  switch (action.type) {
    case "FILTERED_LIST_SERVICES_SUCCESS":
      if (action.isNextFilteredPage) {
        return draftState.concat(action.servicesList);
      }
      return (draftState = action.servicesList);
    case "CLEAR_FILTERED_LIST":
      return initialState;
    default:
      return draftState;
  }
}, initialState);

export default filteredServicesList;
