import * as api from '../api/api'
import { HIDE_MESSAGE, SET_LOADING, SHOW_MESSAGE, UNSET_LOADING, SEND_MESSAGE_ERROR } from './action-types'

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
      return
    } catch (err) {
      dispatch({type: SEND_MESSAGE_ERROR})
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
