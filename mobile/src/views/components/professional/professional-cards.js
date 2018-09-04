import { Text, View } from 'native-base'
import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../locales/i18n'
import ColorLogo from '../../../assets/logos/logo_grey.png'
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

const Small = ({ professional, onClick }) => {

  const { hasAvatar, avatar } = createAvatar(professional, 'w=500&h=300')
  const { firstName, lastName, country, role } = extractInfo(professional)

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
        <View style={ small.line }/>
        <View style={ small.infoContainer }>
          <View style={ styles.inline }>
            <Text style={ small.title }>{ `${firstName} ${lastName}` }</Text>
            { country ?
              <Flag style={ small.flag } code={ country }/> :
              null
            }
          </View>
          <Text style={ small.subtitle }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) }</Text>
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

const Medium = ({ professional, onClick }) => {
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
              <Text style={ medium.title }>{ `${firstName} ${lastName}` }</Text>
              { country ?
                <Flag style={ medium.flag } code={ country }/> :
                null
              }
            </View>
            <View style={ { marginTop: 4, marginBottom: 4 } }>
              <Text style={ medium.role }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) }</Text>
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
                  { professional.relocate &&
                  <Text style={ [ medium.subtitle ] }>Able to relocate</Text> }
                </View>
              </View>
              <View style={ medium.rowDetail }>
                <Text style={ medium.header }>{ I18n.t('cards.info') }</Text>
                <View style={ { flex: 0.5 } }>
                  { professional.age ?
                  <Text style={ medium.subtitle }>{ `${I18n.t('cards.age')}: ${professional.age}` }</Text> : null }
                  { professional.experience ?
                  <Text style={ medium.subtitle }>{ `${I18n.t('cards.exp')}: ${professional.experience}` }</Text> : null }
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
