import axios from 'axios'
import qs from 'qs'

import {
  SIGN_IN_LOCAL_SUCCESS,
  SIGN_IN_LOCAL_ERROR,
} from './action-types'

export function signInLocalSuccess(result) {
  return {
    type: SIGN_IN_LOCAL_SUCCESS,
    payload: result.data,
  }
}

export function signInLocalError(error) {
  return {
    type: SIGN_IN_LOCAL_ERROR,
    payload: error,
  }
}

export function signInLocal(signInParams) {
  return dispatch => {
    axios.post( '/user/login/', qs.stringify(signInParams))
      .then(result => { dispatch(signInLocalSuccess(result.data, dispatch)) })
      .catch(error => {
        const err = (error.response) ? error.response.data : error
        dispatch(signInLocalError(err))
      })
  }
}
