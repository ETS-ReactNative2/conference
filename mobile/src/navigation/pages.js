import { createStackNavigator } from 'react-navigation'
import I18n from '../../locales/i18n'
import FlowPage from '../views/pages/flow/flow-page'
import LoginPage from '../views/pages/login/login-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'

import Agenda from '../views/pages/agenda/agenda'

const PAGES_NAMES = {
  WELCOME_PAGE: 'WELCOME_PAGE',
  FLOW_PAGE: 'FLOW_PAGE',
  LOGIN_PAGE: 'LOGIN_PAGE',
  SIGNUP_PAGE: 'SIGNUP_PAGE'
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

const AppStackNavigator = createStackNavigator({
  WELCOME_PAGE: {
    screen: Agenda,
    navigationOptions: () => ({
      header: null
    }),
  },
  FLOW_PAGE: {
    screen: FlowPage,
    navigationOptions: (props) => ({
      title: I18n.t('flow_page.title'),
      ...FlowPage.navigationOptions(props),
      ...commonNavBarStyle
    })
  },
  LOGIN_PAGE: {
    screen: LoginPage,
    navigationOptions: () => ({
      title: I18n.t('login_page.title'),
      ...commonNavBarStyle
    }),
  },
  SIGNUP_PAGE: {
    screen: SignupPage,
    navigationOptions: () => ({
      title: I18n.t('signup_page.title'),
      ...commonNavBarStyle
    }),
  }
})

export { PAGES_NAMES, AppStackNavigator }
