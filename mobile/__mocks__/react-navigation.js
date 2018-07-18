jest.mock('react-navigation', () => {
    return {
        createStackNavigator: () => {return ''}
    }
  });