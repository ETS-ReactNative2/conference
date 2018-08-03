import I18n from '../../locales/i18n'
import * as api from '../api/api'

import { globalActions } from '../global'
import { PAGES_NAMES } from '../navigation'
import { navigationService, storageService } from '../services'
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INFO,
  SAVE_PROFILE_INVESTEE
} from './action-types'

const TOKEN_NAME = 'AUTH-TOKEN'
const ID_NAME = 'ID_NAME'

export function signup (signupData) {
  return async dispatch => {
    const res = await api.signup(signupData)
    await storageService.setItem(ID_NAME, String(res.data.id))
    await dispatch(login(signupData.email, signupData.password))
    return
  }
}

export function uploadProfile () {
  return async (dispatch, getState) => {
    try {
      const flow = getState().signUp
      const { profile: { type, ...profileRest }, investor, investee, employeer, employee } = flow
      await api.createConferenceUser({...profileRest, userId: await storageService.getItem(ID_NAME)})
      switch (type) {
        case 'investee':
          return await api.createInvestee({
            country: '',
            description: investee.projectDescription,
            fundingStage: investee.fundingStage,
            giveaway: investee.giveaway,
            notable: investee.teamMembers,
            name: investee.projectName,
            productStage: investee.productStage,
            tagline: investee.projectTagline,
            tokenType: investee.tokenType
          })
        case 'investor':
          return await api.createInvestor({
            giveaways: investor.giveaways,
            fundingStages: investor.stages,
            productStages: investor.productStages,
            ticketSizes: investor.ticketSizes,
            tokenTypes: investor.investments
          })
      }
    } catch (err) {
      console.log({ err })
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
    investorData
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
})

const loginInSuccess = () => ({
  type: LOGIN_USER_SUCCESS
})

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
