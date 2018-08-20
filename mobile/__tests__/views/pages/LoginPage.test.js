import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import LoginPage from '../../../src/views/pages/login/login-page'
import { globalActionsTypes } from '../../../src/global'
import { signUpActionsTypes } from '../../../src/signup'
import InputValidated from '../../../src/views/design/input-validated'
import { BlackButton } from '../../../src/views/design/buttons'

Enzyme.configure({ adapter: new Adapter()})

const initialState = {
    auth: {
        login: {
          isError: false,
          errorMessage: ''
        }
    }
}
const middlewares = [thunk]
const mockStore = configureStore(middlewares);
let store;

describe('LoginPage Component', () => {
    jest.useFakeTimers();

    beforeEach(() => {
        store = mockStore({
            signUp: initialState
        })
    })

    it('renders without crashing', () => {
        const navigation = { navigate: jest.fn() }
        const callbackMock = jest.fn()
        const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
        expect(wrapper).not.toBe(null)
      });
      
      it('renders login button as disabled by default', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          const loginButton = wrapper.find(BlackButton).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeTruthy()
      });
      
      it('onSubmit callback should not be called when button is disabled', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          const loginButton = wrapper.find(BlackButton).first()
          const loginButtonProps = loginButton.props()
          loginButtonProps.onPress()
          expect(callbackMock.mock.calls.length).toBe(0)
      });
      
      it('renders login button as disabled when email is incorrect and password is correct', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(InputValidated).first().props().onChangeText("test@.com")
          // Set Password
          wrapper.find(InputValidated).at(1).props().onChangeText("12345678")
          wrapper.update()
          const loginButton = wrapper.find(BlackButton).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeTruthy()
      });
      
      it('renders login button as disabled when email is corrent and passowrd is incorrect', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(InputValidated).first().props().onChangeText("test@test.com")
          // Set Password
          wrapper.find(InputValidated).at(1).props().onChangeText("12345")
          wrapper.update()
          const loginButton = wrapper.find(BlackButton).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeTruthy()
      });
      
      it('renders login button as enabled when validation passes', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(InputValidated).first().props().onChangeText("test@test.com")
          // Set Password
          wrapper.find(InputValidated).at(1).props().onChangeText("12345678")
          wrapper.update()
          const loginButton = wrapper.find(BlackButton).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeFalsy()
      });
      
      it('onSubmit callback should be called when button is enabled', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(InputValidated).first().props().onChangeText("test@test.com")
          // Set Password
          wrapper.find(InputValidated).at(1).props().onChangeText("12345678")
          wrapper.update()
          const loginButton = wrapper.find(BlackButton).first()
          const loginButtonProps = loginButton.props()
          loginButtonProps.onPress()
          const expectedActions = [{
              payload: [{
                  type: signUpActionsTypes.CLEAR_LOGIN_USER_ERROR
              }, {
                  type: globalActionsTypes.SET_LOADING,
                  data: {
                    message: "Mocked translation"
                }
            }],
            type: "ENHANCED_BATCHING.BATCH"
          }]
          expect(store.getActions()).toEqual(expectedActions)
      });
})
