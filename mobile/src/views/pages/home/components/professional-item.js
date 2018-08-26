import { ListItem, Text, Thumbnail, View } from 'native-base'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import { ROLES, TICKET_SIZES } from '../../../../enums'
import I18n from '../../../../../locales/i18n'
import { getUrl } from '../../../../common/fake-randomizer'

export const ProfessionalItem = ({ professional, onMark, onClick }) => {
  const portraitPlaceholderUri = getUrl()
  const firstName = professional.user.firstName
  const lastName = professional.user.lastName
  const role = professional.role

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
    <View style={ styles.listItem }>
      <View>
        <Thumbnail square large style={ styles.portrait } source={ { uri: portraitPlaceholderUri } }/>
        <Flag style={ styles.countryFlag } code={ professional.country }/>
      </View>
      <View style={ { margin: 16 } }>
        <Text numberOfLines={1} style={ styles.largeText }>{ `${firstName} ${lastName}` }</Text>
        <Text style={ styles.normalText }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) }</Text>
      </View>
    </View>
    </TouchableHighlight>
  )
}

const styles = EStyleSheet.create({
  listItem: {
    flexDirection: 'column',
    width: 200,
    minHeight: 200,
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
    width: 200,
    height: 175
  },
  countryFlag: {
    position: 'absolute',
    width: 30,
    height: 40,
    right: 0,
    bottom: 0,
    padding: 0,
    marginBottom: -3
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
    fontSize: 14,
    fontFamily: 'Helvetica',
    textAlign: 'left'
  },
  largeText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textAlign: 'left',
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
