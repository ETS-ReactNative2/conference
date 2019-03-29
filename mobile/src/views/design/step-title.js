import { Text, View } from 'native-base'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'

export function StepTitle ({ text = '', textStyle = {} }) {
  return (
    <View style={ styles.title }>
      <Text style={[styles.text, textStyle] }>{ text }</Text>
    </View>
  )
}

const styles = EStyleSheet.create({
  title: {
    alignItems: 'center',
    alignContent: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginLeft: 16,
    marginRight: 16,
    fontWeight: 'normal',
    paddingBottom: 16,
    paddingTop: 16
  }
})
