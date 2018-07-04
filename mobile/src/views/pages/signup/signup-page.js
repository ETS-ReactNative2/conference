import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card, Content, Container, Form, Icon, Label, Input, Item, Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from '../../../../locales/i18n';

class SignupPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phone: ''
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };
  
  handleFieldChange = (e, name) => {
    const value = e.target ? e.target.value : e;
    this.setState({
      [ name ]: value
    })
  };

  
  render() {
    return (
      <Container>
        <Content padder>
        <Card style={ { padding: 8 } }>
            <Form>
              <Item floatingLabel>
                <Icon active name='email' type='MaterialCommunityIcons' />
                <Label>{I18n.t('signup_page.email_placeholder')}</Label>
                <Input keyboardType={"email-address"}
                      onChange={ (e) => this.handleFieldChange(e, 'email') }
                      value={this.state.email}/>
              </Item>
              <Item floatingLabel>
                <Icon active name='lock' />
                <Label>{I18n.t('signup_page.password_placeholder')}</Label>
                <Input secureTextEntry={true}
                      onChange={ (e) => this.handleFieldChange(e, 'password') }
                      value={this.state.password}/>
              </Item>
              <Item floatingLabel>
                <Icon active name='phone' type='MaterialCommunityIcons' />
                <Label>{I18n.t('signup_page.phone_placeholder')}</Label>
                <Input keyboardType={"phone-pad"}
                      onChange={ (e) => this.handleFieldChange(e, 'phone') }
                      value={this.state.phome}
                />
              </Item>
            </Form>
            <Button rounded success block style={styles.button} onPress={ this.handleSubmit } >
              <Text>{I18n.t('signup_page.button')}</Text>
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
  },
  pickerPlaceHolder: {
    color: '#bfc6ea'
  }
});

SignupPage.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default SignupPage;