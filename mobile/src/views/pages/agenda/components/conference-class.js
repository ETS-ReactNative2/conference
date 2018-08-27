import moment from 'moment'
import React from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { BAR_COLOR } from '../../../design/constants'

export function ConferenceClass ({ clazz, startDate }) {
  const { endDate, rooms, speakers, title } = clazz

  return (
    <React.Fragment>
      <View style={ styles.classContainer }>
        <View style={ styles.firstLine }>
          <Text style={ styles.dateText }>{ `${formatTime(startDate)} - ${formatTime(endDate)}` }</Text>
          <Text ellipsizeMode={ 'tail' } numberOfLines={ 1 }
                style={ styles.roomText }>{ rooms.length !== 0 ? rooms[ 0 ] : 'None' }</Text>
        </View>
        <Text style={ styles.title }>{ title }</Text>
      </View>
    </React.Fragment>
  )
}

function formatTime(date) {
  return moment(date, 'HH:mm:ss').format('h:mm A')
}

const styles = EStyleSheet.create({
  classContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    borderBottomColor: 'rgba(255,255,255,.5)',
    borderBottomWidth: 1
  },
  firstLine: {
    flexDirection: 'row'
  },
  dateText: {
    fontWeight: 'bold',
    color: BAR_COLOR,
    fontSize: 16,
  },
  roomText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    color: 'rgba(255,255,255,.5)'
  },
  title: {
    fontSize: 14,
    marginTop: 8,
    color: 'white'
  }
})
