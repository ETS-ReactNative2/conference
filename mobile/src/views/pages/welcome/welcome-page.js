import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { Button, Text } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from '../../../../locales/i18n';
import { PAGES_NAMES } from '../../../navigation';

class WelcomePage extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require('../../../../public/images/woman.jpg')}
        style={styles.container}
        blurRadius={3}
      >
        <View style={styles.content}>
          <View style={styles.logo}>
            <Image source={require('../../../../public/images/logo/logo.png')} />
            <Text style={styles.logoTitle} adjustsFontSizeToFit>{I18n.t('welcome_page.app_description')}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button style={styles.button} onPress={() => {navigate(PAGES_NAMES.LOGIN_PAGE)}}>
              <Text style={styles.buttonText}>{I18n.t('welcome_page.login')}</Text>
            </Button>
            <Button style={styles.button} onPress={() => {navigate(PAGES_NAMES.SIGNUP_PAGE)}}>
              <Text style={styles.buttonText}>{I18n.t('welcome_page.signup')}</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '1rem'
  },
  button: {
    marginBottom: '1rem',
    backgroundColor: '#603695',
    width: '100%',
    maxWidth: 200,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    paddingTop: '2rem',
  },
  logo: {
    paddingTop: '1rem',
    paddingRight: '1rem',
    paddingLeft: '1rem',
    paddingBottom: '1rem',
    flex: 1,
    alignItems: 'center',
  },
  logoTitle: {
    fontSize: '1rem',
    marginTop: '2rem',
    fontWeight: '400',
    letterSpacing: '0.08rem',
    color: 'white',
  }
});

export default WelcomePage;