import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { Button, Input } from 'native-base'
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import LoginPage from '../../../src/views/pages/login/login-page'
import ValidatedInput from '../../../src/views/components/validated-input/validated-input'
import { globalActionsTypes } from '../../../src/global'

import renderer from 'react-test-renderer'

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
        const rendered = renderer.create(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).toJSON()
        expect(rendered).toBeTruthy()
      });
      
      it('renders login button as disabled by default', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          const loginButton = wrapper.find(Button).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeTruthy()
      });
      
      it('onSubmit callback should not be called when button is disabled', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          const loginButton = wrapper.find(Button).first()
          const loginButtonProps = loginButton.props()
          loginButtonProps.onPress()
          expect(callbackMock.mock.calls.length).toBe(0)
      });
      
      it('renders login button as disabled when email is incorrect and password is correct', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(ValidatedInput).first().props().onChangeText("test@.com")
          // Set Password
          wrapper.find(ValidatedInput).at(1).props().onChangeText("12345678")
          wrapper.update()
          const loginButton = wrapper.find(Button).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeTruthy()
      });
      
      it('renders login button as disabled when email is corrent and passowrd is incorrect', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(ValidatedInput).first().props().onChangeText("test@test.com")
          // Set Password
          wrapper.find(ValidatedInput).at(1).props().onChangeText("12345")
          wrapper.update()
          const loginButton = wrapper.find(Button).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeTruthy()
      });
      
      it('renders login button as enabled when validation passes', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(ValidatedInput).first().props().onChangeText("test@test.com")
          // Set Password
          wrapper.find(ValidatedInput).at(1).props().onChangeText("12345678")
          wrapper.update()
          const loginButton = wrapper.find(Button).first()
          const loginButtonProps = loginButton.props()
          expect(loginButtonProps.disabled).toBeFalsy()
      });
      
      it('onSubmit callback should be called when button is enabled', () => {
          const navigation = { navigate: jest.fn() }
          const callbackMock = jest.fn()
          const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock } store={store}/>).dive()
          // Set Email address
          wrapper.find(ValidatedInput).first().props().onChangeText("test@test.com")
          // Set Password
          wrapper.find(ValidatedInput).at(1).props().onChangeText("12345678")
          wrapper.update()
          const loginButton = wrapper.find(Button).first()
          const loginButtonProps = loginButton.props()
          loginButtonProps.onPress()
          const expectedActions = [{
              type: globalActionsTypes.SET_LOADING,
              data: {
                  message: "Mocked translation"
              }
            }
          ]
          expect(store.getActions()).toEqual(expectedActions)
      });
})