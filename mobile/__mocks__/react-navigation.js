jest.mock('react-navigation', () => {
  return {
    createStackNavigator: () => { return ''},
    createDrawerNavigator: () => { return ''},
    createBottomTabNavigator: () => '',
    Header: {
      HEIGHT: 100
    }

  }
})
