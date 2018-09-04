import I18n from '../../locales/i18n'
import * as api from '../api/api'
import { setGlobalLoading, unsetGlobalLoading } from '../global/actions'
import { PROPAGATE_USER_DEFAULTS, PROPAGATE_USER_SEARCH } from '../search/action-types'
import {
  DEACTIVATE_INVESTOR,
  DEACTIVATE_PROFILE,
  LEAVE_PROJECT,
  LOAD_PROFILES,
  LOAD_PROFILES_ERROR,
  LOAD_PROFILES_SUCCESS,
  LOAD_PROJECT_MEMBERS,
  LOAD_PROJECT_MEMBERS_ERROR,
  LOAD_PROJECT_MEMBERS_SUCCESS,
  PREFILL_EDIT,
  PROPAGATE_USER_PROFILE,
  REACTIVATE_INVESTOR,
  REACTIVATE_PROFILE,
  UPDATE_BASIC
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
  switch (type) {
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
        info: getState().profile[ type ],
        prefill
      }
    })
  }
}

export function updateBasic (basicChanges) {
  return async (dispatch, getState) => {
    const basicInfo = getState().profile.basic
    const shouldUpdateData = !compareUser(basicInfo, basicChanges)
    const shouldUpdatePhoto = !basicChanges.avatarSource.uri.startsWith('https')
      && basicChanges.avatarSource.uri !== ''
      && basicChanges.avatarSource.uri !== basicInfo.imageUrl
    console.log({
      basicInfo,
      basicChanges,
      shouldUpdateData
    })
    try {
      dispatch({
        type: UPDATE_BASIC,
        data: { ...basicChanges, imageUrl: basicChanges.avatarSource.uri }
      })
      dispatch(setGlobalLoading(I18n.t('profile_page.upload_loader_text')))
      if (shouldUpdatePhoto) {
        await api.uploadImage(basicChanges.avatarSource)
      }
      if (shouldUpdateData || shouldUpdatePhoto) {
        const { data } = await api.createOrUpdateConferenceUser(getState().profile.basic)
        dispatch({ type: PROPAGATE_USER_PROFILE, data: { ...data, imageUrl: basicChanges.avatarSource.uri } })
        dispatch({ type: PROPAGATE_USER_DEFAULTS, data: { ...data, imageUrl: basicChanges.avatarSource.uri } })
        dispatch({ type: PROPAGATE_USER_SEARCH, data: { ...data, imageUrl: basicChanges.avatarSource.uri } })
      }
    } catch (er) {
      console.error(er)
    } finally {
      dispatch(unsetGlobalLoading())
    }
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

export function loadProjectMemebers () {
  return async dispatch => {
    try {
      dispatch({
        type: LOAD_PROJECT_MEMBERS
      })
      const membersResponse = await api.getMyProjectMembers()
      dispatch({
        type: LOAD_PROJECT_MEMBERS_SUCCESS,
        data: membersResponse.data
      })
    } catch (err) {
      console.log({ err })
      dispatch({
        type: LOAD_PROJECT_MEMBERS_ERROR
      })
    }
  }
}

export function addProjetMember (email) {
  return async dispatch => {
    try {
      await api.postMyProjectMembers({ email })
      dispatch(loadProjectMemebers())
    } catch (err) {
      console.log({ err })
      dispatch({
        type: LOAD_PROJECT_MEMBERS_ERROR
      })
    }
  }
}

export function removeProjectMember (memberId) {
  return async dispatch => {
    try {
      await api.deleteMyProjectMembersId({ id: memberId })
      dispatch(loadProjectMemebers())
    } catch (err) {
      console.log({ err })
      dispatch({
        type: LOAD_PROJECT_MEMBERS_ERROR
      })
    }
  }
}

function compareUser (first, second) {
  const { avatarSource: firstAvat, user: firstUser, imageUrl: firstImage, ...firstRest } = first
  const { avatarSource: secAvat, user: secUser, imageUrl: secImage, ...secondRest } = second
  return JSON.stringify(firstRest) === JSON.stringify(secondRest)
}
