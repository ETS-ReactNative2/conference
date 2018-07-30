import { Button, Card, Container, Content, Form, Text } from 'native-base'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../locales/i18n'
import { globalActions } from '../../../global'
import { PAGES_NAMES } from '../../../navigation/pages'
import { signUpActions } from '../../../signup'
import ValidatedInput from '../../components/validated-input/validated-input'

export class SignupPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      phone: '',
      isFormValid: false
    }
  }

  validateEmail = (email) => {
    return validator.isEmail(email)
  }

  validatePassword = (password) => {
    return validator.isLength(password, { min: 8, max: undefined })
  }

  validatePhoneNumber = (phoneNumber) => {
    return validator.isMobilePhone(phoneNumber, 'any') && validator.isLength(phoneNumber, { min: 4, max: 20 })
  }

  validateForm = () => {
    const isEmailValid = this.validateEmail(this.state.email)
    const isPasswordValid = this.validatePassword(this.state.password)
    const isPhoneValid = this.validatePhoneNumber(this.state.phone)
    const isFormValid = isEmailValid && isPasswordValid && isPhoneValid
    this.setState({ isFormValid })
  }

  handleFieldChange = (newValue, name) => {
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  }

  handleSubmit = async () => {
    const { email, password, phone } = this.state
    const { signup, navigation } = this.props
    if (this.state.isFormValid) {
      try {
        await signup({
          email, password, phone
        })
        navigation.navigate(PAGES_NAMES.FLOW_PAGE)
      } catch (err) {
        console.error(err)
      }
    }
  }

  render () {
    return (
      <Container>
        <Content padder>
          <Card style={ { padding: 8 } }>
            <Form>
              <ValidatedInput floatingLabel
                              iconProps={ { active: true, name: 'email', type: 'MaterialCommunityIcons' } }
                              value={ this.state.email }
                              keyboardType={ 'email-address' }
                              labelText={ I18n.t('signup_page.email_placeholder') }
                              isError={ !this.validateEmail(this.state.email) }
                              errorMessage={ I18n.t('common.errors.incorrect_email') }
                              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'email') }/>
              <ValidatedInput floatingLabel
                              iconProps={ { active: true, name: 'lock' } }
                              value={ this.state.password }
                              secureTextEntry={ true }
                              labelText={ I18n.t('signup_page.password_placeholder') }
                              isError={ !this.validatePassword(this.state.password) }
                              errorMessage={ I18n.t('common.errors.incorrect_password') }
                              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'password') }/>
              <ValidatedInput floatingLabel
                              iconProps={ { active: true, name: 'phone', type: 'MaterialCommunityIcons' } }
                              value={ this.state.phone }
                              keyboardType={ 'phone-pad' }
                              labelText={ I18n.t('signup_page.phone_placeholder') }
                              isError={ !this.validatePhoneNumber(this.state.phone) }
                              errorMessage={ I18n.t('common.errors.incorrect_phone_number') }
                              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'phone') }/>
            </Form>
            <Button
              success
              rounded
              block
              disabled={ !this.state.isFormValid }
              style={ styles.button }
              onPress={ () => this.handleSubmit() }>
              <Text>{ I18n.t('signup_page.button') }</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  button: {
    marginTop: 30
  },
  pickerPlaceHolder: {
    color: '#bfc6ea'
  }
})

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    signup: data => dispatch(signUpActions.signup(data)),
    showLoader: message => dispatch(globalActions.setGlobalLoading(message)),
    hideLoader: () => dispatch(globalActions.unsetGlobalLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
