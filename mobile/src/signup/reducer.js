import {
  SAVE_PROFILE_INFO
} from './action-types'

const initialState = {
  profile: {
    name: '',
    title: '',
    company: '',
    twitter: '',
    facebook: '',
    type: ''
  }
};

export function signUpReducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_PROFILE_INFO:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.profileInfo
        }
      }
    default:
      return state
  }
}