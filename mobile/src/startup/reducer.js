import { APP_LOADED } from "./action-types";

const initialState = {
  loaded: false
};

export function startUpReducer(state = initialState, action) {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        loaded: true
      };
    default:
      return state;
  }
}
