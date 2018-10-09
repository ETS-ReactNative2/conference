import { Icon, Text, View } from 'native-base'
import React from 'react'
import { Image, Linking, TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../locales/i18n'
import ColorLogo from '../../../assets/logos/logo_grey.png'
import { getDimensions } from '../../../common/dimension-utils'
import { JOB_LOCATION, ROLES } from '../../../enums'
import { PRIMARY_COLOR } from '../../design/constants'

function createAvatar (professional, extraQuery) {
  const hasAvatar = professional.user && professional.user.imageUrl
  const avatar = hasAvatar
    ? { uri: `${professional.user.imageUrl}?${extraQuery}` }
    : ColorLogo

  return {
    hasAvatar, avatar
  }
}

function extractInfo (professional) {
  const firstName = professional.user.firstName
  const lastName = professional.user.lastName

  return {
    firstName,
    lastName,
    ...{ country, role } = professional
  }
}

class Small extends React.PureComponent {
  render () {
    const { professional, onClick } = this.props
    const { hasAvatar, avatar } = createAvatar(professional, 'w=500&h=300')
    const { firstName, lastName, country, role } = extractInfo(professional)

    return (
      <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
        <View style={ [ styles.card, { width: 250 } ] }>
          <View style={ small.avatarContainer }>
            { hasAvatar ?
              <Image style={ small.avatar } source={ avatar }/> :
              <View style={ small.placeholderContainer }>
                <Image style={ small.placeholder } source={ avatar }/>
              </View>
            }
          </View>
          <View style={ small.line }/>
          <View style={ small.infoContainer }>
            <View style={ styles.inline }>
              <Text ellipsizeMode={ 'tail' } numberOfLines={ 1 }
                    style={ [ small.title, { maxWidth: 190 } ] }>{ `${firstName} ${lastName}` }</Text>
              { country ?
                <Flag style={ small.flag } code={ country }/> :
                null
              }
            </View>
            {
              role === 12 ?
                <Text
                  style={ small.subtitle }>{ professional.roleOtherText !== '' ? professional.roleOtherText : I18n.t(
                  'common.roles.other') }</Text> :
                <Text
                  style={ small.subtitle }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) }</Text>
            }
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const small = EStyleSheet.create({
  avatarContainer: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden'
  },
  avatar: {
    width: 250,
    height: 150
  },
  placeholderContainer: {
    width: 250,
    height: 150,
  },
  line: {
    height: 1,
    width: 234,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  placeholder: {
    width: 74,
    height: 94,
    marginLeft: 88,
    marginRight: 88,
    marginTop: 28,
    marginBottom: 28,
    opacity: .50
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

class Medium extends React.PureComponent {
  render () {
    const { professional, onClick } = this.props
    const { hasAvatar, avatar } = createAvatar(professional, 'w=240&h=320')
    const { firstName, lastName, country, role } = extractInfo(professional)

    return (
      <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
        <View style={ styles.card }>
          <View style={ medium.cardContent }>
            <View style={ medium.avatarContainer }>
              { hasAvatar ?
                <Image style={ medium.avatar } source={ avatar }/> :
                <View style={ medium.placeholderContainer }>
                  <Image style={ medium.placeholder } source={ avatar }/>
                </View>
              }
            </View>
            <View style={ medium.infoContainer }>
              <View style={ [ styles.inline, medium.details ] }>
                <Text style={ [ medium.title, { flex: 1 } ] } ellipsizeMode={ 'tail' }
                      numberOfLines={ 1 }>{ `${firstName} ${lastName}` }</Text>
                { country ?
                  <Flag style={ medium.flag } code={ country }/> :
                  null
                }
              </View>
              <View style={ { marginTop: 4, marginBottom: 4 } }>
                {
                  role === 12 ?
                    <Text
                      style={ medium.role }>{ professional.roleOtherText !== '' ? professional.roleOtherText : I18n.t(
                      'common.roles.other') }</Text> :
                    <Text
                      style={ medium.role }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) }</Text>

                }
                <Text
                  ellipsizeMode={ 'tail' } numberOfLines={ 1 }
                  style={ medium.subtitle }>{ professional.skillsText }</Text>
              </View>
              <View style={ styles.inline }>
                <View style={ medium.rowDetail }>
                  <Text style={ medium.header }>{ I18n.t('cards.work') }</Text>
                  <View style={ { flex: 1 } }>
                    {
                      professional.localRemoteOptions.map((item, index) => {
                        const option = I18n.t(`common.job_location.${JOB_LOCATION.find(ele => ele.index === item).slug}`)
                        return (
                          <Text key={ index } style={ medium.subtitle }>{ option }</Text>
                        )
                      })
                    }
                  </View>
                </View>
                <View style={ medium.rowDetail }>
                  <Text style={ medium.header }>{ I18n.t('cards.location') }</Text>
                  <View style={ { flex: 0.8 } }>
                    { professional.country ? <Text style={ medium.subtitle }>{ professional.country }</Text> : null }
                    { professional.city ? <Text
                      ellipsizeMode={ 'tail' } numberOfLines={ 1 }
                      style={ medium.subtitle }>{ professional.city }</Text> : null
                    }
                    { professional.relocate ?
                      <Text style={ [ medium.subtitle ] }>{ I18n.t('cards.relocate') }</Text> : null }
                  </View>
                </View>
                <View style={ medium.rowDetail }>
                  <Text style={ medium.header }>{ I18n.t('cards.info') }</Text>
                  <View style={ { flex: 0.5 } }>
                    { professional.age ?
                      <Text style={ medium.subtitle }>{ `${I18n.t('cards.age')}: ${professional.age}` }</Text> : null }
                    { professional.experience ?
                      <Text
                        style={ medium.subtitle }>{ `${I18n.t('cards.exp')}: ${professional.experience}` }</Text> : null }
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
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
    width: 120,
    height: 160
  },
  placeholderContainer: {
    width: 120,
    height: 160,
  },
  placeholder: {
    width: 54,
    height: 70,
    marginLeft: 33,
    marginRight: 33,
    marginTop: 45,
    marginBottom: 45,
    opacity: .50
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
  role: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, .75)'
  },
  premium: {
    color: PRIMARY_COLOR
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

class XL extends React.PureComponent {

  handleLink = async (prefix, link = '/') => {
    try {
      const supported = await Linking.canOpenURL(prefix + link)
      if (!supported) {
        throw new Error('')
      }
      await Linking.openURL(prefix + link)
    } catch (err) {
      this.props.onLinkError(I18n.t('common.errors.incorrect_url'))
    }
  }

  render () {
    const { professional } = this.props

    const { hasAvatar, avatar } = createAvatar(professional, 'w=300&h=300')

    const { firstName, lastName, country, role } = extractInfo(professional)

    const { itemWidth } = getDimensions()

    const avatarSize = itemWidth / 3
    const avatarStyle = {
      width: avatarSize,
      height: avatarSize
    }

    const placeholderStyle = {
      width: 60,
      height: 80,
      marginLeft: (avatarSize - 60) / 2,
      marginRight: (avatarSize - 60) / 2,
      marginTop: (avatarSize - 80) / 2,
      marginBottom: (avatarSize - 80) / 2
    }

    const verticalLineHeight = {
      height: avatarSize - 8
    }
    const horizontalLineWidth = {
      width: itemWidth - 10
    }

    return (
      <View style={ styles.cardWithoutMargin }>
        <View style={ xl.cardContent }>
          <View style={ styles.inline }>
            <View style={ xl.avatarContainer }>
              { hasAvatar ?
                (<Image style={ avatarStyle } source={ avatar }/>) :
                (<View style={ avatarStyle }>
                  <Image style={ placeholderStyle } source={ avatar }/>
                </View>)
              }
            </View>
            <View style={ xl.infoContainer }>
              <View>
                <Text style={ xl.title }>{ `${firstName} ${lastName}` }</Text>
                { country ?
                  <View style={ [ styles.inline, { marginTop: 2, marginBottom: 2 } ] }>
                    <Flag style={ xl.flag } code={ country }/>
                    <Text style={ [ xl.role, xl.city ] }>{ professional.city }</Text>
                  </View> : null }
              </View>
              <View style={ { marginTop: 2, marginBottom: 2 } }>
                {
                  role === 12 ?
                    <Text
                      style={ xl.role }>{ professional.roleOtherText !== '' ? professional.roleOtherText.toUpperCase() : I18n.t(
                      'common.roles.other').toUpperCase() }</Text> :
                    <Text style={ xl.role }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`)
                      .toUpperCase() }</Text>
                }
              </View>
            </View>
          </View>
          <View style={ xl.boxContainer }>
            <Text style={ xl.header }>{ I18n.t('cards.skills').toUpperCase() }</Text>
            <Text style={ xl.subtitle }>{ professional.skillsText || '...' }</Text>
            <Text style={ [ xl.header, styles.spaceAbove ] }>{ I18n.t('cards.traits').toUpperCase() }</Text>
            <Text style={ xl.subtitle }>{ professional.traitsText || '...' }</Text>
            <Text style={ [ xl.header, styles.spaceAbove ] }>{ I18n.t('cards.most').toUpperCase() }</Text>
            <Text style={ xl.subtitle }>{ professional.knowMost || '...' }</Text>
          </View>
          <View style={ [ xl.line, horizontalLineWidth ] }/>
          <View style={ styles.inline }>
            <View style={ [ xl.boxContainer, styles.center ] }>
              <Text style={ xl.question }>{ I18n.t('cards.location').toUpperCase() }</Text>
              {
                professional.localRemoteOptions.map((item, index) => {
                  const option = I18n.t(`common.job_location.${JOB_LOCATION.find(ele => ele.index === item).slug}`)
                  return (
                    <Text key={ index } style={ xl.answer }>{ option }</Text>
                  )
                })
              }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              <Text style={ xl.question }>{ I18n.t('cards.age').toUpperCase() }</Text>
              <Text style={ xl.answer }>{ professional.age || '...' } </Text>
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              <Text style={ xl.question }>{ I18n.t('cards.exp').toUpperCase() }</Text>
              <Text style={ xl.answer }>{ professional.experience || '...' } </Text>
            </View>
          </View>
          <View style={ [ xl.line, horizontalLineWidth ] }/>
          <View style={ styles.inline }>
            <View style={ [ xl.boxContainer, styles.center ] }>
              <Text style={ xl.question }>{ I18n.t('cards.relocate').toUpperCase() }</Text>
              <Text style={ xl.answer }>{ I18n.t(`common.${professional.relocate ? 'yes' : 'no'}`) } </Text>
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { professional.user.telegram ? (
                  <TouchableHighlight
                    onPress={ () => this.handleLink('https://t.me/', professional.user.telegram) }
                    underlayColor='transparent'>
                    <View>
                      <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' } name={ 'telegram' }/>
                      <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.telegram') }</Text>
                    </View>
                  </TouchableHighlight>
                ) :
                <View>
                  <Icon style={ { textAlign: 'center', color: 'white', opacity: .5 } } type={ 'FontAwesome' }
                        name={ 'telegram' }/>
                  <Text style={ [ xl.subtitle,
                    { textAlign: 'center', opacity: .5 } ] }>{ I18n.t('common.no_telegram') }</Text>
                </View>
              }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { professional.user.linkedin ? (
                  <TouchableHighlight
                    onPress={ () => this.handleLink('https://www.linkedin.com/in/', professional.user.linkedin) }
                    underlayColor='transparent'>
                    <View>
                      <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                            name={ 'linkedin' }/>
                      <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.linkedin') }</Text>
                    </View>
                  </TouchableHighlight>
                ) :
                <View>
                  <Icon style={ { textAlign: 'center', color: 'white', opacity: .5 } } type={ 'FontAwesome' }
                        name={ 'linkedin' }/>
                  <Text style={ [ xl.subtitle,
                    { textAlign: 'center', opacity: .5 } ] }>{ I18n.t('common.no_linkedin') }</Text>
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const xl = EStyleSheet.create({
  avatarContainer: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden'
  },
  infoContainer: {
    flex: 2,
    margin: 8
  },
  line: {
    height: 1,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  verticalLine: {
    height: 136,
    width: 1,
    marginTop: 4,
    marginBottom: 5,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  placeholderContainer: {
    width: 200,
    height: 150,
  },
  details: {
    margin: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4
  },
  role: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, .75)'
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white'
  },
  question: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'normal',
    color: 'white',
    marginBottom: 8
  },
  answer: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, .75)'
  },
  flag: {
    width: 30,
    height: 20
  },
  city: {
    marginLeft: 4,
    justifyContent: 'center'
  },
  boxContainer: {
    flex: 1,
    padding: 8
  },
  linkedin: {
    color: 'white',
    textAlign: 'center'
  }
})

const styles = EStyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    margin: 4
  },
  cardWithoutMargin: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
  },
  inline: {
    flexDirection: 'row'
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  spaceAbove: {
    marginTop: 4
  }
})

export default {
  Small,
  Medium,
  XL
}
