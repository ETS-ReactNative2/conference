import * as api from '../api/api'
import { getErrorDataFromNetworkException } from '../common/utils'
import {
  HIDE_MESSAGE,
  SEND_MESSAGE_ERROR,
  SET_LOADING,
  SHOW_MESSAGE,
  UNSET_LOADING,
  SHOW_ALERT,
  HIDE_ALERT, SEND_CONTACT_MESSAGE_ERROR, SHOW_CONTACT_MESSAGE, HIDE_CONTACT_MESSAGE
} from './action-types'

export function setGlobalLoading (message) {
  return {
    type: SET_LOADING,
    data: { message }
  }
}

export function unsetGlobalLoading () {
  return {
    type: UNSET_LOADING
  }
}

export function sendMessage (msg) {
  return async (dispatch, getState) => {
    const investor = getState().global.investor || { id: 0 }
    try {
      await api.sendMessage({ investorId: investor.id, message: msg })
      dispatch(hideMessage())
    } catch (err) {
      dispatch({
        type: SEND_MESSAGE_ERROR,
        data: getErrorDataFromNetworkException(err)
      })
      throw new Error(getErrorDataFromNetworkException(err).errorMessage)
    }
  }
}

export function showMessage (investor) {
  return {
    type: SHOW_MESSAGE,
    data: {
      investor: investor
    }
  }
}

export function hideMessage () {
  return {
    type: HIDE_MESSAGE
  }
}

export function sendContactMessage (msg) {
  return async (dispatch) => {
    try {
      await api.sendContact({ message: msg })
      dispatch(hideContactMessage())
    } catch (err) {
      dispatch({
        type: SEND_CONTACT_MESSAGE_ERROR,
        data: getErrorDataFromNetworkException(err)
      })
      throw new Error(getErrorDataFromNetworkException(err).errorMessage)
    }
  }
}

export function showContactMessage () {
  return {
    type: SHOW_CONTACT_MESSAGE
  }
}

export function hideContactMessage () {
  return {
    type: HIDE_CONTACT_MESSAGE
  }
}

export function showAlertError (message) {
  return {
    type: SHOW_ALERT,
    message,
    alertType: 'error'
  }
}

export function hideAlert () {
  return {
    type: HIDE_ALERT
  }
}
