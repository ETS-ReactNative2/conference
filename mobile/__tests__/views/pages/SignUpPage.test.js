import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PAGES_NAMES } from '../../../src/navigation'
import { SignupPage } from '../../../src/views/pages/signup/signup-page'
import InputValidated from '../../../src/views/design/input-validated'
import { BlackButton } from '../../../src/views/design/buttons'

Enzyme.configure({ adapter: new Adapter() })

describe('SignUpPage Component', () => {
  jest.useFakeTimers();

  it('renders without crashing', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } signup={jest.fn()}/>)
    expect(wrapper).not.toBe(null)
  })
  
  it('renders signup button as disabled by default', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } signup={jest.fn()}/>)
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    expect(signUpButtonProps.disabled).toBeTruthy()
  })
  
  it('signup button should not change navigation when button is disabled', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignupPage navigation={ navigation } signup={jest.fn()}/>)
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    signUpButtonProps.onPress()
    expect(navigation.navigate.mock.calls.length).toBe(0)
  })
  
  it('renders signup button as disabled when email and password is correct but phone number is not', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<SignupPage navigation={ navigation } onSubmit={ callbackMock } signup={jest.fn()}/>)
    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@test.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('12345678')
    // Set Phone Number
    wrapper.find(InputValidated).at(2).props().onChangeText('123')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    expect(signUpButtonProps.disabled).toBeTruthy()
  })
  
  it('renders signup button as disabled when email and phone number is correct but password is not', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<SignupPage navigation={ navigation } onSubmit={ callbackMock } signup={jest.fn()}/>)
    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@test.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('123')
    // Set Phone Number
    wrapper.find(InputValidated).at(2).props().onChangeText('123456789')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    expect(signUpButtonProps.disabled).toBeTruthy()
  })
  
  it('renders signup button as disabled when phone number and password is correct but email is not', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<SignupPage navigation={ navigation } onSubmit={ callbackMock } signup={jest.fn()}/>)
    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('12345678')
    // Set Phone Number
    wrapper.find(InputValidated).at(2).props().onChangeText('123456789')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    expect(signUpButtonProps.disabled).toBeTruthy()
  })
  
  it('renders signup button as enabled when validation passes', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<SignupPage navigation={ navigation } onSubmit={ callbackMock } signup={jest.fn()}/>)
    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@test.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('12345678')
    // Set Phone Number
    wrapper.find(InputValidated).at(2).props().onChangeText('123456789')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    expect(signUpButtonProps.disabled).toBeFalsy()
  })
  
  it('signup button should change navigation to FLOW_PAGE when button is enabled and pressed', async () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const signupActionMock = jest.fn(() => {return Promise.resolve()})
    const wrapper = shallow(<SignupPage navigation={ navigation } onSubmit={ callbackMock } signup={signupActionMock}/>)
    // Set Email address
    wrapper.find(InputValidated).first().props().onChangeText('test@test.com')
    // Set Password
    wrapper.find(InputValidated).at(1).props().onChangeText('12345678')
    // Set Phone Number
    wrapper.find(InputValidated).at(2).props().onChangeText('123456789')
    wrapper.update()
    const signUpButton = wrapper.find(BlackButton).first()
    const signUpButtonProps = signUpButton.props()
    // Click Button
    await signUpButtonProps.onPress()
    expect(signUpButtonProps.disabled).toBeFalsy()
    expect(navigation.navigate.mock.calls.length).toBe(1)
    expect(navigation.navigate.mock.calls[ 0 ][ 0 ]).toBe(PAGES_NAMES.FLOW_PAGE)
  })
})
