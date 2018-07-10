import {
  SAVE_PROFILE_INFO,
  SAVE_INVESTOR
} from './action-types'

const initialState = {
  profile: {
    name: '',
    title: '',
    company: '',
    twitter: '',
    facebook: '',
    type: ''
  },
  investor: {
    companyLocation: '',
    nationality: '',
    investments: [],
    ticketSize: '',
    stages: [],
    marketLocations: []
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
    case SAVE_INVESTOR:
      return {
        ...state,
        investor: {
          ...state.investor,
          ...action.data
        }
      }
    default:
      return state
  }
}