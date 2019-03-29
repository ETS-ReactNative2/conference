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
import { filtersService } from '../services'

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

export const fetchFiltersSuccess = (projectsFilter, investorsFilter, professionalsFilter, jobsFilter) => ({
  type: LOAD_MATCH_FILTERS_SUCCESS,
  data: {
    project: projectsFilter,
    investor: investorsFilter,
    professional: professionalsFilter,
    job: jobsFilter
  }
})

export function fetchFilters () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_MATCH_FILTERS })
      const [ investorResponse, projectResponse, professionalResponse, jobResponse ] = await filtersService.fetchFilters()
      dispatch(fetchFiltersSuccess(projectResponse.data, investorResponse.data, professionalResponse.data, jobResponse.data))
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_MATCH_FILTERS_ERROR }]))
    }
  }
}
