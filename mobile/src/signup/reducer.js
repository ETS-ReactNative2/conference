import { fromCca2ToCountryObject } from '../common/countryParser'
import { PREFILL_EDIT, PREFILL_EDIT_JOB } from '../profile/action-types'
import {
  CLEAR,
  CLEAR_LOGIN_USER_ERROR,
  CLEAR_SIGN_UP_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INFO,
  SAVE_PROFILE_INVESTEE,
  SIGN_UP_USER_ERROR
} from './action-types'

const initialState = {
  auth: {
    login: {
      isError: false,
      errorMessage: ''
    },
    signup: {
      isError: false,
      errorMessage: ''
    }
  },
  profile: {
    firstName: '',
    lastName: '',
    company: '',
    telegram: '',
    linkedin: '',
    imageUrl: '',
    type: ''
  },
  investor: {
    productStages: [],
    giveaways: [],
    nationality: fromCca2ToCountryObject('KR'),
    investments: [],
    ticketSizes: [],
    stages: [],
    marketLocation: -1,
    regionOtherText: ''
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
    giveaway: -1,
    imageUrl: ''
  },
  employer: {
    role: -1,
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
  },
  employee: {
    role: -1,
    roleOtherText: '',
    skills: '',
    traits: '',
    mostInfo: '',
    lookingForJob: false,
    relocate: false,
    remote: false,
    country: '',
    city: '',
    age: '',
    experience: ''
  },
  isEditing: false
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
            isError: true,
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
            isError: false,
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
            isError: false,
            errorMessage: ''
          }
        }
      }
    case PREFILL_EDIT_JOB:
      return {
        ...state,
        isEditing: action.data.prefill,
        profile: {
          ...state.profile,
          type: action.data.role
        },
        employer:
          action.data.prefill ? {
              ...state.employer,
              ...fillData('employer', action.data.info),
              edit: action.data.prefill
            }
            : initialState.employer,
      }
    case PREFILL_EDIT:
      return {
        ...state,
        isEditing: action.data.prefill,
        profile: {
          ...state.profile,
          type: action.data.role
        },
        [ action.data.role ]:
          action.data.prefill ? {
              ...state[ action.data.role ],
              ...fillData(action.data.role, action.data.info)
            }
            : initialState[ action.data.role ],
        employer: action.data.role === 'investee'
          ? (action.data.prefill ? {
            ...state[ 'employer' ], ...fillData('employer',
              action.data.info)
          } : initialState[ 'employer' ])
          : state.employer
      }
    case CLEAR:
      return initialState

    default:
      return state
  }
}

function fillData (role, info) {
  switch (role) {
    case 'investee':
      return {
        projectName: info.name,
        projectTagline: info.tagline,
        projectDescription: info.description,
        website: info.website,
        whitepaper: info.whitepaper,
        telegram: info.telegram,
        twitter: info.twitter,
        github: info.github,
        news: info.news,
        productStage: info.productStage,
        fundingStage: info.fundingStage,
        hiring: info.jobListings && info.jobListings.length > 0,
        teamMembers: info.notable,
        teamSize: String(info.size),
        money: String(info.fundraisingAmount),
        amount: String(info.fundraisingAmount),
        tokenType: info.tokenType,
        investorNationality: info.region ? info.region : 1,
        regionOtherText: info.regionOtherText,
        giveaway: info.giveaway,
        imageUrl: info.imageUrl
      }
    case 'investor':
      return {
        productStages: info.productStages,
        giveaways: info.giveaways,
        nationality: fromCca2ToCountryObject(info.nationality || 'KR'),
        investments: info.tokenTypes,
        ticketSizes: info.ticketSizes,
        stages: info.fundingStages,
        marketLocation: info.region,
        regionOtherText: info.regionOtherText
      }
    case 'employee':
      return {
        role: info.role,
        roleOtherText: info.roleOtherText,
        skills: info.skillsText,
        traits: info.traitsText,
        mostInfo: info.knowMost,
        lookingForJob: true,
        relocate: info.relocate,
        remote: info.localRemoteOptions.findIndex(lro => lro === 2) !== -1,
        country: fromCca2ToCountryObject(info.country || 'KR'),
        city: info.city,
        age: info.age ? String(info.age) : '',
        experience: info.age ? String(info.experience) : ''
      }
    case 'employer':
      return {
        keywords: info.skillsText,
        link: info.link,
        description: info.description,
        partTime: info.partTime,
        payments: info.payments,
        location: info.localRemoteOptions,
        country: fromCca2ToCountryObject(info.country || 'KR'),
        city: info.city,
        role: info.role,
        id: info.id
      }
  }
}
