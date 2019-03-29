import SplashScreen from "react-native-splash-screen"
import { StackActions, NavigationActions } from 'react-navigation'
import { PAGES_NAMES } from '../navigation'
import { globalActions } from '../global'
import { navigationService, storageService } from '../services'
import { APP_LOADED } from './action-types'
import { getErrorDataFromNetworkException } from '../common/utils'
import { searchService, profileService, filtersService, scheduleService } from '../services'
import { fetchDefaultsSuccess, fetchMatchesSuccess } from '../search/actions'
import { fetchProfilesSuccess } from '../profile/actions'
import { fetchFiltersSuccess } from '../filters/actions'
import { fetchConferenceScheduleSuccess } from '../schedule/actions'

const TOKEN_NAME = 'AUTH-TOKEN'

const appFinishedLoading = () => ({
  type: APP_LOADED
})

export const loadApp = () => async (dispatch, getState) => {
  let userLandingPage = ''
  try {
    const persistedToken = await storageService.getItem(TOKEN_NAME)
    if (persistedToken) {
      const [
              [ searchDefaultsProject, searchDefaultsInvestor, searchDefaultsProfessional ],
              [ profileInfoProject, profileInfoInvestor, profileInfoProfessional, profileInfoBasic ],
              [ searchMatchesProject, searchMatchesInvestor, searchMatchesProfessional, searchMatchesJobs ],
              [ filtersInvestor, filtersProject, filtersProfessional, filtersJob ],
              schedule 
            ] = await Promise.all([searchService.fetchDefaults(), profileService.fetchProfileInfo(),
                                   searchService.fetchMatches(getState().filter.project, getState().filter.investor, getState().filter.professional, getState().filter.job),
                                   filtersService.fetchFilters(), scheduleService.fetchSchedule()])
      dispatch(fetchDefaultsSuccess(searchDefaultsProject.data, searchDefaultsInvestor.data, searchDefaultsProfessional.data))
      dispatch(fetchProfilesSuccess(profileInfoProject.data, profileInfoInvestor.data, profileInfoProfessional.data, profileInfoBasic.data))
      dispatch(fetchMatchesSuccess(searchMatchesProject.data, searchMatchesInvestor.data, searchMatchesProfessional.data, searchMatchesJobs.data))
      dispatch(fetchFiltersSuccess(filtersProject.data, filtersInvestor.data, filtersProfessional.data, filtersJob.data))
      dispatch(fetchConferenceScheduleSuccess(schedule))
      userLandingPage = PAGES_NAMES.HOME_PAGE
    } else {
      userLandingPage = PAGES_NAMES.WELCOME_PAGE
    }
  } catch (err) {
    userLandingPage = PAGES_NAMES.WELCOME_PAGE
    await storageService.removeItem(TOKEN_NAME)
    const errorData = getErrorDataFromNetworkException(err);
    dispatch(globalActions.showAlertError(errorData.errorMessage))
  } finally {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: userLandingPage })],
    })
    dispatch(appFinishedLoading())
    navigationService.dispatch(resetAction)
    if(SplashScreen) {
      SplashScreen.hide()
    }
  }
}
