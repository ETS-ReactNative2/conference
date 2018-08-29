import { HIDE_MESSAGE, SET_LOADING, SHOW_MESSAGE, UNSET_LOADING, SEND_MESSAGE_ERROR } from './action-types'

const initialState = {
  isLoading: false,
  loadingMessage: 'Loading...',
  showMessage: false,
  investor: null,
  sendMessageError: false
}

export function globalReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.data.message
      }
    case UNSET_LOADING:
      return {
        ...state,
        isLoading: false,
        message: ''
      }
    case SHOW_MESSAGE:
      return {
        ...state,
        showMessage: true,
        investor: action.data.investor,
        showMessageError: false
      }
    case HIDE_MESSAGE:
      return {
        ...state,
        showMessage: false,
        investor: null,
        showMessageError: false
      }
    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        showMessageError: true
      }
    default:
      return state
  }
}
