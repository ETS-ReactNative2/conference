import { Text } from 'native-base'
import React from 'react'
import { ImageBackground, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import I18n from '../../../../locales/i18n'
import { PAGES_NAMES } from '../../../navigation'
import Header from '../../components/header/header'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import EStyleSheet from 'react-native-extended-stylesheet'
import WelcomePageBackgroundImage from '../../../assets/images/welcome_screen_background.png'
import { BlueButton, OutlineWhiteButton, PrimaryButton } from '../../design/buttons'

class WelcomePage extends React.Component {

  render () {
    const { navigate } = this.props.navigation
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000000'}} forceInset={{top: 'always'}}>
        <ImageBackground source={WelcomePageBackgroundImage} style={styles.imageContainer} blurRadius={1}>
          <LinearGradient style={{flex: 1}} locations={[0,0.4,0.8]} colors={['rgba(0, 0, 0, 1)', 'rgba(255, 0, 92 ,0.8)', 'rgba(156, 26, 73, 0.7)']}>
            <View style={styles.content}>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Header title="BLOCK SEOUL" rightIconSource={WhiteLogo} titleStyle={styles.title} />
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonContainer}>
                    <PrimaryButton
                      text={ I18n.t('welcome_page.login') }
                      onPress={ () => {navigate(PAGES_NAMES.LOGIN_PAGE)} }/>
                  </View>
                  <View style={ styles.buttonContainer }>
                    <OutlineWhiteButton
                      onPress={ () => {navigate(PAGES_NAMES.SIGNUP_PAGE)} }
                      text={ I18n.t('welcome_page.signup') }
                    />
                  </View>
                  <Text style={ styles.connectWith }>{ I18n.t('welcome_page.connect_with') }</Text>
                  <View style={ styles.buttonContainer }>
                    <BlueButton
                      icon={ 'md-paper-plane' }
                      text={ I18n.t('welcome_page.connect_with_telegram') }/>
                  </View>
                </View>
              </ScrollView>
            </View>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = EStyleSheet.create({
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#D8D8D8',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
    marginLeft: 16,
    marginRight: 16
  },
  loginButton: {
    marginBottom: '1rem',
    backgroundColor: '#FE2B77',
    width: '100%',
    maxWidth: 270,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  signUpButton: {
    marginBottom: '1rem',
    width: '100%',
    maxWidth: 270,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  telegramButton: {
    width: '100%',
    maxWidth: 270,
    height: 60,
    backgroundColor: '#33BAE7',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  telegramButtonText: {
    justifyContent: 'center',
    fontSize: 12
  },
  buttonText: {
    justifyContent: 'center'
  },
  connectWith: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginBottom: '1rem'
  }
})

export default WelcomePage
