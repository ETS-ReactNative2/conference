import { SET_INVESTOR_FILTERS } from './action-types'
import { SET_PROJECT_FILTERS } from './action-types'

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

export function setInvestorFilter (filters) {
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

