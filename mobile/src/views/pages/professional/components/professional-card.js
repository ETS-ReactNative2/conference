import { Icon, Text } from 'native-base'
import React from 'react'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../../locales/i18n'
import { itemWidth } from '../../../../common/dimension-utils'
import { INVESTOR_INDUSTRIES, ROLES } from '../../../../enums'
import { getUrl } from '../../../../common/fake-randomizer'

export class ProfessionalCard extends React.Component {

  shouldComponentUpdate = () => {
    return false
  }

  render () {
    const { professional } = this.props
    const { role, user, country, city, skillsText, traitsText, knowMost } = professional
    const { firstName, lastName, relocate } = user

    const portraitPlaceholderUri = getUrl()
    console.log(professional)
    return (
      <View style={ {
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
      } }>
        <Image style={ styles.portrait } source={ { uri: portraitPlaceholderUri } }/>
        <View style={ {
          marginTop: 16,
          marginBottom: 16,
          marginLeft: 16,
          marginRight: 16,
          justifyContent: 'center',
          alignItems: 'center'
        } }>
          <Text style={ styles.largeText }>{ `${firstName} ${lastName} ` }</Text>
          <Text style={ styles.normalText }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) }</Text>
          <Text style={ styles.normalText }>{ `${country}, ${city} ${relocate ? '- Willing to relocate' : ''}` }</Text>
          <Text style={ styles.normalText }>{ `${I18n.t('cards.skills')} - ${skillsText}`  }</Text>
          <Text style={ styles.normalText }>{ `${I18n.t('cards.traits')} - ${traitsText}`  }</Text>
          <Text style={ styles.normalText }>{ `${I18n.t('cards.most')} - ${knowMost}`  }</Text>
          <View style={ {
            marginTop: 16,
            marginLeft: 32,
            marginRight: 32,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between'
          } }>
          </View>


          <View style={ {
            marginTop: 32,
            marginLeft: 16,
            marginRight: 16,
            width: (itemWidth - 2 * 16),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between'
          } }>
            <View>
              <Icon style={ { textAlign: 'center' } } name={ 'ios-mail-open' }/>
              <Text style={ styles.smallActionText }>{ I18n.t('cards.message') }</Text>
            </View>
            <View>
              <Icon style={ { textAlign: 'center' } } name={ 'ios-heart-outline' }/>
              <Text style={ styles.smallActionText }>{ I18n.t('cards.save') }</Text>
            </View>
          </View>
        </View>
        <Flag style={ styles.countryFlag } code={ professional.country }/>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  content: {
    flex: 1,
    backgroundColor: '#2C65E2'
  },
  pageTitleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  },
  infoHeader: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontSize: 12
  },
  smallText: {
    fontSize: 12
  },
  smallActionText: {
    fontSize: 12,
    color: '#888'
  },
  headerTitle: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  },
  listItem: {
    flexDirection: 'column',
    width: 300,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  portrait: {
    width: 150,
    height: 150,
    marginTop: 8,
    borderRadius: 8
  },
  countryFlag: {
    width: 60,
    height: 45,
    position: 'absolute',
    left: 0,
    top: 0,
    marginTop: 8,
    marginLeft: 8
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 11,
    marginLeft: 16,
    marginRight: 18
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 11,
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginRight: 18,
    marginBottom: 11
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    textAlign: 'center'
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 4
  },
  underline: {
    textDecorationLine: 'underline'
  },
  comment: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Helvetica',
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center'
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
