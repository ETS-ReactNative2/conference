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
    const { role, user, country, city, skillsText, traitsText, knowMost, age, experience } = professional
    const { firstName, lastName, relocate } = user
    const portraitPlaceholderUri = getUrl()


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
          <Text style={ styles.largeText }>{ `${firstName} ${lastName}` }</Text>
          <Text style={ [styles.normalText, styles.roleText] }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) }</Text>
          <View style={ styles.rowFlag }>
            <Flag style={ styles.countryFlag } code={ professional.country }/>
            <Text style={ styles.smallText }>{ city ? city: 'No City'}</Text>
          </View>
          <View style={ styles.rowRemote }>
            <Text style={ styles.smallText }>Relocate</Text>
            <Text style={ styles.smallText }>Remote</Text>
          </View>
          <Text style={ styles.smallText }>{ skillsText ? skillsText : 'No Skills Selected' }</Text>
          <Text style={ styles.smallText }>{ traitsText ? traitsText : 'No Traits Selected' }</Text>
          <Text style={ styles.smallText }>{ knowMost ? knowMost : 'Now KnowsMost Selected'}</Text>
          <View style={ styles.rowYears }>
            <View style={ styles.row }>
              <Text style={ [styles.smallText, styles.boldText] }>{`Age:`}</Text>
              <Text style={ styles.smallText }>{ age ? `${age}year` : '?'}</Text>
            </View>
            <View style={ styles.row }>
              <Text style={ [styles.smallText, styles.boldText] }>{` Experience:`}</Text>
              <Text style={ styles.smallText }>{ experience ? `${experience}year` : '?'}</Text>
            </View>
          </View>
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
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#2C65E2'
  },
  smallText: {
    fontSize: 12,
    marginTop: 3
  },
  smallActionText: {
    fontSize: 12,
    color: '#888'
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
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    height: 30
  },
  rowRemote: {
    flexDirection: 'row',
    width: 140,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowYears: {
    flexDirection: 'row',
    width: (itemWidth - 2 * 30),
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  rowFlag: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    textAlign: 'center'
  },
  roleText: {
    marginTop: 10,
    marginBottom: 7
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 4
  },
  boldText: {
    fontWeight: 'bold'
  }
})
