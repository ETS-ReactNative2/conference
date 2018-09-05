import I18n from '../../locales/i18n'
import { PAGES_NAMES } from '../navigation'
import { fetchProfiles } from '../profile/actions'
import { fetchConferenceSchedule } from '../schedule/actions'
import { fetchDefaults, fetchMatches } from '../search/actions'
import { fetchFilters } from '../filters/actions'
import { globalActions } from '../global'
import { navigationService, storageService } from '../services'
import { APP_LOADED } from './action-types'
import { isInternetAvailable } from '../common/utils'

const TOKEN_NAME = 'AUTH-TOKEN'

const appFinishedLoading = () => ({
  type: APP_LOADED
})

export const loadApp = () => async dispatch => {
  let userLandingPage = ''
  try {
    const persistedToken = await storageService.getItem(TOKEN_NAME)
    const isNetworkOn = await isInternetAvailable()
    if (persistedToken && isNetworkOn) {
      userLandingPage = PAGES_NAMES.HOME_PAGE
      Promise.all([
        dispatch(fetchDefaults()),
        dispatch(fetchProfiles()),
        dispatch(fetchMatches()),
        dispatch(fetchFilters()),
        dispatch(fetchConferenceSchedule())
      ])
    } else {
      userLandingPage = PAGES_NAMES.WELCOME_PAGE
    }
    if (!isNetworkOn) {
      dispatch(globalActions.showAlertError(I18n.t('common.errors.no_internet_connection')))
    }
  } catch (err) {
    userLandingPage = PAGES_NAMES.WELCOME_PAGE
    await storageService.removeItem(TOKEN_NAME)
  } finally {
    dispatch(appFinishedLoading())
    navigationService.navigate(userLandingPage)
  }
}
