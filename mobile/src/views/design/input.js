import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Icon, Input as NativeBaseInput, InputGroup, Item, Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import {
  ERROR_COLOR,
  OK_COLOR
} from './constants'

export class Input extends Component {
  getBorderStyle(inputStatus) {
    const stylesArray = [styles.item]
    const stylesMapping = {
      'regular': styles.borderRegular,
      'ok': styles.borderOk,
      'warning': styles.borderWarning,
      'error': styles.borderError
    }
    if (stylesMapping[inputStatus]) {
      stylesArray.push(stylesMapping[inputStatus])
    }
    return stylesArray
  }

  getInputTextStyling(inputValue, inputStatus) {
    const stylesArray = [styles.input]
    if (inputValue.length === 0) {
      stylesArray.push(styles.placeholder)
    } else if (inputStatus === 'error') {
      stylesArray.push(styles.textError)
    }
    return stylesArray
  }
  getIconStyling(inputStatus) {
    if (inputStatus === 'error') {
      return styles.iconError
    }
    if (inputStatus === 'ok') {
      return styles.iconOk
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.labelText}</Text>
        <Item style={this.getBorderStyle(this.props.status)}>
          <InputGroup style={styles.inputGroup}>
            <NativeBaseInput style={this.getInputTextStyling(this.props.value, this.props.status)} placeholder={this.props.placeholder}
                            keyboardType={this.props.keyboardType}
                            secureTextEntry={this.props.isSecure}
                            value={this.props.value}
                            onChangeText={ newValue => this.props.onChangeText(newValue) }/>
            {this.props.status === 'error' && (
              <Icon active style={this.getIconStyling(this.props.status)} type="FontAwesome"  name="exclamation-circle" />
            )}
            {this.props.status === 'ok' && (
              <Icon active style={this.getIconStyling(this.props.status)} type="FontAwesome"  name="check" />
            )}
          </InputGroup>
        </Item>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
  item: {
    marginLeft: 0
  },
  borderRegular: {
    borderColor: '#000000'
  },
  borderOk: {
    borderColor: OK_COLOR
  },
  borderError: {
    borderColor: ERROR_COLOR
  },
  borderWarning: {
    borderColor: '#FF9900'
  },
  textError: {
    color: ERROR_COLOR
  },
  inputGroup: {
    backgroundColor: '#F9F9F9'
  },
  iconError: {
    color: ERROR_COLOR
  },
  iconOk: {
    color: OK_COLOR
  },
  input: {
    height: 70,
    paddingLeft: 10
  },
  placeholder: {
    fontFamily: 'Montserrat-ExtraLight'
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    color: '#000000',
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5
  }
})

Input.propTypes = {
  keyboardType: PropTypes.oneOf(['email-address', 'phone-pad']),
  isSecure: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  status: PropTypes.oneOf(['regular', 'ok', 'warning', 'error']).isRequired
}

export default Input