import { Container, Content, Form, Text } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../locales/i18n'
import { globalActions } from '../../../global'
import { PAGES_NAMES } from '../../../navigation/pages'
import { signUpActions } from '../../../signup'
import Header from '../../components/header/header'
import InputValidated from '../../design/input-validated'
import BlackLogo from '../../../assets/logos/logo-black.png'
import { BlackButton, OutlineBlackButton } from '../../design/buttons'
import Alert from '../../components/alert/alert'

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
    if (this.props.isEmailFieldError || this.props.isServerError) {
      this.props.clearErrors();
    }
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  }

  handleSubmit = () => {
    const { email, password, phone } = this.state
    const { signup } = this.props
    if (this.state.isFormValid) {
      signup({email, password, phone})
    }
  }

  render () {
    const isEmailFieldError = !this.validateEmail(this.state.email) || this.props.isEmailFieldError;
    const emailErrorMessage = this.props.isEmailFieldError ? this.props.errorMessage : I18n.t('common.errors.incorrect_email');
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}} forceInset={{top: 'always'}}>
        <Container>
          <Content style={styles.mainContainer}>
            <Header title={ I18n.t('signup_page.title') } rightIconSource={BlackLogo} />
            <View style={styles.contentContainer}>
              {this.props.isServerError && (
                <Alert color="error" message={this.props.errorMessage} />
              )}
              <View style={styles.inputContainer}>
                <InputValidated value={ this.state.email }
                      isError={isEmailFieldError}
                      errorMessage={emailErrorMessage}
                      keyboardType='email-address'
                      labelText={ I18n.t('signup_page.email_placeholder').toUpperCase() }
                      placeholder="email@domain.com"
                      onChangeText={ (newValue) => this.handleFieldChange(newValue, 'email') }/>
              </View>
              <View style={styles.inputContainer}>
                <InputValidated value={ this.state.password }
                      isSecure
                      isError={!this.validatePassword(this.state.password)}
                      errorMessage={I18n.t('common.errors.incorrect_password')}
                      labelText={ I18n.t('signup_page.password_placeholder').toUpperCase() }
                      placeholder='********'
                      onChangeText={ (newValue) => this.handleFieldChange(newValue, 'password') }/>
              </View>
              <InputValidated value={ this.state.phone }
                    keyboardType='phone-pad'
                    isError={!this.validatePhoneNumber(this.state.phone)}
                    errorMessage={I18n.t('common.errors.incorrect_phone_number')}
                    labelText={ I18n.t('signup_page.phone_placeholder') }
                    placeholder="+48123456789"
                    onChangeText={ (newValue) => this.handleFieldChange(newValue, 'phone') }/>
              <View style={styles.button}>
                <BlackButton
                  disabled={ !this.state.isFormValid }
                  text={ I18n.t('signup_page.button')  }
                  onPress={ () => this.handleSubmit() } />
              </View>
              <View style={styles.textStyling}>
                <Text>{ I18n.t('signup_page.change_mind')}</Text>
                <Text onPress={() => this.props.navigation.navigate(PAGES_NAMES.LOGIN_PAGE)} style={styles.login}>{I18n.t('signup_page.login')}</Text>
              </View>
              <Text style={styles.connectWith}>{I18n.t('signup_page.connect_with')}</Text>
              <View style={{paddingBottom: 20}}>
                <OutlineBlackButton
                  icon={'md-paper-plane'}
                  text={ I18n.t('signup_page.connect_with_telegram')  }
                  onPress={() => {}} />
              </View>
              <View style={styles.policyAndConditionsWrapper}>
                  <Text style={styles.policyAndConditions}>{ I18n.t('signup_page.privacy_policy') } &amp; { I18n.t('signup_page.terms_and_conditions')}</Text>
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
    marginTop: 40
  },
  mainContainer: {
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    marginRight: 15
  },
  textStyling: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  inputContainer: {
    marginBottom: 20
  },
  button: {
    marginTop: 30,
    flex: 0
  },
  login: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textDecorationLine: 'underline',
    marginLeft: 20
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
    textDecorationLine: 'underline'
  },
  connectWith: {
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Montserrat-ExtraLight'
  }
})

const mapStateToProps = state => {
  return {
    isServerError: state.signUp.auth.signup.isServerError,
    isEmailFieldError: state.signUp.auth.signup.isEmailFieldError,
    errorMessage: state.signUp.auth.signup.errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: data => dispatch(signUpActions.signup(data)),
    showLoader: message => dispatch(globalActions.setGlobalLoading(message)),
    hideLoader: () => dispatch(globalActions.unsetGlobalLoading()),
    clearErrors: () => dispatch(signUpActions.clearSignUpError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
