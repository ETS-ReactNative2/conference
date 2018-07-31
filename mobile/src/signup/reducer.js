import {
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INFO,
  SAVE_PROFILE_INVESTEE
} from './action-types'

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    twitter: '',
    facebook: '',
    telegram: '',
    linkedin: '',
    type: ''
  },
  investor: {
    companyLocation: '',
    nationality: '',
    investments: [],
    ticketSize: {
      id: -1,
      min: '',
      max: ''
    },
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
    hiring: false,
    teamMembers: '',
    money: false,
    amount: ''
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
    skills: [],
    traits: [],
    mostInfo: ''
  }
}

export function signUpReducer (state = initialState, action) {
  console.log(action.profileInfo)
  switch (action.type) {
    case SAVE_PROFILE_INFO:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.profileInfo
        },
        investee: {
          ...state.investee,
          projectName: action.profileInfo.company ? action.profileInfo.company : state.investee.projectName
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
      return state
  }
}
