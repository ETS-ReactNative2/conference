import { SAVE_PROFILE_INFO,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INVESTEE,
  SAVE_EMPLOYEE } from './action-types'

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
  },
  investee: {
    projectName: '',
    projectTagline: '',
    projectDescription: '',
    website: '',
    whitepaper: '',
    telegram: '',
    twitter: '',
    productStage: -1,
    fundingStage: -1,
    teamMembers: '',
    money: false,
    amount: '',
    ico: false,
    icoWhen: ''
  },
  employer: {
    role: -1,
    keywords: [],
    link: '',
    description: '',
    min: '0',
    max: '0'
  },
  employee: {
    role: '',
    keywords: []
  }
}

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
    case SAVE_PROFILE_INVESTEE:
      return {
        ...state,
        investee: {
          ...state.investee,
          ...action.investeeInfo
        }
      }
    case SAVE_PROFILE_EMPLOYER:
      return {
        ...state,
        employer: {
          ...state.employer,
          ...action.employerInfo
        }
      }
    case SAVE_EMPLOYEE:
      return {
        ...state,
        employee: {
          ...state.employee,
          ...action.employeeData
        }
      }
    default:
      return state;
  }
}
