import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { Button } from 'native-base'
import Adapter from 'enzyme-adapter-react-16';
import WelcomePage from '../../../src/views/pages/welcome/welcome-page'
import { PAGES_NAMES } from '../../../src/navigation'

import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter()})

it('renders without crashing', () => {
    const navigation = { navigate: jest.fn() }
    const rendered = renderer.create(<WelcomePage navigation={navigation}/>).toJSON()
    expect(rendered).toBeTruthy()
});

it('clicking login button should change navigation to LOGIN_PAGE', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<WelcomePage navigation={navigation}/>)
    const loginButton = wrapper.find(Button).first()
    const loginButtonProps = loginButton.props()
    // Click Button
    loginButtonProps.onPress()
    expect(navigation.navigate.mock.calls.length).toBe(1)
    expect(navigation.navigate.mock.calls[0][0]).toBe(PAGES_NAMES.LOGIN_PAGE)
});

it('clicking sign up button should change navigation to SIGNUP_PAGE', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<WelcomePage navigation={navigation}/>)
    const signUpButton = wrapper.find(Button).last()
    const signUpButtonProps = signUpButton.props()
    // Click Button
    signUpButtonProps.onPress()
    expect(navigation.navigate.mock.calls.length).toBe(1)
    expect(navigation.navigate.mock.calls[0][0]).toBe(PAGES_NAMES.SIGNUP_PAGE)
});