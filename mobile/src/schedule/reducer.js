import { LOAD_SCHEDULE, LOAD_SCHEDULE_ERROR, LOAD_SCHEDULE_SUCCESS } from './action-types'

const initialState = {
  isLoading: false,
  isError: false,
  schedule: []
}

export function scheduleReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_SCHEDULE:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case LOAD_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        schedule: action.schedule || state.schedule
      }
    case LOAD_SCHEDULE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      return state;
  }
}
