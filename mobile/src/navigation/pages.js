import { Button, Container, Icon, Spinner, Text } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../locales/i18n'
import { navigationService } from '../services'
import DrawerSideBar from '../views/components/drawer-sidebar/drawer-sidebar'
import AgendaPage from '../views/pages/agenda/agenda-page'
import FlowPage from '../views/pages/flow/flow-page'
import { CommonProfileType } from '../views/pages/flow/steps'
import CommonProfileOnboarding from '../views/pages/flow/steps/common-profile-onboarding'
import InvestorPage from '../views/pages/investor/investor-page'
import LoginPage from '../views/pages/login/login-page'
import NotificationsPage from '../views/pages/notifications/notifications-page'
import ProfessionalPage from '../views/pages/professional/professional-page'
import ProjectPage from '../views/pages/project/project-page'
import SearchPage from '../views/pages/search/search-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'

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
  PROFILE_TYPE_PAGE: 'PROFILE_TYPE_PAGE'
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

const DrawerStack = createDrawerNavigator({
  AGENDA_PAGE: { screen: AgendaPage },
  NOTIFICATIONS_PAGE: { screen: NotificationsPage }
}, {
  contentComponent: props => <DrawerSideBar { ...props } />
})

const DrawerNavigation = createStackNavigator({
  DrawerStack: {
    screen: DrawerStack
  }
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    title: 'Luna Conference',
    ...commonNavBarStyle,
    headerLeft:
      <View style={ { flex: 1 } }>
        <Button transparent onPress={ () => navigation.openDrawer() }>
          <Icon name="menu" style={ { color: '#FFFFFF' } }/>
        </Button>
      </View>
  })
})

const AppStackNavigator = createStackNavigator({
  WELCOME_PAGE: {
    screen: WelcomePage,
    navigationOptions: () => ({
      header: null
    }),
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
  HOME_PAGE: {
    screen: DrawerNavigation,
    navigationOptions: () => ({
      header: null
    })
  },
  INVESTOR_PAGE: {
    screen: InvestorPage,
    navigationOptions: () => ({
      title: I18n.t('investor_page.title'),
      ...commonNavBarStyle
    })
  },
  PROFESSIONAL_PAGE: {
    screen: ProfessionalPage,
    navigationOptions: () => ({
      title: I18n.t('professional_page.title'),
      ...commonNavBarStyle
    })
  },
  PROJECT_PAGE: {
    screen: ProjectPage,
    navigationOptions: () => ({
      title: I18n.t('project_page.title'),
      ...commonNavBarStyle
    })
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
