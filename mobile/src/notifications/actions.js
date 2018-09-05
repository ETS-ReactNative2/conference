import { LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_ERROR, LOAD_NOTIFICATIONS_SUCCESS } from './action-types'
import * as api from '../api/api'

export function readNotificationsAll () {
  return async (dispatch, getState) => {
    try {
      const { list } = getState().notifications
      dispatch({
        type: LOAD_NOTIFICATIONS_SUCCESS,
        data: {
          notifications: list.map((item) => {return { ...item, isRead: true }})
        }
      })
    } catch (err) {
    }
  }
}

export function readNotification (notification) {
  return async (dispatch, getState) => {
    try {
      const { list } = getState().notifications
      notification.isRead = true
      dispatch({
        type: LOAD_NOTIFICATIONS_SUCCESS,
        data: {
          notifications: list.map((item) => item.id !== notification.id ? item : notification)
        }
      })
    } catch (err) {
    }
  }
}

export function fetchNotifications () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_NOTIFICATIONS })
      const response = await api.fetchNotifications()
      dispatch({
        type: LOAD_NOTIFICATIONS_SUCCESS,
        data: {
          notifications: response.data
        }
      })
    } catch (err) {
      dispatch({ type: LOAD_NOTIFICATIONS_ERROR })
    }
  }
}
