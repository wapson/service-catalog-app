import { produce } from "immer";

export const initialState = [];

const servicesList = produce((draftState, action) => {
  switch (action.type) {
    case "LIST_SERVICES_SUCCESS":
      return draftState.concat(action.servicesList);
    case "ADD_SERVICE_SUCCESS":
      draftState.unshift(action.singleService);
      break;
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
      draftState.splice(findIndex, 1, data);
      break;
    default:
      return draftState;
  }
}, initialState);

export default servicesList;
