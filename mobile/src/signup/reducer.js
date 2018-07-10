import {
  SAVE_PROFILE_BASIC_INFO
} from './action-types'

const initialState = {
    profileName: '',
    profileTitle: '',
    profileCompany: '',
    profileTwitterLink: '',
    profileFacebookLink: '',
};

export function signUpReducer (state = initialState, action) {
  switch (action.type) {
    case SAVE_PROFILE_BASIC_INFO:
      return {...state, ...action.profileInfo}
    default:
      return state
  }
}