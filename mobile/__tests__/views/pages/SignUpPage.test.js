import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { batchStoreEnhancer, batchMiddleware } from 'redux-batch-enhancer'

import { SignupPage } from '../../../src/views/pages/signup/signup-page'
import InputValidated from '../../../src/views/design/input-validated'
import { BlackButton } from '../../../src/views/design/buttons'

Enzyme.configure({ adapter: new Adapter() })

const initialState = {
  auth: {
    signup: {
      isServerError: false,
      isEmailFieldError: false,
      errorMessage: ''
    }
  }
}
const middlewares = [batchMiddleware, thunk]
const mockStore = configureStore(middlewares, batchStoreEnhancer);
let store;

describe('SignUpPage Component', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    store = mockStore({
        signUp: initialState
    })
  })

  it('renders without crashing', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } store={store}/>)
    expect(wrapper).not.toBe(null)
  })

  it('renders signup button as enabled by default', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } store={store}/>)
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    expect(signUpButtonProps.disabled).toBeFalsy()
  })

  it('signup button should not change navigation when button is disabled', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } store={store}/>)
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    signUpButtonProps.onPress()
    expect(navigation.navigate.mock.calls.length).toBe(0)
  })

  it('renders signup button as disabled when email and phone number is correct but password is not', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } store={store}/>)
    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@test.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('123')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    signUpButtonProps.onPress()
    wrapper.update()
    const signUpButtonPropsAfterUpdate = wrapper.find(BlackButton).first().props()
    expect(signUpButtonPropsAfterUpdate.disabled).toBeTruthy()
  })

  it('renders signup button as enabled when validation passes', () => {
    const singupMock = jest.fn()
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } signup={ singupMock } store={store}/>)
    // Click SignUp Button for the first time to make validation fail and make button disabled
    const signUpButtonBeforeValidation = wrapper.find(BlackButton).first()
    const signUpButtonBeforeValidationProps = signUpButtonBeforeValidation.props()
    signUpButtonBeforeValidationProps.onPress()
    wrapper.update()
    const signUpButtonAfterValidationProps = wrapper.find(BlackButton).first().props()
    expect(signUpButtonAfterValidationProps.disabled).toBeTruthy()

    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@test.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('12345678')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    signUpButtonProps.onPress()
    wrapper.update()
    const signUpButtonPropsAfterUpdateProps = wrapper.find(BlackButton).first().props()
    expect(signUpButtonPropsAfterUpdateProps.disabled).toBeFalsy()
  })

  it('signup button should change navigation to FLOW_PAGE when button is enabled and pressed', () => {
    const navigation = { navigate: jest.fn() }
    const singupMock = jest.fn()
    const wrapper = shallow(<SignupPage navigation={ navigation } store={store} signup={singupMock}/>)
    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@test.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('12345678')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    // Click Button
    signUpButtonProps.onPress()
    expect(singupMock.mock.calls.length).toBe(1)
  })
})
