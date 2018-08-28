import { decamelizeKeys } from 'humps'
import * as api from '../api/api'
import {
  DEACTIVATE_INVESTOR,
  DEACTIVATE_PROFILE,
  REACTIVATE_INVESTOR,
  REACTIVATE_PROFILE,
  LEAVE_PROJECT,
  LOAD_PROFILES,
  LOAD_PROFILES_ERROR,
  LOAD_PROFILES_SUCCESS,
  UPDATE_BASIC,
  PREFILL_EDIT
} from './action-types'

export function fetchProfiles () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_PROFILES })
      const [ projectResponse, investorResponse, professionalResponse, basicResponse ] = await Promise.all([
        api.fetchMyProject(),
        api.fetchMyInvestor(),
        api.fetchMyProfile(),
        api.fetchMyBasic()
      ])
      dispatch({
        type: LOAD_PROFILES_SUCCESS,
        data: {
          project: projectResponse.data,
          investor: investorResponse.data,
          professional: professionalResponse.data,
          basic: basicResponse.data
        }
      })
    } catch (err) {
      console.log({ err })
      dispatch({ type: LOAD_PROFILES_ERROR })
    }
  }
}

export function openEdit (type, prefill = true) {
  let role
  switch(type) {
    case 'professional':
      role = 'employee'
      break
    case 'project':
      role = 'investee'
      break
    case 'investor':
      role = 'investor'
      break
  }
  return async (dispatch, getState) => {
    dispatch({
      type: PREFILL_EDIT,
      data: {
        role,
        info: getState().profile[type],
        prefill
      }
    })
  }
}

export function updateBasic (basic) {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_BASIC,
      data: basic
    })
    await api.createOrUpdateConferenceUser(getState().profile.basic)
  }
}

export function activateInvestor () {
  return async dispatch => {
    try {
      await api.reactivateInvestor()
      dispatch({
        type: REACTIVATE_INVESTOR
      })
    } catch (err) {
      console.log({ err })
    }
  }
}

export function activateProfile () {
  return async dispatch => {
    try {
      await api.reactivateProfile()
      dispatch({
        type: REACTIVATE_PROFILE
      })
    } catch (err) {
      console.log({ err })
    }
  }
}

export function leaveProject () {
  return async dispatch => {
    try {
      await api.leaveProject()
      dispatch({
        type: LEAVE_PROJECT
      })
    } catch (err) {
      console.log({ err })
    }
  }
}

export function deactivateInvestor () {
  return async dispatch => {
    try {
      await api.deactivateInvestor()
      dispatch({
        type: DEACTIVATE_INVESTOR
      })
    } catch (err) {
      console.log({ err })
    }
  }
}

export function deactivateProfile () {
  return async dispatch => {
    try {
      await api.deactivateProfile()
      dispatch({
        type: DEACTIVATE_PROFILE
      })
    } catch (err) {
      console.log({ err })
    }
  }
}
