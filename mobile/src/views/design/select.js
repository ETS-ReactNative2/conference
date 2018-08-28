import { Icon, Text, View } from 'native-base'
import React from 'react'
import CountryPicker from 'react-native-country-picker-modal'
import EStyleSheet from 'react-native-extended-stylesheet'

export function CountrySelect ({ onChange, value, placeholder }) {
  return (
    <CountryPicker
      onChange={ onChange }
      filterable
      closeable
      cca2={ value.cca2 ? value.cca2 : '' }
      translation="eng"
      flagType={ 'flat' }>
      <View style={ styles.container }>
        <View style={ styles.select }>
          {value.cca2 ? (<View style={ [ styles.touchFlag ] }>
            { CountryPicker.renderFlag(value.cca2 ? value.cca2 : '') }
          </View>) : null }
          <Text style={ styles.text }>{ value.countryName ? value.countryName .toUpperCase() : placeholder }</Text>
          <Icon style={ styles.icon } type={ 'FontAwesome' } color={ 'white' }
                name={ 'chevron-down' }/>
        </View>
      </View>
    </CountryPicker>
  )
}

const styles = EStyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8
  },
  select: {
    width: '100%',
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  touchFlag: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white',
    fontSize: 16
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginLeft: 16,
    fontWeight: 'bold'
  }
})
