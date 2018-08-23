import { ListItem, Text, Thumbnail, View } from 'native-base'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import { TICKET_SIZES } from '../../../../enums'
import { getUrl } from '../../../../fake-randomizer'

export const InvestorItem = ({ investor, onMark, onClick }) => {
  const portraitPlaceholderUri = getUrl()
  const firstName = investor.user ? investor.user.firstName : ''
  const lastName = investor.user ? investor.user.lastName : ''
  const ticketCount = investor.ticketSizes.length
  const minTicketSize = ticketCount === 0 ? '.' : TICKET_SIZES[ investor.ticketSizes[ 0 ] - 1 ].minlabel
  const maxTicketSize = ticketCount === 0 ? '.' : TICKET_SIZES[ investor.ticketSizes[ ticketCount - 1 ] - 1 ].maxlabel
  const moneyRange = minTicketSize + ' ~ ' + maxTicketSize

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
    <View style={ styles.listItem }>
      <View style={ { flex: 1}}>
        <Thumbnail square large style={ styles.portrait } source={ { uri: portraitPlaceholderUri } }/>
        <Flag style={ styles.countryFlag } code={ investor.nationality }/>
      </View>
      <View style={ { marginTop: 16, marginBottom: 16, marginLeft: 16 } }>
        <Text style={ styles.largeText }>{ `${firstName} ${lastName}` }</Text>
        <Text style={ styles.normalText }>{ moneyRange }</Text>
      </View>
    </View>
    </TouchableHighlight>
  )
}

const styles = EStyleSheet.create({
  listItem: {
    flexDirection: 'column',
    width: 200,
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
    height: 150
  },
  countryFlag: {
    position: 'absolute',
    width: 30,
    height: 40,
    right: 0,
    bottom: 0,
    padding: 0,
    // marginLeft: -15,
    // marginTop: 'auto',
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
