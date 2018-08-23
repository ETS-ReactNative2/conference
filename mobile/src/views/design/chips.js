import { Text, View } from 'native-base'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SECONDARY_COLOR } from './constants'

export function Chip ({ text = '', selected = false, onSelect }) {
  return (
    <TouchableHighlight onPress={ onSelect } underlayColor='transparent'>
      <View style={ [ styles.chip, selected ? styles.selected : '' ] }>
        <Text style={ [ styles.text, selected ? styles.selectedText : '' ] }>{ text }</Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = EStyleSheet.create({
  chip: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderRadius: 24,
    margin: 8
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  selected: {
    backgroundColor: SECONDARY_COLOR
  },
  selectedText: {
    color: 'white'
  }

})
