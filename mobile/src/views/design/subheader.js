import { Switch, Text, View } from 'native-base'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { BAR_COLOR, SECONDARY_COLOR } from './constants'

export function SmallSubheader ({ text = ''}) {
  return (
    <View style={ styles.subheader }>
      <View style={ styles.leftBar }/>
      <Text style={ styles.textInSmall }>{ text.toUpperCase() }</Text>
    </View>
  )
}

export function Subheader ({ text = '' }) {
  return (
    <View style={ styles.subheader }>
      <View style={ styles.leftBar }/>
      <Text style={ styles.text }>{ text.toUpperCase() }</Text>
    </View>
  )
}

export function SubheaderWithSwitch ({ text = '', selected = true, onToggle, switchText = 'all', switchTextColor = 'white' }) {
  return (
    <View style={ styles.subheader }>
      <View style={ styles.leftBar }/>
      <Text style={ styles.text }>{ text.toUpperCase() }</Text>
      {
        switchText ? (
          <Text style={ [styles.switchTextStyle, { color: switchTextColor }] }>{ switchText.toUpperCase() }</Text>
        ) : null
      }
      <Switch onValueChange={selected => onToggle(selected)} onTintColor={ BAR_COLOR } style={ styles.switch } value={ selected }/>
    </View>
  )
}

const styles = EStyleSheet.create({
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },
  leftBar: {
    height: '100%',
    width: 6,
    backgroundColor: BAR_COLOR
  },
  switch: {
    marginTop: 32,
    marginBottom: 32,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 8
  },
  text: {
    flex: 1,
    color: BAR_COLOR,
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 32,
    paddingTop: 32
  },
  textInSmall: {
    flex: 1,
    color: BAR_COLOR,
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 16,
    paddingTop: 16
  },
  switchTextStyle: {
    marginRight: 8,
    fontSize: 20,
    fontWeight: 'bold'
  }
})
