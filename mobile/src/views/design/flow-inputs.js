import { Icon, Input as NativeBaseInput, Item, Label, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { ERROR_COLOR, OK_COLOR } from './constants'

export class FlowInput extends Component {
  getBorderStyle (inputStatus) {
    const stylesArray = [ styles.item ]
    const stylesMapping = {
      'regular': styles.borderRegular,
      'ok': styles.borderOk,
      'warning': styles.borderWarning,
      'error': styles.borderError
    }
    if (stylesMapping[ inputStatus ]) {
      stylesArray.push(stylesMapping[ inputStatus ])
    }
    if (inputStatus === "error" && this.props.errorStyleOverride) {
      stylesArray.push(this.props.errorStyleOverride.border)
    }
    return stylesArray
  }

  getInputTextStyling (inputValue, inputStatus, isSingleLine) {
    const stylesArray = [ styles.input ]
    if (isSingleLine) {
      stylesArray.push(styles.inputSingleLine)
    }
    if (inputValue.length === 0) {
      stylesArray.push(styles.placeholder)
    } else if (inputStatus === 'error') {
      stylesArray.push(styles.textError)
    }
    if (inputStatus === "error" && this.props.errorStyleOverride) {
      stylesArray.push(this.props.errorStyleOverride.text)
    }
    return stylesArray
  }

  getIconStyling (inputStatus) {
    if (inputStatus === 'error') {
      return this.props.errorStyleOverride ? this.props.errorStyleOverride.text : styles.iconError
    }
    if (inputStatus === 'ok') {
      return styles.iconOk
    }
  }

  renderIcon () {
    switch (this.props.status) {
      case 'error':
        return (
          <Icon active style={ this.getIconStyling(this.props.status) } type="FontAwesome" name="exclamation-circle"/>
        )
      case 'ok':
        return (
          <Icon active style={ this.getIconStyling(this.props.status) } type="FontAwesome" name="check"/>
        )
      default:
        return null
    }
  }

  renderLeftIcon = () => {
    if (this.props.leftIcon) {
      return <Icon active name={ this.props.leftIcon } color={ 'white' } style={ { color: 'white' } }/>
    }
    return <View/>
  }

  render () {
    return (
      <View style={ styles.container }>
        { !this.props.floatingLabel &&
        <Text style={ styles.label }>{ this.props.labelText }</Text>
        }

        <Item floatingLabel={ this.props.floatingLabel }
              error={ this.props.status === 'error' }
              success={ this.props.status === 'ok' }
              style={ this.getBorderStyle(this.props.status) }>
          { this.renderLeftIcon() }
          { this.props.floatingLabel &&
          <Label style={ styles.floatingLabel }>{ this.props.labelText }</Label>
          }
          <NativeBaseInput
            keyboardType={ this.props.keyboardType || 'default' }
            multiline={ this.props.multiline }
            numberOfLines={ this.props.numberOfLines }
            maxLength={ this.props.maxLength }
            style={ this.getInputTextStyling(this.props.value, this.props.status, !this.props.multiline) }
            value={ this.props.value }
            onChangeText={ newValue => this.props.onChangeText(newValue) }/>
          { this.renderIcon() }
        </Item>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'transparent'
  },
  item: {
    marginLeft: 0,
    borderBottomWidth: 2
  },
  borderRegular: {
    borderBottomColor: '#ccffffff'
  },
  borderOk: {
    borderBottomColor: OK_COLOR
  },
  borderError: {
    borderBottomColor: ERROR_COLOR
  },
  borderWarning: {
    borderBottomColor: '#FF9900'
  },
  textError: {
    color: ERROR_COLOR
  },
  iconError: {
    color: ERROR_COLOR
  },
  iconOk: {
    color: OK_COLOR
  },
  input: {
    paddingLeft: 10,
    color: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 0
  },
  inputSingleLine: {
    height: 70
  },
  placeholder: {
    fontFamily: 'Montserrat-ExtraLight',
    color: 'white',
    fontWeight: 'bold'
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5
  },
  floatingLabel: {
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5
  }
})

FlowInput.propTypes = {
  keyboardType: PropTypes.string,
  leftIcon: PropTypes.string,
  floatingLabel: PropTypes.bool,
  value: PropTypes.string,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
  maxLength: PropTypes.number,
  labelText: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  status: PropTypes.oneOf([ 'regular', 'ok', 'warning', 'error' ]).isRequired,
  errorStyleOverride: PropTypes.shape({
    border: PropTypes.shape({
      borderColor: PropTypes.string,
      borderBottomColor: PropTypes.string
    }),
    text: PropTypes.shape({
      color: PropTypes.string
    })
  })
}

export default FlowInput
