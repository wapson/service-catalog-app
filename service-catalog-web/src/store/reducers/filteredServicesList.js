import { produce } from "immer";

export const initialState = [];

const filteredServicesList = produce((draftState, action) => {
  switch (action.type) {
    case "FILTERED_LIST_SERVICES_SUCCESS":
      if (action.servicesList === null) {
        return draftState;
      }
      if (action.isNextPage) {
        return draftState.concat(action.servicesList);
      }
      return (draftState = action.servicesList);
    case "CLEAR_FILTERED_LIST":
      return initialState;
    case "DELETE_SERVICE_SUCCESS":
      const indexOfElement = draftState.findIndex(
        (element) => element.id === action.id
      );
      draftState.splice(indexOfElement, 1);
      break;
    case "UPDATE_SERVICE_SUCCESS":
      const findIndex = draftState.findIndex(
        (element) => element.id === action.updatedService.id
      );
      const data = Object.keys(action.updatedService).reduce(
        (c, k) => ((c[k.toLowerCase().trim()] = action.updatedService[k]), c),
        {}
      );
      if (draftState.length === 0) return initialState;
      if (draftState.length === 1) return [data];

      return draftState.splice(findIndex, 1, data);
    default:
      return draftState;
  }
}, initialState);

export default filteredServicesList;
