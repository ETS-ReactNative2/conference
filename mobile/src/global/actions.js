import * as api from '../api/api'
import { HIDE_MESSAGE, SEND_MESSAGE_ERROR, SET_LOADING, SHOW_MESSAGE, UNSET_LOADING } from './action-types'

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
      throw new Error('Error in send message')
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
