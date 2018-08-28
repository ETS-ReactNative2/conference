import { Text } from 'native-base'
import React from 'react'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../../locales/i18n'
import { itemWidth } from '../../../../common/dimension-utils'
import { ROLES, JOB_LOCATION } from '../../../../enums'
import { getUrl } from '../../../../common/fake-randomizer'

export class ProfessionalCard extends React.Component {

  shouldComponentUpdate = () => {
    return false
  }

  render () {
    const { professional } = this.props
    const { role, user, country, city, skillsText, traitsText, knowMost, age, experience, relocate, localRemoteOptions } = professional
    const { firstName, lastName } = user
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
            {
              country ? (<Flag style={ styles.countryFlag } code={ country }/>) : null
            }
            <Text style={ styles.smallText }>{ city }</Text>
          </View>
          <View style={ styles.rowRemote }>
            {relocate && <Text style={styles.smallText}>Relocate</Text>}
            {
              localRemoteOptions.map(item => {
                const option = I18n.t(`common.job_location.${JOB_LOCATION.find(ele => ele.index === item).slug}`);
                return (
                  <Text style={styles.smallText}>{option}</Text>
                )
              })
            }
          </View>
          <Text style={ styles.smallText }>{ skillsText }</Text>
          <Text style={ styles.smallText }>{ traitsText }</Text>
          <Text style={ styles.smallText }>{ knowMost }</Text>
          <View style={ styles.rowYears }>
            <View style={ styles.row }>
              <Text style={ [styles.smallText, styles.boldText] }>{ age && `Age: ` }</Text>
              <Text style={ styles.smallText }>{ age && (age > 1 ? `${age} years`: `${age} year`) }</Text>
            </View>
            <View style={ styles.row }>
              <Text style={ [styles.smallText, styles.boldText] }>{ experience && `Experience: ` }</Text>
              <Text style={ styles.smallText }>{ experience && (experience > 1 ? `${experience} years` : `${experience} year`) }</Text>
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
    width: 240,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-around'
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
