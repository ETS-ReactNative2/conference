import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import SplashScreen from 'react-native-splash-screen'
import I18n from '../../../../locales/i18n'
import ColorLogo from '../../../assets/logos/conference_logo_welcome_medium.png'
import PoweredLuna from '../../../assets/logos/powered_luna.png'
import { PAGES_NAMES } from '../../../navigation'
import Header from '../../components/header/header'
import { OutlineWhiteButton, PrimaryButton } from '../../design/buttons'
import { ImagePageContainer } from '../../design/image-page-container'

class WelcomePage extends React.Component {

  componentDidMount() {
    if(SplashScreen) {
      SplashScreen.hide()
    }
  }

  render () {
    const { navigate } = this.props.navigation
    return (
      <ImagePageContainer>
        <View style={ styles.content }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <Header title="BLOCK SEOUL" titleStyle={ styles.title }/>
            <View style={ styles.logoContainer }>
              <Image style={ { width: 125, height: 160 } } source={ ColorLogo }/>
            </View>
            <View style={ styles.lunaContainer }>
              <Image source={ PoweredLuna }/>
            </View>
            <View style={ styles.buttonsContainer }>
              <View style={ styles.buttonContainer }>
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
            </View>
          </ScrollView>
        </View>
      </ImagePageContainer>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginLeft: 16,
    marginRight: 16
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 32
  },
  lunaContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
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
  }
})

export default WelcomePage
