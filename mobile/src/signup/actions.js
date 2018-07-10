import {
  SAVE_PROFILE_INFO
} from './action-types'

export function saveProfileInfo(profileInfo) {
    return {
        type: SAVE_PROFILE_INFO,
        profileInfo
    }
}
