import React from 'react';
import { View } from 'react-native';
import { Button, Col, Container, Grid, Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from '../../../../locales/i18n';
import { PAGES_NAMES } from '../../../navigation';

class WelcomePage extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container contentContainerStyle={styles.container}>
        <View>
            <Text style={styles.title} adjustsFontSizeToFit>{I18n.t('welcome_page.app_description')}</Text>
        </View>
        <Grid style={{alignItems: 'center'}}>
          <Col>
            <Button style={styles.button} onPress={() => {navigate(PAGES_NAMES.LOGIN_PAGE)}}>
              <Text style={styles.buttonText}>{I18n.t('welcome_page.login')}</Text>
            </Button>
            <Button style={styles.button} onPress={() => {navigate(PAGES_NAMES.SIGNUP_PAGE)}}>
              <Text style={styles.buttonText}>{I18n.t('welcome_page.signup')}</Text>
            </Button>
            <Button transparent style={styles.baseButton} onPress={() => {navigate(PAGES_NAMES.SEARCH_PAGE)}}>
              <Text style={styles.buttonText}>{I18n.t('welcome_page.search')}</Text>
            </Button>
            <Button transparent style={styles.baseButton} onPress={() => {navigate(PAGES_NAMES.FLOW_PAGE)}}>
              <Text style={styles.buttonText}>{I18n.t('welcome_page.flow')}</Text>
            </Button>
            <Button transparent style={styles.baseButton} onPress={() => {navigate(PAGES_NAMES.HOME_PAGE)}}>
              <Text style={styles.buttonText}>{I18n.t('welcome_page.agenda')}</Text>
            </Button>
          </Col>
        </Grid>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  button: {
    marginBottom: '1rem',
    backgroundColor: '$buttonBackground',
    width: '100%',
    maxWidth: 200,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  baseButton: {
    marginBottom: '1rem',
    width: '100%',
    maxWidth: 200,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    alignSelf: 'center',
    fontSize: '1rem',
    marginTop: '2rem',
    fontWeight: '400',
    letterSpacing: '0.08rem'
  }
});

export default WelcomePage;
