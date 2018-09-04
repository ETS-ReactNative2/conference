import { fromCca2ToCountryObject } from '../common/countryParser'
import { ROLES } from '../enums'
import { PREFILL_EDIT } from '../profile/action-types'
import {
  CLEAR,
  CLEAR_LOGIN_USER_ERROR,
  CLEAR_SAVE_PROFILE_ERROR,
  CLEAR_SIGN_UP_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_ERROR,
  SAVE_PROFILE_INFO,
  SAVE_PROFILE_INVESTEE,
  SIGN_UP_USER_ERROR
} from './action-types'

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
    legal: fromCca2ToCountryObject('KR'),
    main: fromCca2ToCountryObject('KR'),
    giveaway: -1,
    imageUrl: ''
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
    city: '',
    age: '',
    experience: ''
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
    case PREFILL_EDIT:
      return {
        ...state,
        profile: {
          ...state.profile,
          type: action.data.role
        },
        [ action.data.role ]:
          action.data.prefill ? {
              ...state[ action.data.role ],
              ...fillData(action.data.role, action.data.info)
            }
            : initialState[action.data.role]
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
        legal: fromCca2ToCountryObject(info.legalCountry || 'KR'),
        main: fromCca2ToCountryObject(info.mainCountry || 'KR'),
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
  }
}
