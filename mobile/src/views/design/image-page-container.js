import React from 'react'
import { ImageBackground, StatusBar } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import BackgroundImage from '../../assets/images/background_image.png'

export function ImagePageContainer ({children, customGradient}) {
  return (
    <SafeAreaView style={ { flex: 1, backgroundColor: '#000000' } } forceInset={ { top: 'always' } }>
      <StatusBar
        translucent={ true }
        barStyle="light-content"
      />
      <ImageBackground source={ BackgroundImage } style={ styles.imageContainer } blurRadius={ 1 }>
        <LinearGradient style={ { flex: 1 } } locations={ customGradient ? customGradient.levels : [ 0, 0.4, 0.8 ] }
                        colors={ customGradient ? customGradient.colors : [ 'rgba(0, 0, 0, 1)', 'rgba(20,25,46, .83)', 'rgba(20,25,46, .83)' ] }>
          {children}
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  }
})
