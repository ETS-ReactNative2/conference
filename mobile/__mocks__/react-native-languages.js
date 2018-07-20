jest.mock('react-native-languages', () => {
    return {
        addEventListener: jest.fn()
    }
});