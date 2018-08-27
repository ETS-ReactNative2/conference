import { CLEAR, LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_ERROR, LOAD_NOTIFICATIONS_SUCCESS } from './action-types'

const initialState = {
  isLoading: false,
  error: false,
  list: [],
}

export function notificationsReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case LOAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.data.notifications,
      }
    case LOAD_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      }
    case CLEAR: {
      return initialState
    }
    default:
      return state
  }
}
