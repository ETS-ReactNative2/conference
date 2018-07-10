import {
  SAVE_PROFILE_BASIC_INFO
} from './action-types'

export function saveBasicProfileInfo(profileInfo) {
    return {
        type: SAVE_PROFILE_BASIC_INFO,
        profileInfo
    }
}
