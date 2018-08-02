import { decamelizeKeys } from 'humps'
import * as api from '../api/api'
import { LOAD_PROFILES, LOAD_PROFILES_ERROR, LOAD_PROFILES_SUCCESS } from './action-types'

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
      console.log({err})
      dispatch({ type: LOAD_PROFILES_ERROR })
    }
  }
}

export function updateInvestors (filters) {
  return async dispatch => {
    try {
      const {data, request} = await api.fetchInvestors(decamelizeKeys(filters))
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          investors: data
        }
      })
    } catch (err) {
      dispatch({ type: LOAD_PROFILES_ERROR })
    }
  }
}

export function updateProjects (filters) {
  return async dispatch => {
    try {
      const {data, request} = await api.fetchProjects(decamelizeKeys(filters))
      console.log({ request, data })
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          projects: data
        }
      })
    } catch (err) {
      dispatch({ type: LOAD_PROFILES_ERROR })
    }
  }
}
