import { Button, Icon, Text } from 'native-base'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  BLACK_DISABLED_COLOR,
  BLUE_COLOR,
  DISABLED_COLOR, PRIMARY_COLOR,
  PRIMARY_DISABLED_COLOR,
  PRIMARY_DISABLED_TEXT_COLOR
} from './constants'

function BaseButton({onPress, disabled, style, children}) {
  const styles = baseButton
  return (
    <Button disabled={ disabled } onPress={ onPress } style={ disabled ? [styles.disabledButton, style] : [styles.button, style] }>
      { children }
    </Button>
  )
}

export function BlackButton ({ text = 'Example text', onPress, disabled }) {
  const styles = blackButtonStyles
  return (
    <BaseButton disabled={ disabled } onPress={ onPress } style={ disabled ? styles.disabledButton : styles.button }>
      <Text style={ disabled ? styles.disabledText : styles.text }>{ text.toUpperCase() }</Text>
    </BaseButton>
  )
}

export function OutlineBlackButton ({ text = 'Example text', onPress, disabled, icon }) {
  const styles = outlineBlackButtonStyles
  return (
    <BaseButton disabled={ disabled } onPress={ onPress } style={ disabled ? styles.disabledButton : styles.button }>
      { icon && <Icon active color='#000' name={icon}></Icon> }
      <Text style={ disabled ? styles.disabledText : styles.text }>{ text.toUpperCase() }</Text>
    </BaseButton>
  )
}

export function OutlineWhiteButton ({ text = 'Example text', onPress, disabled, icon }) {
  const styles = outlineWhiteButtonStyles
  return (
    <BaseButton disabled={ disabled } onPress={ onPress } style={ disabled ? styles.disabledButton : styles.button }>
      { icon && <Icon active color='#fff' name={icon}></Icon> }
      <Text style={ disabled ? styles.disabledText : styles.text }>{ text.toUpperCase() }</Text>
    </BaseButton>
  )
}

export function PrimaryButton ({ text = 'Example text', onPress, disabled }) {
  const styles = primaryButtonStyles
  return (
    <BaseButton disabled={ disabled } style={ disabled ? styles.disabledButton : styles.button } onPress={ onPress }>
      <Text style={ disabled ? styles.disabledText : styles.text }>{ text.toUpperCase() }</Text>
    </BaseButton>
  )
}

export function BlueButton ({ text, onPress, disabled, icon}){
  const styles = blueButtonStyles
  return (
    <BaseButton disabled={ disabled } style={ disabled ? styles.disabledButton : styles.button } onPress={ onPress }>
      { icon && <Icon active color='#fff' name={icon}></Icon> }
      <Text style={ disabled ? styles.disabledText : styles.text }>{ text.toUpperCase() }</Text>
    </BaseButton>
  )
}

const baseButton = EStyleSheet.create({
  button: {
    maxWidth: 360,
    width: '100%',
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 0
  },
  disabledButton: {
    width: '100%',
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  text: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold'
  },
  disabledText: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-SemiBold'
  }
})

const blueButtonStyles = EStyleSheet.create({
  button: {
    backgroundColor: BLUE_COLOR
  },
  disabledButton: {
    backgroundColor: BLUE_COLOR
  },
  text: {
    color: '#fff'
  },
  disabledText: {
    color: PRIMARY_DISABLED_TEXT_COLOR
  }
})

const primaryButtonStyles = EStyleSheet.create({
  button: {
    backgroundColor: PRIMARY_COLOR
  },
  disabledButton: {
    backgroundColor: PRIMARY_DISABLED_COLOR,
    borderWidth: 2,
    borderColor: PRIMARY_DISABLED_COLOR
  },
  text: {
    color: '#fff'
  },
  disabledText: {
    color: PRIMARY_DISABLED_TEXT_COLOR
  }
})

const outlineWhiteButtonStyles = EStyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff'
  },
  disabledButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: DISABLED_COLOR
  },
  text: {
    color: '#fff'
  },
  disabledText: {
    color: DISABLED_COLOR
  }
})

const outlineBlackButtonStyles = EStyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000'
  },
  disabledButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: DISABLED_COLOR
  },
  text: {
    color: '#000'
  },
  disabledText: {
    color: DISABLED_COLOR
  }
})

const blackButtonStyles = EStyleSheet.create({
  button: {
    backgroundColor: '#000'
  },
  disabledButton: {
    backgroundColor: DISABLED_COLOR,
  },
  text: {},
  disabledText: {
    color: BLACK_DISABLED_COLOR
  }
})
