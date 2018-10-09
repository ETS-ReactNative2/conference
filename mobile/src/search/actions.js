import { decamelizeKeys } from 'humps'
import { batchActions } from 'redux-batch-enhancer'
import * as api from '../api/api'
import { getErrorDataFromNetworkException } from '../common/utils'
import * as globalActions from '../global/actions'
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

export function fetchMatches () {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_PROFILES })
      const [
        projectResponse,
        investorResponse,
        professionalResponse,
        jobsResponse
      ] = await Promise.all([
        api.fetchProjects(getState().filter.project),
        api.fetchInvestors(getState().filter.investor),
        api.fetchProfessionals(getState().filter.professional),
        api.fetchJobs(getState().filter.job)
      ])
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          projects: projectResponse.data,
          investors: investorResponse.data,
          professionals: professionalResponse.data,
          jobs: jobsResponse.data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    }
  }
}

export function fetchDefaults () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_DEFAULT_PROFILES })
      const [ projectResponse, investorResponse, professionalResponse ] = await Promise.all([
        api.fetchProjects({ defaults: true }),
        api.fetchInvestors({ defaults: true }),
        api.getProfessionals({ default: true })
      ])
      dispatch({
        type: LOAD_DEFAULT_PROFILES_SUCCESS,
        data: {
          projects: projectResponse.data,
          investors: investorResponse.data,
          professionals: professionalResponse.data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_DEFAULT_PROFILES_ERROR }]))
    }
  }
}

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
      const { data } = await api.getProfessionals(decamelizeKeys(filters))
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
