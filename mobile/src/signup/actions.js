import I18n from '../../locales/i18n'
import * as api from '../api/api'
import {batchActions} from 'redux-batch-enhancer'
import {ROLES} from '../enums'

import {globalActions} from '../global'
import {PAGES_NAMES} from '../navigation'
import {navigationService, storageService} from '../services'
import {
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    SAVE_EMPLOYEE,
    SAVE_INVESTOR,
    SAVE_PROFILE_EMPLOYER,
    SAVE_PROFILE_INFO,
    SAVE_PROFILE_INVESTEE,
    SIGN_UP_USER_ERROR,
    CLEAR_SIGN_UP_USER_ERROR,
    CLEAR_LOGIN_USER_ERROR,
    SAVE_PROFILE_ERROR,
    CLEAR_SAVE_PROFILE_ERROR
} from './action-types'

const TOKEN_NAME = 'AUTH-TOKEN'

const isNetworkUnavailable = err => {
    return err.response === undefined && err.message === "Network Error";
}

const getErrorData = err => {
    let errorMessage = ''
    let isFieldError = false
    const noInternetAccess = isNetworkUnavailable(err)
    if (noInternetAccess) {
        errorMessage = I18n.t('common.errors.no_internet_connection')
    } else {
        const isInternalServerError = err.response.status >= 500
        const isInvalidRequestError = err.response.status === 400
        const errorCode = err.response.data
        if (isInternalServerError) {
            errorMessage = I18n.t('common.errors.server_error')
        } else if (isInvalidRequestError) {
            errorMessage = I18n.t('common.errors.incorrect_request')
        } else {
            errorMessage = I18n.t(`common.errors.${errorCode}`)
            isFieldError = true;
        }
    }
    return {
        errorMessage,
        isFieldError
    }
}

export const clearSignUpError = () => ({
    type: CLEAR_SIGN_UP_USER_ERROR
})

const signUpError = (isEmailFieldError, errorMsg) => ({
    type: SIGN_UP_USER_ERROR,
    isServerError: !isEmailFieldError,
    isEmailFieldError: isEmailFieldError,
    error: errorMsg
})

export function signup(signupData) {
    return async dispatch => {
        try {
            dispatch(batchActions([clearSignUpError(), globalActions.setGlobalLoading(I18n.t('signup_page.spinner_text'))]))
            await api.signup(signupData)
            await dispatch(login(signupData.email, signupData.password, PAGES_NAMES.PROFILE_ONBOARDING_PAGE))
        } catch (err) {
            const errorData = getErrorData(err);
            dispatch(signUpError(errorData.isFieldError, errorData.errorMessage))
        } finally {
            dispatch(globalActions.unsetGlobalLoading())
        }
    }
}

export function uploadProfile() {
    return async (dispatch, getState) => {
        try {
            const flow = getState().signUp
            const {profile: {type, ...profileRest}, investor, investee, employer, employee} = flow
            await api.createConferenceUser({...profileRest})
            switch (type) {
                case 'investee':
                    await api.createInvestee({
                        description: investee.projectDescription,
                        name: investee.projectName,
                        productStage: investee.productStage,
                        fundingStage: investee.fundingStage,
                        fundraisingAmount: investee.amount,
                        giveaway: investee.giveaway,
                        notable: investee.teamMembers,
                        size: investee.teamSize,
                        tagline: investee.projectTagline,
                        tokenType: investee.tokenType,
                        github: investee.github,
                        twitter: investee.twitter,
                        website: investee.website,
                        whitepaper: investee.whitepaper,
                        telegram: investee.telegram,
                        news: investee.news,
                        legalCountry: investee.legal.cca2,
                        mainCountry: investee.main.cca2,
                        industry: investee.industry
                    })
                    if (investee.hiring) {
                        const {roles, ...jobs} = employer

                        const promises = Object.keys(jobs).map(async key => {
                            const job = employer[key]
                            return api.createJob({
                                role: ROLES.find(role => role.slug === key).index,
                                skillsText: job.keywords,
                                link: job.link,
                                description: job.description,
                                partTime: job.partTime,
                                payments: job.payments,
                                localRemoteOptions: job.location,
                                country: job.country ? job.country.cca2 : '',
                                city: job.city
                            })
                        })
                        return Promise.all(promises)
                    }
                case 'investor':
                    return await api.createInvestor({
                        giveaways: investor.giveaways,
                        fundingStages: investor.stages,
                        productStages: investor.productStages,
                        ticketSizes: investor.ticketSizes,
                        tokenTypes: investor.investments,
                        industries: investor.industries,
                        region: investor.marketLocation ? investor.marketLocation.index : "",
                        nationality: investor.nationality ? investor.nationality.cca2 : "",
                        regionOtherText: investor.regionOtherText
                    })
                case 'employee':
                    return await api.putMyProfessional({
                        role: employee.role,
                        roleOtherText: employee.roleOtherText,
                        skillsText: employee.skills,
                        traitsText: employee.traits,
                        knowMost: employee.knowMost,
                        localRemoteOptions: employee.localRemoteOptions,
                        country: employee.country,
                        city: employee.city,
                        age: employee.age,
                        experience: employee.experience
                    })
            }
        } catch (err) {
            console.log({err})
        }
    }
}

export function saveProfileInfo(profileInfo) {
    return {
        type: SAVE_PROFILE_INFO,
        profileInfo
    }
}

export function saveProfileInvestee(investeeInfo) {
    return {
        type: SAVE_PROFILE_INVESTEE,
        investeeInfo
    }
}

export function saveProfileEmployer(employerInfo) {
    return {
        type: SAVE_PROFILE_EMPLOYER,
        employerInfo
    }
}

export function saveInvestor(investorData) {
    return {
        type: SAVE_INVESTOR,
        investorData
    }
}

export function saveEmployee(employeeData) {
    return {
        type: SAVE_EMPLOYEE,
        employeeData
    }
}

export const clearLoginError = () => ({
    type: CLEAR_LOGIN_USER_ERROR
})

const logInError = (isCredentialsError, errorMsg) => ({
    type: LOGIN_USER_ERROR,
    isServerError: !isCredentialsError,
    isCredentialsError: isCredentialsError,
    error: errorMsg
})

const loginInSuccess = () => ({
    type: LOGIN_USER_SUCCESS
})

export const login = (username, password, redirectPage) => async dispatch => {
    try {
        dispatch(batchActions([clearLoginError(), globalActions.setGlobalLoading(I18n.t('login_page.spinner_text'))]))
        const response = await api.login(username, password)
        const token = response.data.token
        await storageService.removeItem(TOKEN_NAME)
        await storageService.setItem(TOKEN_NAME, token)
        dispatch(loginInSuccess())
        navigationService.navigate(redirectPage)
    } catch (err) {
        let errorData = {};
        if (!isNetworkUnavailable(err) && err.response.status === 401) {
            errorData = {
                isFieldError: true,
                errorMessage: I18n.t('common.errors.invalid_credentials')
            }
        } else {
            errorData = getErrorData(err);
        }
        dispatch(logInError(errorData.isFieldError, errorData.errorMessage))
    } finally {
        dispatch(globalActions.unsetGlobalLoading())
    }
}

export const clearSaveProfileError = () => ({
  type: CLEAR_SAVE_PROFILE_ERROR
})

const saveProfileError = errorMsg => ({
  type: SAVE_PROFILE_ERROR,
  isError: true,
  error: errorMsg
})

export const saveProfileOnboardingInfo = ( profileInfo, redirectPage) => async dispatch => {
  try {
    dispatch(batchActions([clearSaveProfileError(), globalActions.setGlobalLoading(I18n.t('flow_page.common.profile_onboarding.spinner_text'))]))
    await api.createConferenceUser(profileInfo)
    navigationService.navigate(redirectPage)
  } catch (err) {
    if (!isNetworkUnavailable(err) && err.response.status === 401) {
      navigationService.navigate(PAGES_NAMES.LOGIN_PAGE)
    } else {
      const errorData = getErrorData(err);
      dispatch(saveProfileError(errorData.errorMessage))
    }
  } finally {
    dispatch(globalActions.unsetGlobalLoading())
  } 
}
