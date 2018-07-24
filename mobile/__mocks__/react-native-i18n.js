jest.mock('react-native-i18n', () => {
    return {
        t: () => { return 'Mocked translation' }
    }
  });