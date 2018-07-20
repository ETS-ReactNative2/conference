import * as api from '../api/api'
import {
  SAVE_EMPLOYEE,
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INFO,
  SAVE_PROFILE_INVESTEE
} from './action-types'

export function signup (signupData) {
  return dispatch => {
    return api.signup(signupData)
  }
}

export function uploadProfile () {
  return async (dispatch, getState) => {
    const flow = getState().signUp
    const { profile: {type, ...profileRest}, investor, investee, employeer, employee } = flow
    console.log({
      type,
      profileRest,
      investor
    })
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
          maxTickets: investor.ticketSize.max,
          minTickets: investor.ticketSize.min,
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
