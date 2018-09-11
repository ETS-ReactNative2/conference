import { Container, Text } from 'native-base'
import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-navigation'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { NavigationHeader } from '../../components/header/header'

export default class JobDescriptionPage extends Component {
  render () {
    const description = this.props.navigation.getParam('description');

    return (
      <SafeAreaView style={ styles.container } forceInset={ { top: 'always' } }>
        <Container style={ styles.container }>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <NavigationHeader
                onBack={ () => this.props.navigation.goBack() }
                title={ I18n.t('job_page.job_description_page_title') }
                rightIconSource={ WhiteLogo }/>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{ description }</Text>
              </View>
            </ScrollView>
          </View>
        </Container>
      </SafeAreaView>
    )
  }
}
const styles = EStyleSheet.create({
  navigationStyle: {
    color: '#fff',
    marginTop: 12
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#172D5C'
  }
})
