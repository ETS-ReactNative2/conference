import { LOAD_PROFILES_SUCCESS, LOAD_PROFILES, LOAD_PROFILES_ERROR } from './action-types'

const initialState = {
  isLoading: false,
  error: false,
  projects: [],
  investors: []
}

export function searchReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILES:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case LOAD_PROFILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        projects: action.data.projects ? action.data.projects : state.projects,
        investors: action.data.investors ? action.data.investors : state.investors
      }
    case LOAD_PROFILES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      }
    default:
      return state;
  }
}
