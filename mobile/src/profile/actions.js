import * as api from '../api/api'
import { getErrorDataFromNetworkException } from '../common/utils'
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
  UPDATE_BASIC,
  PROFILE_SPINNER_SHOW,
  PROFILE_SPINNER_HIDE,
  PROJECT_MEMBERS_SPINNER_HIDE,
  PROJECT_MEMBERS_SPINNER_SHOW,
  ADD_PROJECT_MEMBER_ERROR,
  REMOVE_MEMBER,
  ADD_PROJECT_MEMBER_SUCCESS, REMOVE_JOB, PREFILL_EDIT_JOB, PROJECT_JOB_SPINNER_SHOW, PROJECT_JOB_SPINNER_HIDE
} from './action-types'
import { searchActions } from '../search'
import { globalActions } from '../global'
import { batchActions } from 'redux-batch-enhancer'
import { profileService, searchService } from '../services'

export const fetchProfilesSuccess = (project, investor, professional, basic) => ({
  type: LOAD_PROFILES_SUCCESS,
  data: {
    project,
    investor,
    professional,
    basic
  }
})

export function fetchProfiles () {
  return async dispatch => {
    try {
      dispatch({ type: LOAD_PROFILES })
      const [ projectResponse, investorResponse, professionalResponse, basicResponse ] = await profileService.fetchProfileInfo()
      dispatch(fetchProfilesSuccess(projectResponse.data, investorResponse.data, professionalResponse.data, basicResponse.data))
    } catch (err) {
      dispatch({ type: LOAD_PROFILES_ERROR })
    }
  }
}

export function openEdit (type, prefill = true, jobId = -1) {
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
    case 'employer':
      role = 'employer'
  }
  return (dispatch, getState) => {
    if(role !=='employer') {
      dispatch({
        type: PREFILL_EDIT,
        data: {
          role,
          info: getState().profile[ type ],
          prefill
        }
      })
    } else {
      dispatch({
        type: PREFILL_EDIT_JOB,
        data: {
          role,
          info: getState().profile.project.jobListings.find(job => job.id === jobId),
          prefill
        }
      })
    }
  }
}

export function updateBasic (basicChanges) {
  return async (dispatch, getState) => {
    try {
      const basicInfo = getState().profile.basic
      const shouldUpdateData = !compareUser(basicInfo, basicChanges)
      const shouldUpdatePhoto = !basicChanges.avatarSource.uri.startsWith('https')
        && basicChanges.avatarSource.uri !== ''
        && basicChanges.avatarSource.uri !== basicInfo.imageUrl
      dispatch({
        type: UPDATE_BASIC,
        data: { ...basicChanges, imageUrl: basicChanges.avatarSource.uri }
      })
      if (shouldUpdatePhoto) {
        await api.uploadImage(basicChanges.avatarSource)
      }
      if (shouldUpdateData || shouldUpdatePhoto) {
        const { data } = await api.createOrUpdateConferenceUser(getState().profile.basic)
        dispatch({ type: PROPAGATE_USER_PROFILE, data: { ...data, imageUrl: basicChanges.avatarSource.uri } })
        dispatch({ type: PROPAGATE_USER_DEFAULTS, data: { ...data, imageUrl: basicChanges.avatarSource.uri } })
        dispatch({ type: PROPAGATE_USER_SEARCH, data: { ...data, imageUrl: basicChanges.avatarSource.uri } })
      }
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      throw errorData.errorMessage
    }
  }
}

export function activateInvestor () {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_SPINNER_SHOW
      })
      await api.reactivateInvestor()
      const [
        [ projectMatchesResponse, investorMatchesResponse, professionalMatchesResponse, jobsMatchesResponse ] = matchesResponses,
        [ projectDefaultResponse, investorDefaultResponse, professionalDefaultResponse] = defaultsResponses
      ] = await Promise.all([searchService.fetchMatches(getState().filter.project, getState().filter.investor, getState().filter.professional, getState().filter.job),
                            searchService.fetchDefaults()])
      dispatch(searchActions.fetchMatchesSuccess(projectMatchesResponse.data, investorMatchesResponse.data, professionalMatchesResponse.data, jobsMatchesResponse.data))
      dispatch(searchActions.fetchDefaultsSuccess(projectDefaultResponse.data, investorDefaultResponse.data, professionalDefaultResponse.data))
      dispatch({
        type: REACTIVATE_INVESTOR
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    } finally {
      dispatch({ type: PROFILE_SPINNER_HIDE })
    }
  }
}

export function activateProfile () {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_SPINNER_SHOW
      })
      await api.reactivateProfile()
      const [
        [ projectMatchesResponse, investorMatchesResponse, professionalMatchesResponse, jobsMatchesResponse ] = matchesResponses,
        [ projectDefaultResponse, investorDefaultResponse, professionalDefaultResponse] = defaultsResponses
      ] = await Promise.all([searchService.fetchMatches(getState().filter.project, getState().filter.investor, getState().filter.professional, getState().filter.job),
                             searchService.fetchDefaults()])
      dispatch(searchActions.fetchMatchesSuccess(projectMatchesResponse.data, investorMatchesResponse.data, professionalMatchesResponse.data, jobsMatchesResponse.data))
      dispatch(searchActions.fetchDefaultsSuccess(projectDefaultResponse.data, investorDefaultResponse.data, professionalDefaultResponse.data))
      dispatch({
        type: REACTIVATE_PROFILE
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    } finally {
      dispatch({ type: PROFILE_SPINNER_HIDE })
    }
  }
}

export function leaveProject () {
  return async dispatch => {
    try {
      dispatch({
        type: PROFILE_SPINNER_SHOW
      })
      await api.leaveProject()
      dispatch({
        type: LEAVE_PROJECT
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    } finally {
      dispatch({ type: PROFILE_SPINNER_HIDE })
    }
  }
}

export function deactivateInvestor () {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_SPINNER_SHOW
      })
      await api.deactivateInvestor()
      dispatch({
        type: DEACTIVATE_INVESTOR,
        data: getState().profile.investor.user.user
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    } finally {
      dispatch({ type: PROFILE_SPINNER_HIDE })
    }
  }
}

export function deactivateProfile () {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_SPINNER_SHOW
      })
      await api.deactivateProfile()
      dispatch({
        type: DEACTIVATE_PROFILE,
        data: getState().profile.professional.user.user
      })
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    } finally {
      dispatch({ type: PROFILE_SPINNER_HIDE })
    }
  }
}

export function loadProjectMembers () {
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
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROJECT_MEMBERS_ERROR }]))
    } finally {
      dispatch({ type: PROJECT_MEMBERS_SPINNER_HIDE })
    }
  }
}

export function addProjectMember (email) {
  return async dispatch => {
    try {
      dispatch({ type: PROJECT_MEMBERS_SPINNER_SHOW })
      await api.postMyProjectMembers({ email })
      dispatch({
        type: ADD_PROJECT_MEMBER_SUCCESS
      })
    } catch (err) {
      dispatch({
        type: ADD_PROJECT_MEMBER_ERROR
      })
    } finally {
      dispatch(loadProjectMembers())
    }
  }
}

export function removeProjectMember (memberId) {
  return async dispatch => {
    try {
      dispatch({ type: PROJECT_MEMBERS_SPINNER_SHOW })
      await api.deleteMyProjectMembersId({ id: memberId })
      dispatch({ type: REMOVE_MEMBER, data: memberId})
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(batchActions([globalActions.showAlertError(errorData.errorMessage), { type: LOAD_PROJECT_MEMBERS_ERROR }]))
    } finally {
      dispatch({ type: PROJECT_MEMBERS_SPINNER_HIDE })
    }
  }
}

export function removeProjectJob( jobId) {
  return async dispatch => {
    try {
      dispatch({ type: PROJECT_JOB_SPINNER_SHOW })
      await api.deleteProjectJob(jobId)
      dispatch({ type: REMOVE_JOB, data: jobId})
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    }finally {
      dispatch({ type: PROJECT_JOB_SPINNER_HIDE })
    }
  }
}

function compareUser (first, second) {
  const objFirst = {
    firstName: first.firstName,
    lastName: first.lastName,
    linkedin: first.linkedin,
    telegram: first.telegram,
    company: first.company
  }
  const objSec = {
    firstName: second.firstName,
    lastName: second.lastName,
    linkedin: second.linkedin,
    telegram: second.telegram,
    company: second.company
  }

  return JSON.stringify(objFirst) === JSON.stringify(objSec)
}
