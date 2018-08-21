import { ROLES } from '../enums'
import {
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INVESTEE,
  SAVE_PROFILE_INFO,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGN_UP_USER_ERROR,
  CLEAR_SIGN_UP_USER_ERROR,
  CLEAR_LOGIN_USER_ERROR,
  SAVE_PROFILE_ERROR,
  CLEAR_SAVE_PROFILE_ERROR } from './action-types'

const initialState = {
  auth: {
    login: {
      isServerError: false,
      isCredentialsError: false,
      errorMessage: ''
    },
    signup: {
      isServerError: false,
      isEmailFieldError: false,
      errorMessage: ''
    },
    profile: {
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
    nationality: '',
    investments: [],
    ticketSizes: [],
    stages: [],
    marketLocation: -1,
    regionOtherText: '',
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
    teamSize: String(0),
    money: false,
    amount: '',
    tokenType: -1,
    investorNationality: 0,
    regionOtherText: '',
    legal: '',
    main: '',
    giveaway: -1,
    industry: -1,
  },
  employer: {
    roles: []
  },
  employee: {
    role: -1,
    skills: '',
    traits: '',
    mostInfo: '',
    lookingForJob: false,
    relocate: false,
    remote: false,
    country: '',
    city: ''
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
            isServerError: action.isServerError,
            isCredentialsError: action.isCredentialsError,
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
            keywords: '',
            link: '',
            description: '',
            partTime: false,
            payments: [],
            location: [],
            country: {
              cca2: 'US',
              countryName: 'United States of America',
              callingCode: '1'
            },
            city: ''
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
    case SIGN_UP_USER_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          signup: {
            ...state.signup,
            isServerError: action.isServerError,
            isEmailFieldError: action.isEmailFieldError,
            errorMessage: action.error
          }
        }
      }
    case CLEAR_SIGN_UP_USER_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          signup: {
            ...state.auth.signup,
            isServerError: false,
            isEmailFieldError: false,
            errorMessage: ''
          }
        }
      }
    case CLEAR_LOGIN_USER_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          login: {
            ...state.auth.login,
            isServerError: false,
            isCredentialsError: false,
            errorMessage: ''
          }
        }
      }
    case SAVE_PROFILE_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          profile: {
            ...state.auth.profile,
            isError: true,
            errorMessage: action.error
          }
        }
      }
    case CLEAR_SAVE_PROFILE_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          profile: {
            ...state.auth.profile,
            isError: false,
            errorMessage: ''
          }
        }
      }
    default:
      return state
  }
}
