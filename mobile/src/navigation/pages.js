import React from 'react'
import { Image, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../locales/i18n'
import GlassBlack from '../assets/icons/zoom-white.png'
import GlassRed from '../assets/icons/zoom-pink.png'
import PolygonBlack from '../assets/icons/polygon-white.png'
import PolygonRed from '../assets/icons/polygon-pink.png'
import RectangleBlack from '../assets/icons/square-white.png'
import RectangleRed from '../assets/icons/square-pink.png'
import TriangleBlack from '../assets/icons/triangle-white.png'
import TriangleRed from '../assets/icons/triangle-pink.png'
import { navigationService } from '../services'
import LoadingPage from '../views/components/loading-page/loading-page'
import MessagePage from '../views/components/message-page/message-page'
import AgendaPage from '../views/pages/agenda/agenda-page'
import FilterPage from '../views/pages/filters/filter-page'
import InvestorMainFilterPage from '../views/pages/filters/investor-main-filter-page'
import ProjectMainFilterPage from '../views/pages/filters/project-main-filter-page'
import ProfessionalMainFilterPage from '../views/pages/filters/professional-main-filter-page'
import JobMainFilterPage from '../views/pages/filters/job-main-filter-page'
import FlowPage from '../views/pages/flow/flow-page'
import { CommonProfileType } from '../views/pages/flow/steps'
import CommonProfileOnboarding, { EditBasicInfo } from '../views/pages/flow/steps/common-profile-onboarding'
import HomePage from '../views/pages/home/home-page'
import InvestorPage from '../views/pages/investor/investor-page'
import LoginPage from '../views/pages/login/login-page'
import ProfessionalPage from '../views/pages/professional/professional-page'
import ProfilePage from '../views/pages/profile/profile-page'
import ProjectPage from '../views/pages/project/project-page'
import ProjectMembersPage from '../views/pages/project/project-members-page'
import SearchPage from '../views/pages/search/search-page'
import SignupPage from '../views/pages/signup/signup-page'
import WebviewPage from '../views/pages/webview/webview-page'
import WelcomePage from '../views/pages/welcome/welcome-page'
import ProjectDescriptionPage from '../views/pages/project/project-description-page'
import JobsPage from '../views/pages/job/jobs-page'
import JobDescriptionPage from '../views/pages/job/job-description-page'
import PrivacyPolicyPage from '../views/pages/privacy-policy/privacy-policy'
import TermsOfServicePage from '../views/pages/terms-of-service/terms-of-service'

const PAGES_NAMES = {
  WELCOME_PAGE: 'WELCOME_PAGE',
  FLOW_PAGE: 'FLOW_PAGE',
  LOGIN_PAGE: 'LOGIN_PAGE',
  SIGNUP_PAGE: 'SIGNUP_PAGE',
  SEARCH_PAGE: 'SEARCH_PAGE',
  HOME_PAGE: 'HOME_PAGE',
  AGENDA_PAGE: 'AGENDA_PAGE',
  NOTIFICATIONS_PAGE: 'NOTIFICATIONS_PAGE',
  INVESTOR_PAGE: 'INVESTOR_PAGE',
  PROFESSIONAL_PAGE: 'PROFESSIONAL_PAGE',
  PROJECT_PAGE: 'PROJECT_PAGE',
  PROJECT_DESCRIPTION_PAGE: 'PROJECT_DESCRIPTION_PAGE',
  PROJECT_MEMBERS_PAGE: 'PROJECT_MEMBERS_PAGE',
  JOBS_PAGE: 'JOBS_PAGE',
  JOB_DESCRIPTION_PAGE: 'JOB_DESCRIPTION_PAGE',
  PROFILE_ONBOARDING_PAGE: 'PROFILE_ONBOARDING_PAGE',
  PROFILE_TYPE_PAGE: 'PROFILE_TYPE_PAGE',
  LOCATION_PAGE: 'LOCATION_PAGE',
  FILTER_PAGE: 'FILTER_PAGE',
  INVESTOR_MAIN_FILTER_PAGE: 'INVESTOR_MAIN_FILTER_PAGE',
  PROJECT_MAIN_FILTER_PAGE: 'PROJECT_MAIN_FILTER_PAGE',
  JOB_MAIN_FILTER_PAGE: 'JOB_MAIN_FILTER_PAGE',
  PROFESSIONAL_MAIN_FILTER_PAGE: 'PROFESSIONAL_MAIN_FILTER_PAGE',
  WEBVIEW_PAGE: 'WEBVIEW_PAGE',
  PROFILE_PAGE: 'PROFILE_PAGE',
  EDIT_BASIC_PROFILE: 'EDIT_BASIC_PROFILE',
  PRIVACY_POLICY_PAGE: 'PRIVACY_POLICY_PAGE',
  TERMS_OF_SERVICE_PAGE: 'TERMS_OF_SERVICE_PAGE'
}

const commonNavBarStyle = {
  headerStyle: {
    backgroundColor: '#603695'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#FFF'
  },
  headerTintColor: '#FFF'
}

const flowNavbarStyle = {
  headerStyle: {
    backgroundColor: 'transparent'
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#FFF'
  },
  headerTintColor: '#FFF'
}

const DrawerStack = createBottomTabNavigator({
    HOME_PAGE: {
      screen: HomePage,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navigator.home'),
        tabBarIcon: ({ focused }) => {
          return <Image style={ { width: 20, height: 20 } } source={ focused ? TriangleRed : TriangleBlack }/>
        },
        header: null
      })
    },
    AGENDA_PAGE: {
      screen: AgendaPage,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navigator.conference'),
        tabBarIcon: ({ focused }) => {
          return <Image style={ { width: 20, height: 22 } } source={ focused ? PolygonRed : PolygonBlack }/>
        }
      })
    },
    SEARCH_PAGE: {
      screen: SearchPage,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navigator.search'),
        tabBarIcon: ({ focused }) => {
          return <Image style={ { width: 24, height: 21 } } source={ focused ? GlassRed : GlassBlack }/>
        }
      })
    },
    PROFILE_PAGE: {
      screen: ProfilePage,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navigator.profile'),
        tabBarIcon: ({ focused }) => {
          return <Image style={ { width: 20, height: 20 } } source={ focused ? RectangleRed : RectangleBlack }/>
        }
      })
    },

  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      },
      activeTintColor: 'white'
    }
  }
)

const DrawerNavigation = createStackNavigator({
  DrawerStack: {
    screen: DrawerStack
  }
}, {
  headerMode: 'none',
})

const AppStackNavigator = createStackNavigator({
  WELCOME_PAGE: {
    screen: WelcomePage,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    }),
  },
  HOME_PAGE: {
    screen: DrawerNavigation,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  },
  PROFILE_ONBOARDING_PAGE: {
    screen: CommonProfileOnboarding,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  },
  PROFILE_TYPE_PAGE: {
    screen: CommonProfileType,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  },
  EDIT_BASIC_PROFILE: {
    screen: EditBasicInfo,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  },
  FLOW_PAGE: {
    screen: FlowPage,
    navigationOptions: nav => ({
      title: I18n.t('flow_page.title'),
      ...flowNavbarStyle,
      ...FlowPage.navigationOptions(nav),
      gesturesEnabled: false
    })
  },
  SEARCH_PAGE: {
    screen: SearchPage,
    navigationOptions: () => ({
      title: I18n.t('search_page.title'),
      ...commonNavBarStyle,
      gesturesEnabled: false
    })
  },
  LOGIN_PAGE: {
    screen: LoginPage,
    navigationOptions: () => ({
      title: I18n.t('login_page.title'),
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    }),
  },
  SIGNUP_PAGE: {
    screen: SignupPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    }),
  },
  INVESTOR_PAGE: {
    screen: InvestorPage,
    navigationOptions: () => ({
      title: I18n.t('investor_page.title'),
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PROFESSIONAL_PAGE: {
    screen: ProfessionalPage,
    navigationOptions: () => ({
      title: I18n.t('professional_page.title'),
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PROJECT_PAGE: {
    screen: ProjectPage,
    navigationOptions: () => ({
      title: I18n.t('project_page.title'),
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PROJECT_DESCRIPTION_PAGE: {
    screen: ProjectDescriptionPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PROJECT_MEMBERS_PAGE: {
    screen: ProjectMembersPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  JOBS_PAGE: {
    screen: JobsPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  JOB_DESCRIPTION_PAGE: {
    screen: JobDescriptionPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PROJECT_DESCRIPTION_PAGE: {
    screen: ProjectDescriptionPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null
    })
  },
  JOBS_PAGE: {
    screen: JobsPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null
    })
  },
  JOB_DESCRIPTION_PAGE: {
    screen: JobDescriptionPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null
    })
  },
  WEBVIEW_PAGE: {
    screen: WebviewPage,
    navigationOptions: () => ({
      // header: null,
      gesturesEnabled: false
    })
  },
  FILTER_PAGE: {
    screen: FilterPage,
    navigationOptions: () => ({
      title: 'Filter',
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  INVESTOR_MAIN_FILTER_PAGE: {
    screen: InvestorMainFilterPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PROJECT_MAIN_FILTER_PAGE: {
    screen: ProjectMainFilterPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PROFESSIONAL_MAIN_FILTER_PAGE: {
    screen: ProfessionalMainFilterPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  JOB_MAIN_FILTER_PAGE: {
    screen: JobMainFilterPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null,
      gesturesEnabled: false
    })
  },
  PRIVACY_POLICY_PAGE: {
    screen: PrivacyPolicyPage,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  },
  TERMS_OF_SERVICE_PAGE: {
    screen: TermsOfServicePage,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  }
})

const AppStackNavigatorWithSpinner = ({ isLoading, message, showMessage }) => {
  return (
    <View style={ { flex: 1 } } forceInset={ { top: 'always' } }>
      <AppStackNavigator ref={ navigatorRef => {
        navigationService.setTopLevelNavigator(navigatorRef)
      } } styles={ { position: 'absolute' } }/>
      <LoadingPage isLoading={ isLoading } message={ message }/>
      <MessagePage showMessage={ showMessage }/>
    </View>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.global.isLoading,
    message: state.global.loadingMessage,
    showMessage: state.global.showMessage
  }
}

const ConnectedAppStackNavigator = connect(mapStateToProps, null)(AppStackNavigatorWithSpinner)

export { PAGES_NAMES, ConnectedAppStackNavigator }

const styles = {
  container: {
    flex: 1
  },
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#14192E'
  },
  message: {
    color: '#603695',
    fontWeight: 'bold'
  },
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#D8D8D8',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold'
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16
  }
}
