import React from 'react'
import { Image, ImageBackground, ScrollView, StatusBar, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import BackgroundImage from '../../../assets/images/background_image.png'
import LoadingLogo from '../../../assets/logos/logo_glow_blue.png'
import Header from '../header/header'
import { StepTitle } from '../../design/step-title'

const LoadingPage = ({ isLoading, message }) => {
  return (
    <React.Fragment>
      { isLoading && (
        <SafeAreaView style={ styles.spinnerContainer } forceInset={ { top: 'always' } }>
          <StatusBar
            translucent={ true }
            barStyle="light-content"
          />
          <ImageBackground source={ BackgroundImage } style={ styles.imageContainer } blurRadius={ 1 }>
            <LinearGradient style={ { flex: 1 } } locations={ [ 0, 1 ] }
                            colors={ [ 'rgba(22, 25 ,45 , .83)', 'rgba(31, 91, 228, .83)' ] }>
              <View style={ styles.content }>
                <ScrollView style={ { width: '100%' } } contentContainerStyle={ { flexGrow: 1 } }>
                  <Header title="LOADING" titleStyle={ styles.title }/>
                  <View style={ { marginTop: 32, marginLeft: 16, marginRight: 16, marginBottom: 16 } }>
                    <StepTitle text={ message }/>
                  </View>
                  <View style={ styles.logoContainer }>
                    <Image source={ LoadingLogo }/>
                  </View>
                </ScrollView>
              </View>
            </LinearGradient>
          </ImageBackground>
        </SafeAreaView>
      )}
    </React.Fragment>)
}

export default LoadingPage

const styles = {
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#14192E'
  },
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16
  }
}
