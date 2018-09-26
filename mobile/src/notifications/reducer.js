import { CLEAR, LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_ERROR, LOAD_NOTIFICATIONS_SUCCESS } from './action-types'

const initialState = {
  isLoading: false,
  list: [],
}

export function notificationsReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.data.notifications
      }
    case LOAD_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isLoading: false
      }
    case CLEAR: {
      return initialState
    }
    default:
      return state
  }
}
