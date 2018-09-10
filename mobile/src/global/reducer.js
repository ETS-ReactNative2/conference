import { HIDE_MESSAGE, SET_LOADING, SHOW_MESSAGE, UNSET_LOADING, SEND_MESSAGE_ERROR, SHOW_ALERT, HIDE_ALERT } from './action-types'
import I18n from '../../locales/i18n'

const initialState = {
  isLoading: false,
  loadingMessage: I18n.t('common.status.loading'),
  showMessage: false,
  investor: null,
  sendMessageError: false,
  showAlert: false,
  alertType: 'success',
  alertMessage: ''
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
        showMessageError: action.data.status
      }
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.alertType,
        alertMessage: action.message
      }
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: 'success',
        alertMessage: ''
      }
    default:
      return state
  }
}
