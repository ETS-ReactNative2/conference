import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card, Content, Container, Form, Label, Icon, Input, Item, Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from '../../../../locales/i18n';

class LoginPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };
  
  handleFieldChange = (e, name) => {
    const value = e.target.value;
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
                <Label>{I18n.t('login_page.email_placeholder')}</Label>
                <Input keyboardType={"email-address"}
                      onChange={ (e) => this.handleFieldChange(e, 'email') }
                      value={this.state.email}/>
              </Item>
              <Item floatingLabel>
                <Icon active name='lock' />
                <Label>{I18n.t('login_page.password_placeholder')}</Label>
                <Input secureTextEntry={true}
                      onChange={ (e) => this.handleFieldChange(e, 'password') }
                      value={this.state.password}/>
              </Item>
            </Form>
            <Button rounded success block style={styles.button} onPress={ this.handleSubmit } >
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