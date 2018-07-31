import React from 'react'
import { View } from 'react-native'
import { Button, Card, Content, Container, Form, Text } from 'native-base'
import { connect } from 'react-redux'
import validator from 'validator'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import ValidatedInput from '../../components/validated-input/validated-input'
import ErrorMessage from '../../components/error-message/error-message'
import { signUpActions } from '../../../signup';

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
      <Container>
        <Content padder>
          {this.props.isError && this.props.errorMessage && (
            <ErrorMessage message={this.props.errorMessage} onRetry={this.handleSubmit} />
          )}
        <Card style={ { padding: 8 } }>
            <Form>
              <ValidatedInput floatingLabel
                              iconProps={{active: true, name: 'email', type:'MaterialCommunityIcons'}}
                              value={ this.state.email }
                              keyboardType={ 'email-address' }
                              labelText={I18n.t('login_page.email_placeholder')}
                              isError={!this.validateEmail(this.state.email)}
                              errorMessage={I18n.t('common.errors.incorrect_email')}
                              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'email')} />
              <ValidatedInput floatingLabel
                              iconProps={{active: true, name: 'lock'}}
                              value={ this.state.password }
                              secureTextEntry={ true }
                              labelText={I18n.t('login_page.password_placeholder')}
                              isError={!this.validatePassword(this.state.password)}
                              errorMessage={I18n.t('common.errors.incorrect_password')}
                              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'password')} />
            </Form>
            <Button
              success
              rounded
              block
              disabled={!this.state.isFormValid}
              style={styles.button}
              onPress={ this.handleSubmit } >
              <Text>{I18n.t('login_page.button')}</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  button: {
    marginTop: 30
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
