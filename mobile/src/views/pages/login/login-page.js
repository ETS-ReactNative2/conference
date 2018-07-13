import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card, Content, Container, Form, Label, Icon, Input, Item, Text } from 'native-base';
import validator from 'validator';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from '../../../../locales/i18n';

class LoginPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isFormValid: false
    }
  }

  validateForm = () => {
    const isEmailValid = validator.isEmail(this.state.email)
    const isPasswordValid = validator.isLength(this.state.password, { min: 8, max: undefined })
    const isFormValid = isEmailValid && isPasswordValid
    this.setState( {isFormValid} )
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
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
        <Card style={ { padding: 8 } }>
            <Form>
              <Item floatingLabel>
                <Icon active name='email' type='MaterialCommunityIcons' />
                <Label>{I18n.t('login_page.email_placeholder')}</Label>
                <Input keyboardType={"email-address"}
                      onChangeText={ newValue => this.handleFieldChange(newValue, 'email') }
                      value={this.state.email}/>
              </Item>
              <Item floatingLabel>
                <Icon active name='lock' />
                <Label>{I18n.t('login_page.password_placeholder')}</Label>
                <Input secureTextEntry={true}
                      onChangeText={ newValue => this.handleFieldChange(newValue, 'password') }
                      value={this.state.password}/>
              </Item>
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

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default LoginPage;