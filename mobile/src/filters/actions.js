import { SET_INVESTOR_FILTERS, SET_PROJECT_FILTERS, SET_JOB_FILTERS } from './action-types'

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

