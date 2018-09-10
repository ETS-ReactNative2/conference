import { batchActions } from 'redux-batch-enhancer'
import { getErrorDataFromNetworkException } from '../common/utils'
import * as globalActions from '../global/actions'
import { LOAD_PROFILES_ERROR } from '../search/action-types'
import {
  SET_INVESTOR_FILTERS,
  SET_PROJECT_FILTERS,
  SET_JOB_FILTERS,
  SET_PROFESSIONAL_FILTERS,
  LOAD_MATCH_FILTERS,
  LOAD_MATCH_FILTERS_SUCCESS,
  LOAD_MATCH_FILTERS_ERROR
} from './action-types'
import * as api from '../api/api'

export function setInvestorFilter (filters) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_INVESTOR_FILTERS,
        data: filters
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage)]))
    }
  }
}

export function setJobFilter (filters) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_JOB_FILTERS,
        data: filters
      })
    }
    catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage)]))
    }
  }
}

export function setProjectFilter (filters) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_PROJECT_FILTERS,
        data: filters
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage)]))
    }
  }
}

export function setProfessionalFilter (filters) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_PROFESSIONAL_FILTERS,
        data: filters
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage)]))
    }
  }
}

export function fetchFilters () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_MATCH_FILTERS })
      const [ investorResponse, projectResponse, professionalResponse, jobResponse ] = await Promise.all([
        api.fetchInvestorFilter(),
        api.fetchProjectFilter(),
        api.fetchProfessionalFilter(),
        api.fetchJobsFilter(),
      ])
      dispatch({
        type: LOAD_MATCH_FILTERS_SUCCESS,
        data: {
          project: projectResponse.data,
          investor: investorResponse.data,
          professional: professionalResponse.data,
          jobResponse: jobResponse.data
        }
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_MATCH_FILTERS_ERROR}]))
    }
  }
}
