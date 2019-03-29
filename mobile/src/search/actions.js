import { decamelizeKeys } from 'humps'
import { batchActions } from 'redux-batch-enhancer'
import * as api from '../api/api'
import { getErrorDataFromNetworkException } from '../common/utils'
import * as globalActions from '../global/actions'
import { searchService } from '../services'
import {
  LOAD_DEFAULT_PROFILES,
  LOAD_DEFAULT_PROFILES_ERROR,
  LOAD_DEFAULT_PROFILES_SUCCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_ERROR,
  LOAD_PROFILES_SUCCESS,
  SEARCH_RESULTS_QUERY_START,
  SEARCH_RESULTS_QUERY_END
} from './action-types'

export const fetchMatchesSuccess = (projects, investors, professionals, jobs) => ({
  type: LOAD_PROFILES_SUCCESS,
  data: {
    projects,
    investors,
    professionals,
    jobs
  }
})

export const fetchDefaultsSuccess = (projects, investors, professionals) => ({
  type: LOAD_DEFAULT_PROFILES_SUCCESS,
  data: {
    projects,
    investors,
    professionals
  }
})

const startSearchResultsQueryLoading = () => ({
  type: SEARCH_RESULTS_QUERY_START
})

const finishSearchResultsQueryLoading = () => ({
  type: SEARCH_RESULTS_QUERY_END
})

export function updateJobs (filters) {
  return async dispatch => {
    try {
      dispatch(startSearchResultsQueryLoading())
      const { data } = await api.fetchJobs(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          jobs: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    } finally {
      dispatch(finishSearchResultsQueryLoading())
    }
  }
}

export function updateInvestors (filters) {
  return async dispatch => {
    try {
      dispatch(startSearchResultsQueryLoading())
      const { data } = await api.fetchInvestors(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          investors: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    } finally {
      dispatch(finishSearchResultsQueryLoading())
    }
  }
}

export function updateProfessionals (filters) {
  return async dispatch => {
    try {
      dispatch(startSearchResultsQueryLoading())
      const { data } = await api.fetchProfessionals(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          professionals: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    } finally {
      dispatch(finishSearchResultsQueryLoading())
    }
  }
}

export function updateProjects (filters) {
  return async dispatch => {
    try {
      dispatch(startSearchResultsQueryLoading())
      const { data } = await api.fetchProjects(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          projects: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    } finally {
      dispatch(finishSearchResultsQueryLoading())
    }
  }
}
