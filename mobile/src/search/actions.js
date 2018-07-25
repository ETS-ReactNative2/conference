import { LOAD_PROFILES, LOAD_PROFILES_ERROR, LOAD_PROFILES_SUCCESS } from './action-types'
import * as api from '../api/api'

export function fetchMatches () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_PROFILES })
      const projectResponse = await api.fetchProjects()
      const investorResponse = await api.fetchInvestors()
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          projects: projectResponse.data,
          investors: investorResponse.data
        }
      })
    } catch (err) {
      console.log(err)
      dispatch({ type: LOAD_PROFILES_ERROR })
    }
  }
}
