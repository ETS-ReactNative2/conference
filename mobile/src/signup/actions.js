import { batchActions } from 'redux-batch-enhancer'
import I18n from '../../locales/i18n'
import * as api from '../api/api'

import { getErrorDataFromNetworkException, isNetworkUnavailable } from '../common/utils'
import { ROLES } from '../enums'
import { CLEAR as FILTER_CLEAR } from '../filters/action-types'
import { globalActions } from '../global'
import { PAGES_NAMES } from '../navigation'
import { CLEAR as NOTIFICATION_CLEAR } from '../notifications/action-types'
import {
  CLEAR as PROFILE_CLEAR,
  PROPAGATE_INVESTOR_PROFILE,
  PROPAGATE_PROFESSIONAL_PROFILE,
  PROPAGATE_PROJECT_PROFILE
} from '../profile/action-types'
import { deactivateProfile, fetchProfiles } from '../profile/actions'
import { fetchConferenceSchedule } from '../schedule/actions'

import {
  CLEAR as SEARCH_CLEAR,
  PROPAGATE_INVESTOR_DEFAULTS,
  PROPAGATE_INVESTOR_SEARCH,
  PROPAGATE_PROFESSIONAL_DEFAULTS,
  PROPAGATE_PROFESSIONAL_SEARCH,
  PROPAGATE_PROJECT_DEFAULTS,
  PROPAGATE_PROJECT_SEARCH
} from '../search/action-types'
import { fetchDefaults } from '../search/actions'
import { navigationService, storageService } from '../services'
import {
  CLEAR as SIGNUP_CLEAR,
  CLEAR_LOGIN_USER_ERROR,
  CLEAR_SIGN_UP_USER_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INFO,
  SAVE_PROFILE_INVESTEE,
  SIGN_UP_USER_ERROR
} from './action-types'

const TOKEN_NAME = 'AUTH-TOKEN'

export const clearSignUpError = () => ({
  type: CLEAR_SIGN_UP_USER_ERROR
})

const signUpError = errorMsg => ({
  type: SIGN_UP_USER_ERROR,
  error: errorMsg
})

export const signup = signupData => async dispatch => {
  try {
    dispatch(batchActions([ clearSignUpError(),
      globalActions.hideAlert(),
      globalActions.setGlobalLoading(I18n.t('signup_page.spinner_text')) ]))
    await api.signup(signupData)
    await dispatch(login(signupData.email, signupData.password, PAGES_NAMES.PROFILE_ONBOARDING_PAGE))
  } catch (err) {
    const errorData = getErrorDataFromNetworkException(err)
    if (errorData.isFieldError) {
      dispatch(signUpError(errorData.errorMessage))
    } else {
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    }
  } finally {
    dispatch(globalActions.unsetGlobalLoading())
  }
}

export function uploadProfile () {
  return async (dispatch, getState) => {
    try {
      const flow = getState().signUp
      const { profile: { type, ...profileRest }, investor, investee, employer, employee } = flow
      switch (type) {
        case 'investee': {
          await api.createInvestee({
            description: investee.projectDescription,
            name: investee.projectName,
            productStage: investee.productStage,
            fundingStage: investee.fundingStage,
            fundraisingAmount: investee.amount,
            giveaway: investee.giveaway,
            notable: investee.teamMembers,
            size: Number(investee.teamSize) || 0,
            tagline: investee.projectTagline,
            tokenType: investee.tokenType,
            github: investee.github,
            twitter: investee.twitter,
            website: investee.website,
            whitepaper: investee.whitepaper,
            telegram: investee.telegram,
            news: investee.news,
            region: investee.investorNationality,
            regionOtherText: investee.regionOtherText,
            imageUrl: investee.imageUrl
          })
          if (investee.hiring) {
            const { roles, ...jobs } = employer
            const jobsArray = Object.keys(jobs).map(key => {
              const job = employer[ key ]
              return {
                role: ROLES.find(role => role.slug === key).index,
                skillsText: job.keywords,
                link: job.link,
                description: job.description,
                partTime: job.partTime,
                payments: job.payments,
                localRemoteOptions: job.location,
                country: job.country ? job.country.cca2 : '',
                city: job.city
              }
            })
            await api.createJob({ jobs: jobsArray })
          }
          const {data} = await api.fetchMyProject()
          dispatch({ type: PROPAGATE_PROJECT_PROFILE, data})
          dispatch({ type: PROPAGATE_PROJECT_SEARCH, data })
          dispatch({ type: PROPAGATE_PROJECT_DEFAULTS, data })
          return data
        }
        case 'investor': {
          const { data } = await api.createInvestor({
            giveaways: investor.giveaways,
            fundingStages: investor.stages,
            productStages: investor.productStages,
            ticketSizes: investor.ticketSizes,
            tokenTypes: investor.investments,
            region: investor.marketLocation,
            nationality: investor.nationality ? investor.nationality.cca2 : '',
            regionOtherText: investor.regionOtherText
          })
          dispatch({ type: PROPAGATE_INVESTOR_PROFILE, data})
          dispatch({ type: PROPAGATE_INVESTOR_SEARCH, data })
          dispatch({ type: PROPAGATE_INVESTOR_DEFAULTS, data })
          return data
        }
        case 'employee': {
          if (employee.lookingForJob) {
            const { data } = await api.putMyProfessional({
              role: employee.role,
              roleOtherText: employee.roleOtherText,
              skillsText: employee.skills,
              traitsText: employee.traits,
              knowMost: employee.mostInfo,
              relocate: employee.relocate,
              remote: employee.remote,
              country: employee.country ? employee.country.cca2 : '',
              city: employee.city,
              age: employee.age,
              experience: employee.experience
            })
            dispatch({ type: PROPAGATE_PROFESSIONAL_PROFILE, data})
            dispatch({ type: PROPAGATE_PROFESSIONAL_SEARCH, data })
            dispatch({ type: PROPAGATE_PROFESSIONAL_DEFAULTS, data })
            return data
          } else {
            if (getState().profile.professional) {
              await dispatch(deactivateProfile())
            }
          }
          break
        }
      }
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      throw errorData.errorMessage
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

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_USER_ERROR
})

const logInError = errorMsg => ({
  type: LOGIN_USER_ERROR,
  error: errorMsg
})

const loginInSuccess = () => ({
  type: LOGIN_USER_SUCCESS
})

export const login = (username, password, redirectPage) => async dispatch => {
  try {
    dispatch(batchActions([ clearLoginError(),
      globalActions.hideAlert(),
      globalActions.setGlobalLoading(I18n.t('login_page.spinner_text')) ]))
    const response = await api.login(username, password)
    const token = response.data.token
    await storageService.removeItem(TOKEN_NAME)
    await storageService.setItem(TOKEN_NAME, token)
    dispatch(loginInSuccess())
    dispatch(fetchDefaults())
    dispatch(fetchProfiles())
    dispatch(fetchConferenceSchedule())
    navigationService.navigate(redirectPage)
  } catch (err) {
    let errorData = {}
    if (!isNetworkUnavailable(err) && err.response.status === 401) {
      errorData = {
        isFieldError: true,
        errorMessage: I18n.t('common.errors.invalid_credentials')
      }
    } else {
      errorData = getErrorDataFromNetworkException(err)
    }
    if (errorData.isFieldError) {
      dispatch(logInError(errorData.errorMessage))
    } else {
      dispatch(globalActions.showAlertError(errorData.errorMessage))
    }
  } finally {
    dispatch(globalActions.unsetGlobalLoading())
  }
}

export function saveProfileOnboardingInfo (profileInfo, redirectPage) {
  return async (dispatch) => {
    try {
      if (profileInfo.avatarSource && profileInfo.avatarSource.uri) {
        await api.uploadImage(profileInfo.avatarSource)
      }
      await api.createOrUpdateConferenceUser(profileInfo)
      dispatch(batchActions([ fetchProfiles(), saveProfileInfo(profileInfo) ]))
      navigationService.navigate(redirectPage)
    } catch (err) {
      const errorData = getErrorDataFromNetworkException(err)
      throw errorData.errorMessage
    }
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(globalActions.setGlobalLoading(I18n.t('common.spinner.logout')))
    await storageService.removeItem(TOKEN_NAME)
    await navigationService.navigate(PAGES_NAMES.WELCOME_PAGE)
    dispatch(batchActions([
      { type: SIGNUP_CLEAR },
      { type: SEARCH_CLEAR },
      { type: PROFILE_CLEAR },
      { type: NOTIFICATION_CLEAR },
      { type: FILTER_CLEAR },
      globalActions.setGlobalLoading(I18n.t('common.spinner.clear'))
    ]))
  } catch (err) {

  } finally {
    dispatch(globalActions.unsetGlobalLoading())
  }
}
