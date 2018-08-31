import {
  SET_INVESTOR_FILTERS,
  SET_PROJECT_FILTERS,
  SET_JOB_FILTERS,
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
      console.error(err)
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
      console.error(err)
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
      console.error(err)
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
      console.log({ err })
      dispatch({ type: LOAD_MATCH_FILTERS_ERROR })
    }
  }
}
