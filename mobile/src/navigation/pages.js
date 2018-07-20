import React from 'react'
import { Button, Icon } from 'native-base'
import { View } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import I18n from '../../locales/i18n'
import FlowPage from '../views/pages/flow/flow-page'
import LoginPage from '../views/pages/login/login-page'
import SearchPage from '../views/pages/search/search-page'
import SignupPage from '../views/pages/signup/signup-page'
import WelcomePage from '../views/pages/welcome/welcome-page'
import AgendaPage from '../views/pages/agenda/agenda-page'
import DrawerSideBar from '../views/components/drawer-sidebar/drawer-sidebar'

const PAGES_NAMES = {
  WELCOME_PAGE: 'WELCOME_PAGE',
  FLOW_PAGE: 'FLOW_PAGE',
  LOGIN_PAGE: 'LOGIN_PAGE',
  SIGNUP_PAGE: 'SIGNUP_PAGE',
  SEARCH_PAGE: 'SEARCH_PAGE',
  HOME_PAGE: 'HOME_PAGE',
  AGENDA_PAGE: 'AGENDA_PAGE'
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

const DrawerStack = createDrawerNavigator({
  AGENDA_PAGE: { screen: AgendaPage }
}, {
  contentComponent: props => <DrawerSideBar {...props} />
})

const DrawerNavigation = createStackNavigator({
  DrawerStack: {
    screen: DrawerStack
}}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    title: 'Luna Conference',
    ...commonNavBarStyle,
    headerLeft:
    <View style={{flex: 1}}>
      <Button transparent onPress={() => navigation.openDrawer()}>
        <Icon name="menu" style={{ color: "#FFFFFF" }} />
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
  FLOW_PAGE: {
    screen: FlowPage,
    navigationOptions: () => ({
      title: I18n.t('flow_page.title'),
      ...commonNavBarStyle
    })
  },
  SEARCH_PAGE: {
    screen: SearchPage,
    navigationOptions: (props) => ({
      title: I18n.t('search_page.title'),
      ...SearchPage.navigationOptions(props),
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
  },
  HOME_PAGE: {
    screen: DrawerNavigation,
    navigationOptions: () => ({
      header: null
    })
  },
})

export { PAGES_NAMES, AppStackNavigator }
