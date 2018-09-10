import * as api from '../api/api'
import I18n from '../../locales/i18n'
import { HIDE_MESSAGE, SEND_MESSAGE_ERROR, SET_LOADING, SHOW_MESSAGE, UNSET_LOADING, SHOW_ALERT, HIDE_ALERT } from './action-types'

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
      const { status } = err.response
      dispatch({
        type: SEND_MESSAGE_ERROR,
        data: {
          status
        }
      })
      throw new Error(I18n.t('message_page.send_message_error'))
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
