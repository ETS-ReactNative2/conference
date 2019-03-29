import { DEACTIVATE_INVESTOR, DEACTIVATE_PROFILE } from '../profile/action-types'
import {
  CLEAR,
  LOAD_DEFAULT_PROFILES,
  LOAD_DEFAULT_PROFILES_ERROR,
  LOAD_DEFAULT_PROFILES_SUCCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_ERROR,
  LOAD_PROFILES_SUCCESS,
  PROPAGATE_INVESTOR_DEFAULTS,
  PROPAGATE_INVESTOR_SEARCH,
  PROPAGATE_PROFESSIONAL_DEFAULTS,
  PROPAGATE_PROFESSIONAL_SEARCH,
  PROPAGATE_PROJECT_DEFAULTS,
  PROPAGATE_PROJECT_SEARCH,
  PROPAGATE_USER_DEFAULTS,
  PROPAGATE_USER_SEARCH,
  SEARCH_RESULTS_QUERY_START,
  SEARCH_RESULTS_QUERY_END
} from './action-types'

const initialState = {
  isLoadingSearchQuery: false,
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
    case PROPAGATE_PROFESSIONAL_SEARCH:
      id = action.data.user.user
      return {
        ...state,
        professionals: state.professionals && state.professionals.map(prof => {
          if (prof.user && prof.user.user === id) {
            return {
              ...prof,
              ...action.data,
            }
          }

          return prof
        }),
      }
    case PROPAGATE_INVESTOR_DEFAULTS:
      id = action.data.user.user
      return {
        ...state,
        defaults: {
          ...state.defaults,
          investors: state.defaults.investors && state.defaults.investors.map(prof => {
            if (prof.user && prof.user.user === id) {
              return {
                ...prof,
                ...action.data,
              }
            }

            return prof
          }),
        }
      }
    case PROPAGATE_INVESTOR_SEARCH:
      id = action.data.user.user
      return {
        ...state,
        investors: state.investors && state.investors.map(prof => {
          if (prof.user && prof.user.user === id) {
            return {
              ...prof,
              ...action.data,
            }
          }

          return prof
        }),
      }
    case PROPAGATE_PROFESSIONAL_DEFAULTS:
      id = action.data.user.user
      return {
        ...state,
        defaults: {
          ...state.defaults,
          professionals: state.defaults.professionals && state.defaults.professionals.map(prof => {
            if (prof.user && prof.user.user === id) {
              return {
                ...prof,
                ...action.data,
              }
            }

            return prof
          }),
        }
      }
    case PROPAGATE_PROJECT_SEARCH:
      id = action.data.id
      return {
        ...state,
        projects: state.projects && state.projects.map(prof => {
          if (prof.id === id) {
            return {
              ...prof,
              ...action.data,
            }
          }

          return prof
        }),
      }
    case PROPAGATE_PROJECT_DEFAULTS:
      id = action.data.id
      return {
        ...state,
        defaults: {
          ...state.defaults,
          projects: state.defaults.projects && state.defaults.projects.map(prof => {
            if (prof.id === id) {
              return {
                ...prof,
                ...action.data,
              }
            }

            return prof
          }),
        }
      }
    case DEACTIVATE_INVESTOR:
      id = action.data
      return {
        ...state,
        investors: state.investors && state.investors.map(prof => {
          if (prof.user.user === id) {
            return {
              ...prof,
              hide: true
            }
          }
          return prof
        }),
        defaults: {
          ...state.defaults,
          investors: state.defaults.investors && state.defaults.investors.map(prof => {
            if (prof.user.user === id) {
              return {
                ...prof,
                hide: true
              }
            }
            return prof
          }),
        }
      }
    case DEACTIVATE_PROFILE:
      id = action.data
      return {
        ...state,
        professionals: state.professionals && state.professionals.map(prof => {
          if (prof.user.user === id) {
            return {
              ...prof,
              hide: true
            }
          }
          return prof
        }),
        defaults: {
          ...state.defaults,
          professionals: state.defaults.professionals && state.defaults.professionals.map(prof => {
            if (prof.user.user === id) {
              return {
                ...prof,
                hide: true
              }
            }
            return prof
          }),
        }
      }
    case SEARCH_RESULTS_QUERY_START:
      return {
        ...state,
        isLoadingSearchQuery: true
      }
    case SEARCH_RESULTS_QUERY_END:
      return {
        ...state,
        isLoadingSearchQuery: false
      }
    case CLEAR:
      return initialState
    default:
      return state
  }
}
