import {
  SAVE_PROFILE_INFO,
  SAVE_INVESTOR,
  SAVE_EMPLOYEE
} from './action-types'

export function saveProfileInfo(profileInfo) {
    return {
        type: SAVE_PROFILE_INFO,
        profileInfo
    }
}

export function saveInvestor(investorData) {
    return {
        type: SAVE_INVESTOR,
        data: investorData
    }
}

export function saveEmployee(employeeData) {
  return {
    type: SAVE_EMPLOYEE,
    employeeData
  }
}
