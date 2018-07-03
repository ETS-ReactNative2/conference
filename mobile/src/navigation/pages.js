import { createStackNavigator } from 'react-navigation'
import I18n from '../../locales/i18n'
import FlowPage from '../views/pages/flow/flow-page'
import LoginPage from '../views/pages/login/login-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'

const PAGES_NAMES = {
  FLOW_PAGE: 'FLOW_PAGE',
  WELCOME_PAGE: 'WELCOME_PAGE',
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
  FLOW_PAGE: {
    screen: FlowPage,
    navigationOptions: () => ({
      title: I18n.t('flow_page.title'),
      ...commonNavBarStyle
    })
  },
  WELCOME_PAGE: {
    screen: WelcomePage,
    navigationOptions: () => ({
      header: null
    }),
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
