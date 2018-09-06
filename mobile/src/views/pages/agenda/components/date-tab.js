import moment from 'moment'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

export function DateTab ({ onClick, selected, date }) {
  return (
    <TouchableOpacity onPress={ onClick } underlayColor='transparent'>
      <View style={ styles.tab }>
        <Text style={ [ styles.day ] }>{ moment(date).format('ddd').toUpperCase() }</Text>
        <View style={ selected ? styles.dateContainerSelected : styles.dateContainer }>
          <Text style={ selected ? styles.selected : styles.text }>{ moment(date).format('Do').toUpperCase() }</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = EStyleSheet.create({
  tab: {
    marginLeft: 8,
    marginRight: 8
  },
  selected: {
    color: 'black',
  },
  dateContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 32,
  },
  dateContainerSelected: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
    borderRadius: 32,
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  day: {
    color: 'rgba(255,255,255,.5)',
    textAlign: 'center',
    marginBottom: 4
  }
})
