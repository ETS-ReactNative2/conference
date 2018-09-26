import { batchActions } from 'redux-batch-enhancer'
import { getErrorDataFromNetworkException } from '../common/utils'
import * as globalActions from '../global/actions'
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

export const setInvestorFilter = filters => ({
  type: SET_INVESTOR_FILTERS,
  data: filters
})

export const setJobFilter = filters => ({
  type: SET_JOB_FILTERS,
  data: filters
})

export const setProjectFilter = filters => ({
  type: SET_PROJECT_FILTERS,
  data: filters
})

export const setProfessionalFilter = filters => ({
  type: SET_PROFESSIONAL_FILTERS,
  data: filters
})

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
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_MATCH_FILTERS_ERROR }]))
    }
  }
}
