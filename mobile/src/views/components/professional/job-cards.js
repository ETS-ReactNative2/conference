import { Text, View } from 'native-base'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../locales/i18n'
import { ROLES } from '../../../enums'
import { PRIMARY_COLOR } from '../../design/constants'

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
  Medium
}
