import * as api from '../api/api'
import {
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INFO,
  SAVE_PROFILE_INVESTEE,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS
} from './action-types'

import { globalActions } from '../global'
import { storageService, navigationService } from '../services'
import { PAGES_NAMES } from '../navigation'
import I18n from '../../locales/i18n'

const TOKEN_NAME = 'AUTH-TOKEN';

export function signup (signupData) {
  return dispatch => {
    return api.signup(signupData)
  }
}

export function uploadProfile () {
  return async (dispatch, getState) => {
    const flow = getState().signUp
    const { profile: {type, ...profileRest}, investor, investee, employeer, employee } = flow
    await api.createConferenceUser(profileRest)
    switch (type) {
      case 'investee':
        return await api.createInvestee({
          country: '',
          description: investee.projectDescription,
          fundingStage: investee.fundingStage,
          giveaway: '',
          notable: investee.teamMembers,
          name: investee.projectName,
          productStage: investee.productStage,
          tagline: investee.projectTagline,
          tokenType: ''
        })
      case 'investor':
        return await api.createInvestor({
          country: investor.companyLocation,
          description: '',
          fundingStage: investor.stages,
          ticketSizes: investor.ticketSizes,
          name: '',
          productStages: [],
          tagline: '',
          tokenTypes: investor.investments
        })
    }
  }
}

export function saveProfileInfo (profileInfo) {
  return {
    type: SAVE_PROFILE_INFO,
    profileInfo
  }
}

export function saveProfileInvestee (investeeInfo) {
  return {
    type: SAVE_PROFILE_INVESTEE,
    investeeInfo
  }
}

export function saveProfileEmployer (employerInfo) {
  return {
    type: SAVE_PROFILE_EMPLOYER,
    employerInfo
  }
}

export function saveInvestor (investorData) {
  return {
    type: SAVE_INVESTOR,
    data: investorData
  }
}

export function saveEmployee (employeeData) {
  return {
    type: SAVE_EMPLOYEE,
    employeeData
  }
}

const logInError = err => ({
  type: LOGIN_USER_ERROR,
  error: err
});

const loginInSuccess = () => ({
  type: LOGIN_USER_SUCCESS
});

export const login = (username, password) => async dispatch => {
  try {
    dispatch(globalActions.setGlobalLoading(I18n.t('login_page.spinner_text')))
    const response = await api.login(username, password)
    const token = response.data.token
    await storageService.removeItem(TOKEN_NAME)
    await storageService.setItem(TOKEN_NAME, token)
    dispatch(loginInSuccess())
    navigationService.navigate(PAGES_NAMES.FLOW_PAGE)
  } catch (err) {
    //TODO: Refactor to use localization for errors
    dispatch(logInError('Error during logging in'))
  } finally {
    dispatch(globalActions.unsetGlobalLoading())
  }
}
