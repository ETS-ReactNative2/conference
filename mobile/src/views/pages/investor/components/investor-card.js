import { Icon, Text } from 'native-base'
import React from 'react'
import { Image, Linking, TouchableHighlight, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../../locales/i18n'
import ColorLogo from '../../../../assets/logos/conference_logo_welcome_medium.png'
import { itemWidth } from '../../../../common/dimension-utils'
import { FUNDING_STAGES, PRODUCT_STAGES, REGIONS, TICKET_SIZES, TOKEN_TYPES } from '../../../../enums'

export class InvestorCard extends React.Component {

  shouldComponentUpdate = () => {
    return false
  }

  handleLinkedinClick = () => {
    Linking.canOpenURL(this.props.investor.linkedin)
      .then(supported => {
        if (supported) {
          Linking.openURL(this.props.investor.linkedin)
        } else {
        }
      })
  }

  render () {
    const { investor, onMessageClick, showMessage } = this.props

    const avatar = investor.user && investor.user.imageUrl
      ? { uri: `${investor.user.imageUrl}?w=300&h=300` }
      : ColorLogo

    const firstName = investor.user ? investor.user.firstName : ''
    const lastName = investor.user ? investor.user.lastName : ''
    const ticketCount = investor.ticketSizes.length
    const minTicketSize = ticketCount === 0 ? '.' : TICKET_SIZES[ investor.ticketSizes[ 0 ] - 1 ].minlabel
    const maxTicketSize = ticketCount === 0 ? '.' : TICKET_SIZES[ investor.ticketSizes[ ticketCount - 1 ] - 1 ].maxlabel
    const moneyRange = minTicketSize + ' ~ ' + maxTicketSize

    return (
      <View style={ {
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
      } }>
        { investor.linkedin && (
          <Icon onPress={ this.handleLinkedinClick } style={ styles.linkedin } fontSize={ 32 } type={ 'FontAwesome' }
                name={ 'linkedin' }/>
        ) }
        <Image style={ styles.portrait } source={ avatar }/>
        <View style={ {
          marginTop: 16,
          marginLeft: 16,
          marginRight: 16,
          justifyContent: 'center',
          alignItems: 'center'
        } }>
          <Text style={ styles.largeText }>{ `${firstName} ${lastName}` }</Text>
          <Text
            style={ styles.normalText }>{ (investor.user && investor.user.company) ? investor.user.company : '' } </Text>
          <Text style={ styles.normalText }>{ moneyRange }</Text>
          <Flag style={ styles.countryFlag } code={ investor.nationality }/>
          <View style={ {
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 32,
            marginLeft: 16,
            marginRight: 16,
            width: (itemWidth - 2 * 16)
          } }>
            <View style={ { alignContent: 'space-between' } }>
              <Text style={ styles.infoHeader }>{ I18n.t('cards.technology') }</Text>
              { investor.tokenTypes.map(tt => (
                <Text style={ styles.smallText }
                      key={ tt }>{ I18n.t(`common.token_types.${ TOKEN_TYPES.find(t => t.index === tt).slug}`) }</Text>
              )) }
            </View>
            <View style={ { alignContent: 'space-between' } }>
              <Text style={ styles.infoHeader }>{ I18n.t('cards.stage') }</Text>
              { investor.fundingStages.map(st => (
                <Text style={ styles.smallText }
                      key={ st }>{ I18n.t(`common.funding_stages.${ FUNDING_STAGES.find(t => t.index === st).slug}`) }</Text>
              )) }
            </View>
            <View style={ { alignContent: 'space-between' } }>
              <Text style={ styles.infoHeader }>{ I18n.t('cards.product') }</Text>
              { investor.productStages.map(st => (
                <Text style={ styles.smallText }
                      key={ st }>{ I18n.t(`common.product_stages.${ PRODUCT_STAGES.find(t => t.index === st).slug}`) }</Text>
              )) }
            </View>
          </View>
          <View style={ {
            width: (itemWidth - 2 * 16),
            flexDirection: 'row',
            marginTop: 16,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignContent: 'flex-start'
          } }>
            <Text style={ styles.infoHeader }>{ I18n.t('cards.market') }</Text>
            { investor.region && investor.region !== 4 && (
              <Text style={ styles.smallText }>
                { I18n.t(`common.regions.${ REGIONS.find(t => t.index === investor.region).slug}`) }
              </Text>
            ) }
            { investor.region && investor.region === 4 && (
              <Text style={ styles.smallText }>
                { investor.regionOtherText }
              </Text>
            ) }
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
            { showMessage && (
              <TouchableHighlight onPress={ onMessageClick } underlayColor='transparent'>
                <View>
                  <Icon style={ { textAlign: 'center' } } name={ 'ios-mail-open' }/>
                  <Text style={ styles.smallActionText }>{ I18n.t('cards.message') }</Text>
                </View>
              </TouchableHighlight>
            ) }
            { !showMessage && (<View/>) }
            <View/>
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
  linkedin: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'black'
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
  portrait: {
    width: 150,
    height: 150,
    marginTop: 8,
    borderRadius: 8
  },
  countryFlag: {
    width: 60,
    height: 45,
    marginTop: 16
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
  }
})
