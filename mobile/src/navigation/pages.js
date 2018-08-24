import { Container, Spinner, Text } from 'native-base'
import React from 'react'
import { Image, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../locales/i18n'
import GlassBlack from '../assets/icons/Glass-Black.png'
import GlassRed from '../assets/icons/Glass-Red.png'
import PolygonBlack from '../assets/icons/Polygon-Black.png'
import PolygonRed from '../assets/icons/Polygon-Red.png'
import RectangleBlack from '../assets/icons/Rectangle-Black.png'
import RectangleRed from '../assets/icons/Rectangle-Red.png'
import TriangleBlack from '../assets/icons/Triangle-Black.png'
import TriangleRed from '../assets/icons/Triangle-Red.png'
import { navigationService } from '../services'
import AgendaPage from '../views/pages/agenda/agenda-page'
import FlowPage from '../views/pages/flow/flow-page'
import { CommonProfileType } from '../views/pages/flow/steps'
import CommonProfileOnboarding from '../views/pages/flow/steps/common-profile-onboarding'
import HomePage from '../views/pages/home/home-page'
import InvestorPage from '../views/pages/investor/investor-page'
import LoginPage from '../views/pages/login/login-page'
import ProfessionalPage from '../views/pages/professional/professional-page'
import ProjectPage from '../views/pages/project/project-page'
import SearchPage from '../views/pages/search/search-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'
import FilterPage from '../views/pages/filters/filter-page';
import InvestorMainFilterPage from '../views/pages/filters/investor-main-filter-page';
import ProjectMainFilterPage from '../views/pages/filters/project-main-filter-page';

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
    PROFILE_ONBOARDING_PAGE: 'PROFILE_ONBOARDING_PAGE',
    PROFILE_TYPE_PAGE: 'PROFILE_TYPE_PAGE',
    LOCATION_PAGE: 'LOCATION_PAGE',
    FILTER_PAGE: 'FILTER_PAGE',
    INVESTOR_MAIN_FILTER_PAGE: 'INVESTOR_MAIN_FILTER_PAGE',
    PROJECT_MAIN_FILTER_PAGE: 'PROJECT_MAIN_FILTER_PAGE'
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
      // todo profile page
      screen: SearchPage,
      navigationOptions: ({ navigation }) => ({
        title: I18n.t('navigator.profile'),
        tabBarIcon: ({ focused }) => {
          return <Image style={ { width: 20, height: 20 } } source={ focused ? RectangleRed : RectangleBlack }/>
        }
      })
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#000'
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
      header: null
    }),
  },
  HOME_PAGE: {
    screen: DrawerNavigation,
    navigationOptions: () => ({
      header: null
    })
  },
  PROFILE_ONBOARDING_PAGE: {
    screen: CommonProfileOnboarding,
    navigationOptions: () => ({
      header: null
    })
  },
  PROFILE_TYPE_PAGE: {
    screen: CommonProfileType,
    navigationOptions: () => ({
      header: null
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
      ...commonNavBarStyle
    })
  },
  LOGIN_PAGE: {
    screen: LoginPage,
    navigationOptions: () => ({
      title: I18n.t('login_page.title'),
      ...commonNavBarStyle,
      header: null
    }),
  },
  SIGNUP_PAGE: {
    screen: SignupPage,
    navigationOptions: () => ({
      ...commonNavBarStyle,
      header: null
    }),
  },
  INVESTOR_PAGE: {
    screen: InvestorPage,
    navigationOptions: () => ({
      title: I18n.t('investor_page.title'),
      ...commonNavBarStyle,
      header: null
    })
  },
  PROFESSIONAL_PAGE: {
    screen: ProfessionalPage,
    navigationOptions: () => ({
      title: I18n.t('professional_page.title'),
      ...commonNavBarStyle,
      header: null
    })
  },
  PROJECT_PAGE: {
    screen: ProjectPage,
    navigationOptions: () => ({
      title: I18n.t('project_page.title'),
      ...commonNavBarStyle,
      header: null
    })
  },
  FILTER_PAGE: {
    screen: FilterPage,
    navigationOptions: () => ({
        title: 'Filter',
        ...commonNavBarStyle
    })
  },
  INVESTOR_MAIN_FILTER_PAGE: {
      screen: InvestorMainFilterPage,
  },
  PROJECT_MAIN_FILTER_PAGE: {
    screen: ProjectMainFilterPage,
  }
})

const AppStackNavigatorWithSpinner = ({ isLoading, message }) => {
  return (
    <Container style={ styles.container }>
      <AppStackNavigator ref={ navigatorRef => {
        navigationService.setTopLevelNavigator(navigatorRef)
      } } styles={ { position: 'absolute' } }/>
      { isLoading && (
        <View style={ styles.spinnerContainer }>
          <Spinner color={ '#603695' }/>
          <Text style={ styles.message }>{ message }</Text>
        </View>
      ) }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.global.isLoading,
    message: state.global.loadingMessage
  }
}

const ConnectedAppStackNavigator = connect(mapStateToProps, null)(AppStackNavigatorWithSpinner)

export { PAGES_NAMES, ConnectedAppStackNavigator }

const styles = {
  container: {
    flex: 1
  },
  spinnerContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  message: {
    color: '#603695',
    fontWeight: 'bold'
  }
}
