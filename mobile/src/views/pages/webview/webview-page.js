import { Container } from 'native-base'
import React, { Component } from 'react'
import { WebView } from 'react-native'
import { SafeAreaView } from 'react-navigation'

export default class WebviewPage extends Component {
  render () {
    const uri = this.props.navigation.getParam('uri', '')
    return (
      <SafeAreaView style={ { flex: 1, backgroundColor: 'black' } } forceInset={ { top: 'always' } }>
        <Container style={ { backgroundColor: 'black' } }>
          <WebView
            source={ { uri } }
          />
        </Container>
      </SafeAreaView>
    )
  }
}
