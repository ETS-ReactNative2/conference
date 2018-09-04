import {
  CLEAR,
  LOAD_DEFAULT_PROFILES,
  LOAD_DEFAULT_PROFILES_ERROR,
  LOAD_DEFAULT_PROFILES_SUCCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_ERROR,
  LOAD_PROFILES_SUCCESS,
  PROPAGATE_USER_DEFAULTS,
  PROPAGATE_USER_SEARCH,
} from './action-types'

const initialState = {
  isLoading: false,
  error: false,
  professionals: [],
  projects: [],
  investors: [],
  jobs: [],
  defaults: {
    professionals: [],
    projects: [],
    investors: [],
    isLoading: false
  }
}

export function searchReducer (state = initialState, action) {
  let id
  switch (action.type) {
    case LOAD_PROFILES:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case LOAD_PROFILES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        professionals: action.data.professionals ? action.data.professionals : state.professionals,
        projects: action.data.projects ? action.data.projects : state.projects,
        investors: action.data.investors ? action.data.investors : state.investors,
        jobs: action.data.jobs ? action.data.jobs : state.jobs
      }
    case LOAD_PROFILES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      }

    case LOAD_DEFAULT_PROFILES:
      return {
        ...state,
        defaults: {
          ...state.defaults,
          isLoading: true
        }
      }
    case LOAD_DEFAULT_PROFILES_SUCCESS:
      return {
        ...state,
        defaults: {
          ...state.defaults,
          isLoading: false,
          error: false,
          professionals: action.data.professionals ? action.data.professionals : state.professionals,
          projects: action.data.projects ? action.data.projects : state.projects,
          investors: action.data.investors ? action.data.investors : state.investors
        }
      }
    case LOAD_DEFAULT_PROFILES_ERROR:
      return {
        ...state,
        defaults: {
          ...state.defaults,
          isLoading: false,
          error: true
        }
      }
    case PROPAGATE_USER_DEFAULTS:
      id = action.data.user
      return {
        ...state,
        defaults: {
          ...state.defaults,
          professionals: state.defaults.professionals.map(prof => {
            if (prof.user && prof.user.user === id) {
              return {
                ...prof,
                user: {
                  ...prof.user,
                  ...action.data
                }

              }
            }

            return prof
          }),
          investors: state.defaults.investors.map(investor => {
            if (investor.user && investor.user.user === id) {
              return {
                ...investor,
                user: {
                  ...investor.user,
                  ...action.data
                }
              }
            }

            return investor
          })
        }
      }
    case PROPAGATE_USER_SEARCH:
      id = action.data.user
      return {
        ...state,
        ...state,
        professionals: state.professionals && state.professionals.map(prof => {
          if (prof.user && prof.user.user === id) {
            return {
              ...prof,
              user: {
                ...prof.user,
                ...action.data
              }
            }
          }

          return prof
        }),
        investors: state.investors && state.investors.map(investor => {
          if (investor.user && investor.user.user === id) {
            return {
              ...investor,
              user: {
                ...investor.user,
                ...action.data
              }
            }
          }

          return investor
        })
      }
    case CLEAR:
      return initialState
    default:
      return state
  }
}
