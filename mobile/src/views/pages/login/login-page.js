import { Container, Content, Text } from 'native-base'
import React from 'react'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../locales/i18n'
import PoweredLuna from '../../../assets/logos/login_logo.png'
import BlackLogo from '../../../assets/logos/ico_black.png'
import { PAGES_NAMES } from '../../../navigation/pages'
import { signUpActions } from '../../../signup'
import Header from '../../components/header/header'
import { BlackButton } from '../../design/buttons'
import InputValidated from '../../design/input-validated'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isFormValid: false
    }
  }

  validateEmail = (email) => {
    return validator.isEmail(email)
  }

  validatePassword = (password) => {
    return validator.isLength(password, { min: 8, max: undefined })
  }

  validateForm = () => {
    const isEmailValid = this.validateEmail(this.state.email)
    const isPasswordValid = this.validatePassword(this.state.password)
    const isFormValid = isEmailValid && isPasswordValid
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    if (this.state.isFormValid) {
      this.props.loginUser(this.state.email, this.state.password)
    }
  }

  handleFieldChange = (newValue, name) => {
    if (this.props.isError) {
      this.props.clearErrors()
    }
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  }

  render () {
    const isEmailFieldError = !this.validateEmail(this.state.email) || this.props.isError
    const isPasswordFieldError = !this.validatePassword(this.state.password) || this.props.isError
    const invalidCredentialsErrorMessage = I18n.t('common.errors.invalid_credentials')
    const emailFieldErrorMessage = this.props.isError ? invalidCredentialsErrorMessage : I18n.t(
      'common.errors.incorrect_email')
    const passwordFieldErrorMessage = this.props.isError ? invalidCredentialsErrorMessage : I18n.t(
      'common.errors.incorrect_password')
    return (
      <SafeAreaView style={ { flex: 1, backgroundColor: '#FFFFFF' } } forceInset={ { top: 'always' } }>
        <Container>
          <Content>
            <Header
              titleStyle={ { color: 'black' } }
              title={ I18n.t('login_page.title') }
              rightIconSource={ BlackLogo }/>
            <View style={ styles.contentContainer }>
              <View style={ styles.inputContainer }>
                <InputValidated value={ this.state.email }
                                isError={ isEmailFieldError }
                                errorMessage={ emailFieldErrorMessage }
                                keyboardType='email-address'
                                labelText={ I18n.t('login_page.email_placeholder').toUpperCase() }
                                placeholder="email@domain.com"
                                onChangeText={ (newValue) => this.handleFieldChange(newValue, 'email') }/>
              </View>
              <View style={ styles.inputContainer }>
                <InputValidated value={ this.state.password }
                                isSecure
                                isError={ isPasswordFieldError }
                                errorMessage={ passwordFieldErrorMessage }
                                labelText={ I18n.t('login_page.password_placeholder').toUpperCase() }
                                placeholder='********'
                                onChangeText={ (newValue) => this.handleFieldChange(newValue, 'password') }/>
              </View>
              <View style={ styles.lunaContainer }>
                <Image style={ { width: 123, height: 52 } } source={ PoweredLuna }/>
              </View>
              <View style={ styles.button }>
                <BlackButton
                  disabled={ !this.state.isFormValid }
                  text={ I18n.t('login_page.button') }
                  onPress={ () => this.handleSubmit() }/>
              </View>
              <View style={ styles.textStyling }>
                <Text>{ I18n.t('login_page.change_mind') }</Text>
                <Text onPress={ () => this.props.navigation.navigate(PAGES_NAMES.SIGNUP_PAGE) }
                      style={ styles.signup }>{ I18n.t('login_page.signup') }</Text>
              </View>
              <View style={ styles.policyAndConditionsWrapper }>
                <Text style={ styles.policyAndConditions }
                      onPress={ () => this.props.navigation.navigate(PAGES_NAMES.PRIVACY_POLICY_PAGE) }>
                  { I18n.t('login_page.privacy_policy') }
                </Text>
                <Text style={ styles.policyAndConditions }>
                  &amp;
                </Text>
                <Text style={ styles.policyAndConditions }
                      onPress={ () => this.props.navigation.navigate(PAGES_NAMES.TERMS_OF_SERVICE_PAGE) }>
                  { I18n.t('login_page.terms_and_conditions') }
                </Text>
              </View>
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    )
  }
}

const styles = EStyleSheet.create({
  contentContainer: {
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24
  },
  textStyling: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 24
  },
  inputContainer: {
    marginBottom: 24
  },
  button: {
    marginTop: 32,
    flex: 0
  },
  login: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginLeft: 16
  },
  lunaContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16
  },
  signup: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginLeft: 16
  },
  policyAndConditionsWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  policyAndConditions: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginRight: 8
  }
})

const mapStateToProps = state => {
  return {
    isError: state.signUp.auth.login.isError,
    errorMessage: state.signUp.auth.login.errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(signUpActions.login(email, password, PAGES_NAMES.HOME_PAGE)),
    clearErrors: () => dispatch(signUpActions.clearLoginError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
