import { Text, View } from 'native-base'
import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../locales/i18n'
import ColorLogo from '../../../assets/logos/conference_logo_welcome_medium.png'
import { FUNDING_STAGES, REGIONS, TICKET_SIZES, TOKEN_TYPES } from '../../../enums'

function createAvatar (investor, extraQuery) {
  const hasAvatar = investor.user && investor.user.imageUrl
  const avatar = hasAvatar
    ? { uri: `${investor.user.imageUrl}?${extraQuery}` }
    : ColorLogo

  return {
    hasAvatar, avatar
  }
}

function extractInfo (investor) {
  const firstName = investor.user.firstName
  const lastName = investor.user.lastName
  const ticketCount = investor.ticketSizes.length
  const minTicketSize = ticketCount > 0 ? TICKET_SIZES[ investor.ticketSizes[ 0 ] - 1 ].minlabel : ''
  const maxTicketSize = ticketCount > 0 ? TICKET_SIZES[ investor.ticketSizes[ ticketCount - 1 ] - 1 ].maxlabel : ''

  const moneyRange = minTicketSize + ' ~ ' + maxTicketSize

  return {
    firstName,
    lastName,
    moneyRange
  }
}

const Small = ({ investor, onClick }) => {

  const { hasAvatar, avatar } = createAvatar(investor, 'w=400&h=300')
  const { firstName, lastName, moneyRange } = extractInfo(investor)

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
      <View style={ styles.card }>
        <View style={ small.avatarContainer }>
          { hasAvatar ?
            <Image style={ small.avatar } source={ avatar }/> :
            <View style={ small.placeholderContainer }>
              <Image style={ small.placeholder } source={ avatar }/>
            </View>
          }
        </View>
        <View style={ small.line}/>
        <View style={ small.infoContainer }>
          <View style={ styles.inline }>
            <Text style={ small.title }>{ `${firstName} ${lastName}` }</Text>
            { investor.nationality ?
              <Flag style={ small.flag } code={ investor.nationality }/> :
              null
            }
          </View>
          <Text style={ small.subtitle }>{ moneyRange }</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const small = EStyleSheet.create({
  avatarContainer: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden'
  },
  avatar: {
    width: 200,
    height: 150
  },
  line: {
    height: 1,
    width: 184,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  placeholderContainer: {
    width: 200,
    height: 150,
  },
  placeholder: {
    width: 74,
    height: 94,
    marginLeft: 63,
    marginRight: 63,
    marginTop: 28,
    marginBottom: 28
  },
  infoContainer: {
    margin: 16
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, .75)'
  },
  flag: {
    width: 24,
    height: 16,
    marginLeft: 8
  }
})

const Medium = ({ investor, onClick }) => {
  const { hasAvatar, avatar } = createAvatar(investor, 'w=180&h=240')

  const { firstName, lastName, moneyRange } = extractInfo(investor)

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
      <View style={ styles.card }>
        <View style={ medium.cardContent }>
          <View style={ medium.avatarContainer }>
            { hasAvatar ?
              <Image style={ medium.avatar } source={ avatar }/> :
              <View style={ medium.placeholderContainer }>
                <Image style={ medium.placeholder } source={ avatar }/> :
              </View>
            }
          </View>
          <View style={ medium.infoContainer }>
            <View style={ [ styles.inline, medium.details ] }>
              <Text style={ medium.title }>{ `${firstName} ${lastName}` }</Text>
              { investor.nationality ?
                <Flag style={ medium.flag } code={ investor.nationality }/> :
                null
              }
            </View>
            <View style={ { marginTop: 4, marginBottom: 4 } }>
              <Text style={ medium.subtitle }>{ moneyRange }</Text>
            </View>
            <View style={ styles.inline }>
              <View style={ medium.rowDetail }>
                <Text style={ medium.header }>{ I18n.t('cards.technology') }</Text>
                <View style={ { flex: 1 } }>
                  {
                    investor.tokenTypes.map(index => {
                      const stage = TOKEN_TYPES.find(item => item.index === index)

                      if (stage) {
                        return (
                          <Text key={ index } style={ medium.subtitle }>
                            {
                              I18n.t(`common.token_types.${stage.slug}`)
                            }
                          </Text>
                        )
                      }
                    })
                  }
                </View>
              </View>
              <View style={ medium.rowDetail }>
                <Text style={ medium.header }>{ I18n.t('cards.stage') }</Text>
                <View style={ { flex: 0.8 } }>
                  {
                    investor.fundingStages.map(index => {
                      const stage = FUNDING_STAGES.find(item => item.index === index)

                      if (stage) {
                        return (
                          <Text key={ index } style={ medium.subtitle }>
                            {
                              I18n.t(`common.funding_stages.${stage.slug}`)
                            }
                          </Text>
                        )
                      }
                    })
                  }
                </View>
              </View>
              <View style={ medium.rowDetail }>
                <Text style={ medium.header }>{ I18n.t('cards.market') }</Text>
                <View style={ { flex: 0.5 } }>
                  {
                    investor.region === 4 ? (
                      <Text style={ medium.subtitle }>{ investor.regionOtherText }</Text>
                    ) : (
                      <Text style={ medium.subtitle }>
                        {
                          investor.region ? I18n.t(`common.regions.${REGIONS.find(item => item.index === investor.region).slug}`) : ''
                        }
                      </Text>
                    )
                  }
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const medium = EStyleSheet.create({
  cardContent: {
    flexDirection: 'row'
  },
  avatarContainer: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden'
  },
  avatar: {
    width: 90,
    height: 120
  },
  line: {
    height: 1,
    width: 184,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  placeholder: {
    width: 54,
    height: 70,
    marginLeft: 18,
    marginRight: 18,
    marginTop: 25,
    marginBottom: 25
  },
  details: {
    marginTop: 8
  },
  infoContainer: {
    margin: 8,
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4
  },
  header: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, .75)'
  },
  flag: {
    width: 24,
    height: 16,
    marginLeft: 8
  },
  rowDetail: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

const styles = EStyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    margin: 4
  },
  inline: {
    flexDirection: 'row'
  }
})

export default {
  Small,
  Medium
}
