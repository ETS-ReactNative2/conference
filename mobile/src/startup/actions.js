import { PAGES_NAMES } from '../navigation'
import { fetchDefaults } from '../search/actions'
import { navigationService, storageService } from '../services'
import { APP_LOADED } from './action-types'

const TOKEN_NAME = 'AUTH-TOKEN'

const appFinishedLoading = () => ({
  type: APP_LOADED
});

export const loadApp = () => async dispatch => {
  let userLandingPage = '';
  try {
    const persistedToken = await storageService.getItem(TOKEN_NAME)
    if (persistedToken) {
      userLandingPage = PAGES_NAMES.HOME_PAGE
      dispatch(fetchDefaults())
    } else {
      userLandingPage = PAGES_NAMES.WELCOME_PAGE
    }
  } catch (err) {
    await storageService.removeItem(TOKEN_NAME)
  } finally {
    dispatch(appFinishedLoading())
    navigationService.navigate(userLandingPage)
  }
};
