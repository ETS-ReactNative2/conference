import { Container } from 'native-base'
import React, { Component } from 'react'
import { WebView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import EStyleSheet from 'react-native-extended-stylesheet';
import { PROJECT_FILTER_BACKGROUND_COLOR } from '../../design/constants';

export default class WebviewPage extends Component {
  render () {
    const uri = this.props.navigation.getParam('uri', '')
    return (
      <SafeAreaView style={styles.container} forceInset={ { top: 'always' } }>
        <Container style={styles.wrapper}>
          <WebView
            style={styles.wrapper}
            source={ { uri } }
          />
        </Container>
      </SafeAreaView>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PROJECT_FILTER_BACKGROUND_COLOR,
    paddingTop: 20
  },
  wrapper: {
    backgroundColor: PROJECT_FILTER_BACKGROUND_COLOR
  }
})
