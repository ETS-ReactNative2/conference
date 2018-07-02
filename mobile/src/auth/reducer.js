import { Record } from 'immutable'
import {
  SIGN_IN_LOCAL_SUCCESS,
  SIGN_IN_LOCAL_ERROR
} from './action-types'

export const AuthState = new Record({
  authenticated: null,
  signInLastResult: null
})

export function authReducer (state = new AuthState(), { payload, type }) {
  switch (type) {
    case SIGN_IN_LOCAL_SUCCESS:
      return state.merge({
        authenticated: !!payload,
      })

    case SIGN_IN_LOCAL_ERROR:
      return state.merge({ signInLastResult: payload })

    default:
      return state
  }
}
