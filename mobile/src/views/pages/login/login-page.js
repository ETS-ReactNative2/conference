import React from 'react'
import { View } from 'react-native'
import { Content, Container, Text } from 'native-base'
import { connect } from 'react-redux'
import validator from 'validator'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import { signUpActions } from '../../../signup'
import { SafeAreaView } from 'react-navigation'
import Header from '../../components/header/header'
import InputValidated from '../../design/input-validated'
import BlackLogo from '../../../assets/logos/logo-black.png'
import { BlackButton, OutlineBlackButton } from '../../design/buttons'
import { PAGES_NAMES } from '../../../navigation/pages'

class LoginPage extends React.Component {
  constructor (props) {
    super(props);
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
    this.setState( {isFormValid} )
  };

  handleSubmit = () => {
    if (this.state.isFormValid) {
      this.props.loginUser(this.state.email, this.state.password)
    }
  };

  handleFieldChange = (newValue, name) => {
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}} forceInset={{top: 'always'}}>
        <Container>
          <Content style={styles.mainContainer}>
            <Header title={ I18n.t('login_page.title') } rightIconSource={BlackLogo} />
            <View style={styles.contentContainer}>
              <View style={styles.inputContainer}>
                <InputValidated value={ this.state.email }
                        isError={!this.validateEmail(this.state.email)}
                        errorMessage={I18n.t('common.errors.incorrect_email')}
                        keyboardType='email-address'
                        labelText={ I18n.t('login_page.email_placeholder') }
                        placeholder="email@domain.com"
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, 'email') }/>
                </View>
                <InputValidated value={ this.state.password }
                                isSecure
                                isError={!this.validatePassword(this.state.password)}
                                errorMessage={I18n.t('common.errors.incorrect_password')}
                                labelText={ I18n.t('login_page.password_placeholder') }
                                placeholder='********'
                                onChangeText={ (newValue) => this.handleFieldChange(newValue, 'password') }/>
                <View style={styles.button}>
                  <BlackButton
                    disabled={ !this.state.isFormValid }
                    text={ I18n.t('login_page.button')  }
                    onPress={ () => this.handleSubmit() } />
                </View>
                <View style={styles.textStyling}>
                  <Text>{ I18n.t('login_page.change_mind')}</Text>
                  <Text onPress={() => this.props.navigation.navigate(PAGES_NAMES.SIGNUP_PAGE)} style={styles.signup}>{I18n.t('login_page.signup')}</Text>
                </View>
                <Text style={styles.connectWith}>{I18n.t('login_page.connect_with')}</Text>
                <View style={{paddingBottom: 20}}>
                  <OutlineBlackButton
                    icon={'md-paper-plane'}
                    text={ I18n.t('login_page.connect_with_telegram')  }
                    onPress={() => {}} />
                </View>
                <View style={styles.policyAndConditionsWrapper}>
                  <Text style={styles.policyAndConditions}>{ I18n.t('login_page.privacy_policy') } &amp; { I18n.t('login_page.terms_and_conditions')}</Text>
                </View>
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    );
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
  signup: {
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
});


const mapStateToProps = state => {
  return {
    isError: state.signUp.auth.login.isError,
    errorMessage: state.signUp.auth.login.errorMessage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(signUpActions.login(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
