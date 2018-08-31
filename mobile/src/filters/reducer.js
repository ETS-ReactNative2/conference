import * as _ from 'lodash'
import {
  CLEAR,
  SET_INVESTOR_FILTERS,
  SET_JOB_FILTERS,
  LOAD_MATCH_FILTERS,
  LOAD_MATCH_FILTERS_SUCCESS,
  LOAD_MATCH_FILTERS_ERROR
} from './action-types'
import { SET_PROJECT_FILTERS } from './action-types'

const initialState = {
  investor: {
    fundingStage: [],
    giveaway: [],
    productStage: [],
    tokenType: [],
    region: [],
    ticketSize: [],
    industry: []
  },
  project: {
    fundingStage: [],
    giveaway: [],
    productStage: [],
    tokenType: [],
    region: [],
  },
  professional: {
    role: []
  },
  job: {
    role: []
  },
  updated: false,
  isLoading: false,
  error: false
}

export function filterReducer (state = initialState, action) {
  switch (action.type) {
    case SET_INVESTOR_FILTERS:
      return {
        ...state,
        updated: true,
        investor: {
          ...state.investor,
          [action.data.filterType]: action.data.values,
        }
      };
    case SET_PROJECT_FILTERS:
      return {
        ...state,
        updated: true,
        project: {
          ...state.project,
          [action.data.filterType]: action.data.values,
        }
      };
    case SET_JOB_FILTERS:
      return {
        ...state,
        updated: true,
        job: {
          ...state.job,
          [action.data.filterType]: action.data.values
        }
      }
      case LOAD_MATCH_FILTERS:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case LOAD_MATCH_FILTERS_SUCCESS:
      // Don't save the default filter if the filter already has changed by the user
      if (state.updated) return state

      if (action.data.investor && action.data.investor.region) {
        action.data.investor.region = [action.data.investor.region]
      }
      if (action.data.project && action.data.project.region) {
        action.data.project.region = [action.data.project.region]
      }
      return {
        ...state,
        isLoading: false,
        error: false,
        professional: _.merge(state.professional, action.data.professional),
        project: _.merge(state.project, action.data.project),
        investor: _.merge(state.investor, action.data.investor),
        job: _.merge(state.job, action.data.job)
      }
    case LOAD_MATCH_FILTERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      }
    case CLEAR: {
      return initialState
    }
    default:
      return state;
  }
}
