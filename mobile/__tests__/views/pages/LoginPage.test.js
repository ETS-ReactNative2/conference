import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { Button, Input } from 'native-base'
import Adapter from 'enzyme-adapter-react-16';
import LoginPage from '../../../src/views/pages/login/login-page'

import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter()})

it('renders without crashing', () => {
  const navigation = { navigate: jest.fn() }
  const callbackMock = jest.fn()
  const rendered = renderer.create(<LoginPage navigation={navigation} onSubmit={ callbackMock }/>).toJSON()
  expect(rendered).toBeTruthy()
});

it('renders login button as disabled by default', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock }/>)
    const loginButton = wrapper.find(Button).first();
    const loginButtonProps = loginButton.props();
    expect(loginButtonProps.disabled).toBeTruthy();
});

it('onSubmit callback should not be called when button is disabled', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock }/>)
    const loginButton = wrapper.find(Button).first()
    const loginButtonProps = loginButton.props()
    loginButtonProps.onPress()
    expect(callbackMock.mock.calls.length).toBe(0)
});

it('renders login button as disabled when email is incorrect and password is correct', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock }/>)
    // Set Email address
    wrapper.find(Input).first().props().onChangeText("test@.com")
    // Set Password
    wrapper.find(Input).at(1).props().onChangeText("12345678")
    wrapper.update()
    const loginButton = wrapper.find(Button).first()
    const loginButtonProps = loginButton.props()
    expect(loginButtonProps.disabled).toBeTruthy()
});

it('renders login button as disabled when email is corrent and passowrd is incorrect', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock }/>)
    // Set Email address
    wrapper.find(Input).first().props().onChangeText("test@test.com")
    // Set Password
    wrapper.find(Input).at(1).props().onChangeText("12345")
    wrapper.update()
    const loginButton = wrapper.find(Button).first()
    const loginButtonProps = loginButton.props()
    expect(loginButtonProps.disabled).toBeTruthy()
});

it('renders login button as enabled when validation passes', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock }/>)
    // Set Email address
    wrapper.find(Input).first().props().onChangeText("test@test.com")
    // Set Password
    wrapper.find(Input).at(1).props().onChangeText("12345678")
    wrapper.update()
    const loginButton = wrapper.find(Button).first()
    const loginButtonProps = loginButton.props()
    expect(loginButtonProps.disabled).toBeFalsy()
});

it('onSubmit callback should be called when button is enabled', () => {
    const navigation = { navigate: jest.fn() }
    const callbackMock = jest.fn()
    const wrapper = shallow(<LoginPage navigation={navigation} onSubmit={ callbackMock }/>)
    // Set Email address
    wrapper.find(Input).first().props().onChangeText("test@test.com")
    // Set Password
    wrapper.find(Input).at(1).props().onChangeText("12345678")
    wrapper.update()
    const loginButton = wrapper.find(Button).first()
    const loginButtonProps = loginButton.props()
    loginButtonProps.onPress()
    expect(callbackMock.mock.calls.length).toBe(1)
});