import {
  SAVE_INVESTOR,
  SAVE_PROFILE_EMPLOYER,
  SAVE_PROFILE_INVESTEE,
  SAVE_PROFILE_INFO,
  SAVE_EMPLOYEE
} from './action-types'

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

export function saveEmployee(employeeData) {
  return {
    type: SAVE_EMPLOYEE,
    employeeData
  }
}
