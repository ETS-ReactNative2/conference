import {
  CLEAR,
  DEACTIVATE_INVESTOR,
  DEACTIVATE_PROFILE,
  LEAVE_PROJECT,
  LOAD_PROFILES,
  LOAD_PROFILES_ERROR,
  LOAD_PROFILES_SUCCESS,
  REACTIVATE_INVESTOR,
  REACTIVATE_PROFILE,
  UPDATE_BASIC,
  LOAD_PROJECT_MEMBERS,
  LOAD_PROJECT_MEMBERS_SUCCESS,
  LOAD_PROJECT_MEMBERS_ERROR,
  PROPAGATE_USER_PROFILE,
  PROPAGATE_INVESTOR_PROFILE,
  PROPAGATE_PROFESSIONAL_PROFILE,
  PROPAGATE_PROJECT_PROFILE
} from './action-types'

const initialState = {
  isLoading: false,
  error: false,
  professional: null,
  project: null,
  investor: null,
  basic: null,
  projectMembers: {
    members: [],
    memberRequests: [],
    loading: false,
    error: false
  }
}

export function profileReducer (state = initialState, action) {
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
        professional: action.data.professional ? action.data.professional : state.professional,
        project: action.data.project ? action.data.project : state.project,
        investor: action.data.investor ? action.data.investor : state.investor,
        basic: action.data.basic ? action.data.basic : state.basic
      }
    case LOAD_PROFILES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      }
    case LEAVE_PROJECT:
      return {
        ...state,
        project: null
      }
    case REACTIVATE_PROFILE:
      return {
        ...state,
        professional: {
          ...state.professional,
          isActive: true
        }
      }
    case DEACTIVATE_PROFILE:
      return {
        ...state,
        professional: {
          ...state.professional,
          isActive: false
        }
      }
    case REACTIVATE_INVESTOR:
      return {
        ...state,
        investor: {
          ...state.investor,
          isActive: true
        }
      }
    case DEACTIVATE_INVESTOR:
      return {
        ...state,
        investor: {
          ...state.investor,
          isActive: false
        }
      }
    case UPDATE_BASIC:
      return {
        ...state,
        basic: {
          ...state.basic,
          ...action.data
        },
        project: state.project ? {
          ...state.project,
          user: {
            ...state.project.user,
            ...action.data
          }
        } : null,
        investor: state.investor ? {
          ...state.investor,
          user: {
            ...state.investor.user,
            ...action.data
          }
        } : null,
        professional: state.professional ? {
          ...state.professional,
          user: {
            ...state.professional.user,
            ...action.data
          }
        } : null
      }
    case LOAD_PROJECT_MEMBERS:
      return {
        ...state,
        projectMembers: {
          members: state.projectMembers.members,
          memberRequests: state.projectMembers.memberRequests,
          loading: true,
          error: false
        }
      }
    case LOAD_PROJECT_MEMBERS_SUCCESS:
      return {
        ...state,
        projectMembers: {
          members: action.data.members,
          memberRequests: action.data.memberRequests,
          loading: false,
          error: false
        }
      }
    case LOAD_PROJECT_MEMBERS_ERROR:
      return {
        ...state,
        projectMembers: {
          members: state.projectMembers.members,
          memberRequests: state.projectMembers.memberRequests,
          loading: false,
          error: true
        }
      }
    case PROPAGATE_INVESTOR_PROFILE:
      return {
        ...state,
        investor: {
          ...state.investor,
          ...action.data
        }
      }
    case PROPAGATE_PROFESSIONAL_PROFILE:
      return {
        ...state,
        professional: {
          ...state.professional,
          ...action.data
        }
      }
    case PROPAGATE_PROJECT_PROFILE:
      return {
        ...state,
        project: {
          ...state.project,
          ...action.data
        }
      }
    case PROPAGATE_USER_PROFILE:
      const id = action.data.user
      return {
        ...state,
        professional: state.professional && state.professional.user.user === id
          ? { ...state.professional, user: { ...state.professional.user, ...action.data }}
          : state.professional,
        investor: state.investor && state.investor.user.user === id
          ? { ...state.investor, user: { ...state.investor.user, ...action.data }}
          : state.investor
      }
    case CLEAR:
      return initialState
    default:
      return state
  }
}
