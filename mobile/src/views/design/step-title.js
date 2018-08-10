import { Switch, Text, View } from 'native-base'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { BAR_COLOR, SECONDARY_COLOR } from './constants'

export function StepTitle ({ text = '' }) {
  return (
    <View style={ styles.title }>
      <Text style={ styles.text }>{ text }</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  title: {
    alignItems: 'center',
    alignContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginLeft: 16,
    fontWeight: 'normal',
    paddingBottom: 16,
    paddingTop: 16
  }
})
