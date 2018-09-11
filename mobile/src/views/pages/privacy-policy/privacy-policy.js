import { Container, Content, Text } from 'native-base'
import React, { Component } from 'react'
import { Linking, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SafeAreaView } from 'react-navigation'
import I18n from '../../../../locales/i18n'
import BlackLogo from '../../../assets/logos/ico_black.png'
import { NavigationHeader } from '../../components/header/header'

class PrivacyPolicyPage extends Component {

  openLink = (link) => {
    Linking.openURL(link)
  }

  render () {
    return (
      <SafeAreaView style={ { flex: 1, backgroundColor: '#FFFFFF' } } forceInset={ { top: 'always' } }>
        <Container>
          <Content>
            <NavigationHeader
              iconStyle={ { color: 'black' } }
              onBack={ () => this.props.navigation.goBack() }
              title={ I18n.t('privacy_policy_page.title') }
              titleStyle={ { color: '#000000' } }
              rightIconSource={ BlackLogo }/>
            <View style={ styles.contentContainer }>
              <View>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.description') }</Text>
              </View>
              <View>
                <Text
                  style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.information_collection.header') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.information_collection.text') }</Text>
              </View>
              <View>
                <Text style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.information_usage.header') }</Text>
                <Text
                  style={ styles.description }>{ I18n.t('privacy_policy_page.information_usage.description') }</Text>
                <Text
                  style={ styles.sectionBold }>{ I18n.t('privacy_policy_page.information_usage.specific_examples') }</Text>
                <Text style={ styles.sectionIndent }>{ I18n.t('privacy_policy_page.information_usage.examples') }</Text>
              </View>
              <View>
                <Text style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.cookies.header') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.cookies.text') }</Text>
                <Text style={ styles.sectionIndent }>{ I18n.t('privacy_policy_page.cookies.examples') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.cookies.footer') }</Text>
              </View>
              <View>
                <Text style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.information_share.header') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.information_share.text') }</Text>
                <Text style={ styles.sectionIndent }>{ I18n.t('privacy_policy_page.information_share.examples') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.information_share.footer') }</Text>
              </View>
              <View>
                <Text
                  style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.information_protection.header') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.information_protection.text') }</Text>
              </View>
              <View>
                <Text style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.data_retention.header') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.data_retention.text') }</Text>
              </View>
              <View>
                <Text
                  style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.changes_to_privacy_policy.header') }</Text>
                <Text
                  style={ styles.description }>{ I18n.t('privacy_policy_page.changes_to_privacy_policy.text') }</Text>
              </View>
              <View>
                <Text style={ styles.sectionHeader }>{ I18n.t('privacy_policy_page.contact_us.header') }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.contact_us.email') }</Text>
                <Text
                  onPress={ () => this.openLink(`mailto:${I18n.t('privacy_policy_page.contact_us.email_address')}`) }
                  style={ styles.emailAddress }>{ I18n.t('privacy_policy_page.contact_us.email_address') }{ '\n\n' }</Text>
                <Text style={ styles.description }>{ I18n.t('privacy_policy_page.contact_us.acc_create') }</Text>
              </View>
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    )
  }
}

const styles = EStyleSheet.create({
  contentContainer: {
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24
  },
  mainContainer: {
    backgroundColor: '#FFFFFF'
  },
  description: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#000000',
    textAlign: 'justify'
  },
  sectionHeader: {
    fontFamily: 'Arial',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
    color: '#005F9F'
  },
  sectionBold: {
    fontFamily: 'Arial',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    color: '#000000',
    fontWeight: 'bold'
  },
  sectionIndent: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#000000',
    textAlign: 'justify',
    marginLeft: 16,
    marginBottom: 8
  },
  emailAddress: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#005F9F'
  }
})

export default PrivacyPolicyPage
