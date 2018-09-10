import { decamelizeKeys } from 'humps'
import { batchActions } from 'redux-batch-enhancer'
import * as api from '../api/api'
import { getErrorDataFromNetworkException } from '../common/utils'
import * as globalActions from '../global/actions'
import { LOAD_PROJECT_MEMBERS_ERROR } from '../profile/action-types'
import {
  LOAD_DEFAULT_PROFILES,
  LOAD_DEFAULT_PROFILES_ERROR,
  LOAD_DEFAULT_PROFILES_SUCCESS,
  LOAD_PROFILES,
  LOAD_PROFILES_ERROR,
  LOAD_PROFILES_SUCCESS
} from './action-types'

export function fetchMatches () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_PROFILES })
      const [
        projectResponse,
        investorResponse,
        professionalResponse,
        jobsResponse
      ] = await Promise.all([
        api.fetchProjects({}),
        api.fetchInvestors({}),
        api.fetchProfessionals({}),
        api.fetchJobs({})
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

export function updateJobs (filters) {
  return async dispatch => {
    try {
      const { data, request } = await api.fetchJobs(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          jobs: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    }
  }
}

export function updateInvestors (filters) {
  return async dispatch => {
    try {
      const { data, request } = await api.fetchInvestors(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          investors: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    }
  }
}

export function updateProfessionals (filters) {
  return async dispatch => {
    try {
      const { data, request } = await api.getProfessionals(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          professionals: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    }
  }
}

export function updateProjects (filters) {
  return async dispatch => {
    try {
      const { data, request } = await api.fetchProjects(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          projects: data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROFILES_ERROR }]))
    }
  }
}
