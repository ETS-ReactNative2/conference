import { LOAD_NOTIFICATIONS, LOAD_NOTIFICATIONS_ERROR, LOAD_NOTIFICATIONS_SUCCESS } from './action-types'

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
      console.error(err)
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
      console.error(err)
    }
  }
}

export function fetchNotifications () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_NOTIFICATIONS })
      const response = {
        data: [
          {
            id: 1,
            title: 'New olaboga',
            content: 'Datata lorem ipsum lorem ipsum',
            time: new Date(),
            isRead: false
          },
          {
            id: 2,
            title: 'New olaboga',
            content: 'Datata lorem ipsum lorem ipsum',
            time: new Date(),
            isRead: false
          }
        ]
      }
      dispatch({
        type: LOAD_NOTIFICATIONS_SUCCESS,
        data: {
          notifications: response.data
        }
      })
    } catch (err) {
      dispatch({ type: LOAD_NOTIFICATIONS_ERROR })
      console.error(err)
    }
  }
}
