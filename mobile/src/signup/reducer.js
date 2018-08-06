import { ROLES } from '../enums'
import {
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INVESTEE,
  SAVE_PROFILE_INFO,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR } from './action-types'

const initialState = {
  auth: {
    login: {
      isError: false,
      errorMessage: ''
    }
  },
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
    productStages: [],
    giveaways: [],
    companyLocation: '',
    nationality: '',
    investments: [],
    ticketSizes: [],
    stages: [],
    marketLocation: -1,
    industries: []
  },
  investee: {
    projectName: '',
    projectTagline: '',
    projectDescription: '',
    website: '',
    whitepaper: '',
    telegram: '',
    twitter: '',
    github: '',
    news: '',
    productStage: -1,
    fundingStage: -1,
    hiring: false,
    teamMembers: '',
    money: false,
    amount: '',
    tokenType: -1,
    giveaway: [],
    investorNationality: 0
  },
  employer: {
    roles: []
  },
  employee: {
    role: '',
    skills: [],
    traits: [],
    mostInfo: ''
  }
}

export function signUpReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          login: {
            ...state.auth.login,
            isError: false,
            errorMessage: ''
          }
        }
      }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        auth: {
          ...state.auth,
          login: {
            ...state.auth.login,
            isError: true,
            errorMessage: action.error
          }
        }
      }
    }
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
          ...action.investorData
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
      if (action.employerInfo.roles) {
        const jobs = {}
        action.employerInfo.roles.forEach(role => {
          const jobName = ROLES.find(job => job.index === role).slug
          jobs[ jobName ] = state.employer[ jobName ] ? state.employer[ jobName ] : {
            keywords: [],
            link: '',
            description: '',
            partTime: false,
            payments: []
          }
        })

        return {
          ...state,
          employer: {
            ...jobs,
            ...state.employer,
            roles: action.employerInfo.roles
          }
        }
      }

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
