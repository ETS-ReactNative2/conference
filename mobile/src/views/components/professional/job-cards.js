import { Icon, Text, View } from 'native-base'
import React from 'react'
import { Image, Linking, TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../locales/i18n'
import ColorLogo from '../../../assets/logos/logo_grey.png'
import { getDimensions } from '../../../common/dimension-utils'
import { JOB_LOCATION, PAYMENTS, ROLES } from '../../../enums'
import { PRIMARY_COLOR } from '../../design/constants'

function createAvatar (project, extraQuery) {
  const hasAvatar = (project && project.imageUrl && project.imageUrl !== '') ? true : false
  const avatar = hasAvatar
    ? { uri: `${project.imageUrl}?${extraQuery}` }
    : ColorLogo
  return {
    hasAvatar, avatar
  }
}

const Medium = ({ job, onClick, onLink }) => {

  const { project, country, city, description, link, partTime, localRemoteOptions, payments, role, skillsText } = job

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
      <View style={ styles.card }>
        <View style={ medium.cardContent }>
          <View style={ medium.avatarContainer }>
            <View style={ medium.flagContainer }>
              <Flag style={ medium.flag } code={ country }/>
            </View>
          </View>
          <View style={ medium.infoContainer }>
            <Text
              style={ medium.title }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) + ` - ${project ? project.name : 'Anonymous project'}` }</Text>
            { skillsText.length > 0 && <Text style={ medium.subtitle }>{ skillsText }</Text> }
            <Text
              style={ medium.subtitle }>{ partTime ? I18n.t('job_item.part_time') : I18n.t('job_item.full_time') }</Text>
            <View style={ { flexDirection: 'row' } }>
              { localRemoteOptions.findIndex(op => op === 1) !== -1 &&
              <Text style={ medium.subtitle }>{ `${country}, ${city}` }</Text>
              }
              {
                localRemoteOptions.length === 2 &&
                <Text style={ medium.subtitle }> / </Text>
              }
              {
                localRemoteOptions.findIndex(op => op === 2) !== -1 &&
                <Text style={ medium.subtitle }>{ I18n.t('common.job_location.remote') }</Text>
              }
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
  flagContainer: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
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
    width: 60,
    height: 40
  },
  rowDetail: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

class XL extends React.Component {

  shouldComponentUpdate = () => {
    return false
  }

  handleUrlClick = (prefix, link) => {
    Linking.canOpenURL(prefix + link)
      .then(supported => {
        if (supported) {
          Linking.openURL(prefix + link)
        } else {
          console.log('Don\'t know how to open URI: ' + prefix + link)
        }
      })
  }

  render () {
    const { job } = this.props

    const { hasAvatar, avatar } = createAvatar(job.project, 'w=300&h=300')
    const { itemWidth, sliderWidth } = getDimensions()

    const { role, country, skillsText, description, city } = job

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
                <Text style={ xl.title }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`)
                  .toUpperCase() }</Text>
                <Text style={ xl.role }>{ job.project ? job.project.name : '...' }</Text>
                { country ?
                  <View style={ [ styles.inline, { marginTop: 2, marginBottom: 2 } ] }>
                    <Flag style={ xl.flag } code={ country }/>
                    <Text style={ [ xl.role, xl.city ] }>{ city }</Text>
                  </View> : null }
              </View>
              <View style={ { marginTop: 2, marginBottom: 2 } }>
              </View>
            </View>
          </View>
          <View style={ xl.boxContainer }>
            <Text style={ [ xl.header ] }>{ I18n.t('cards.description').toUpperCase() }</Text>
            <Text style={ xl.subtitle }>{ description || '...' }</Text>
            <Text style={ [ xl.header, styles.spaceAbove ] }>{ I18n.t('cards.skills').toUpperCase() }</Text>
            <Text style={ xl.subtitle }>{ skillsText || '...' }</Text>
          </View>
          <View style={ [ xl.line, horizontalLineWidth ] }/>
          <View style={ styles.inline }>
            <View style={ [ xl.boxContainer, styles.center ] }>
              <Text style={ xl.question }>{ I18n.t('cards.location').toUpperCase() }</Text>
              {
                job.localRemoteOptions.map((item, index) => {
                  const option = I18n.t(`common.job_location.${JOB_LOCATION.find(ele => ele.index === item).slug}`)
                  return (
                    <Text key={ index } style={ xl.answer }>{ option }</Text>
                  )
                })
              }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              <Text style={ xl.question }>{ I18n.t('cards.payments').toUpperCase() }</Text>
              {
                job.payments.map((item, index) => {
                  const option = I18n.t(`common.payment.${PAYMENTS.find(ele => ele.index === item).slug}`)
                  return (
                    <Text key={ index } style={ xl.answer }>{ option }</Text>
                  )
                })
              }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              <Text style={ xl.question }>{ I18n.t('cards.part_time').toUpperCase() }</Text>
              <Text style={ xl.answer }>{ I18n.t(`common.${job.partTime ? 'yes' : 'no'}`) } </Text>
            </View>
          </View>
          { job.link ? (
            <React.Fragment>
              <View style={ [ xl.line, horizontalLineWidth ] }/>
              <View style={ styles.inline }>
                <View style={ [ xl.boxContainer, styles.center ] }>
                  <TouchableHighlight onPress={ () => this.handleLink(job.link) } underlayColor='transparent'>
                    <View>
                      <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                            name={ 'globe' }/>
                      <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.details') }</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </React.Fragment>
          ) : null }
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
    alignContent: 'center',
  },
  spaceAbove: {
    marginTop: 4,
  }
})

export default {
  Medium,
  XL
}
