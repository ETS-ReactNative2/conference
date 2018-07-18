jest.mock('react-native-i18n', () => {
    return {
        t: jest.fn()
    }
  });