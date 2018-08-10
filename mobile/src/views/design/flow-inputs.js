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
    return stylesArray
  }

  getInputTextStyling (inputValue, inputStatus) {
    const stylesArray = [ styles.input ]
    if (inputValue.length === 0) {
      stylesArray.push(styles.placeholder)
    } else if (inputStatus === 'error') {
      stylesArray.push(styles.textError)
    }
    return stylesArray
  }

  getIconStyling (inputStatus) {
    if (inputStatus === 'error') {
      return styles.iconError
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
          { this.props.floatingLabel &&
          <Label style={ styles.floatingLabel }>{ this.props.labelText }</Label>
          }
          <NativeBaseInput
            style={ this.getInputTextStyling(this.props.value, this.props.status) }
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
  inputGroup: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },
  iconError: {
    color: ERROR_COLOR
  },
  iconOk: {
    color: OK_COLOR
  },
  input: {
    height: 70,
    paddingLeft: 10,
    color: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 0
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
  floatingLabel: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  status: PropTypes.oneOf([ 'regular', 'ok', 'warning', 'error' ]).isRequired
}

export default FlowInput
