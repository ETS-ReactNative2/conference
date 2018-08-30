import { decamelizeKeys } from 'humps'
import * as api from '../api/api'
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
        // TODO: unlock when endpoint ready
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
      console.log({ err })
      dispatch({ type: LOAD_PROFILES_ERROR })
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
      console.log({ err })
      dispatch({ type: LOAD_DEFAULT_PROFILES_ERROR })
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
      dispatch({ type: LOAD_PROFILES_ERROR })
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
      dispatch({ type: LOAD_PROFILES_ERROR })
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
          projects: data
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
      const { data, request } = await api.fetchProjects(decamelizeKeys(filters))
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
