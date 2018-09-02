import { Text } from 'native-base'
import React, { Component } from 'react'
import EStyleSheet from "react-native-extended-stylesheet"
import PropTypes from "prop-types"
import Input from './input'

class InputValidated extends Component {
  render () {
    return (
        <React.Fragment>
          <Input keyboardType={this.props.keyboardType}
                 isSecure={this.props.isSecure}
                 style={this.props.style}
                 placeholder={this.props.placeholder}
                 value={this.props.value}
                 labelText={this.props.labelText}
                 onChangeText={this.props.onChangeText}
                 status={this.props.isError ? 'error' : 'ok'}>
            {this.props.isError && (
              <Text style={styles.errorText}>{this.props.errorMessage}</Text>
            )}
          </Input>
        </React.Fragment>
    )
  }
}

const styles = EStyleSheet.create({
  inputContainer: {
    flex: 1
  },
  errorText: {
    alignSelf: 'flex-start',
    color: 'red'
  }
})

InputValidated.propTypes = {
    keyboardType: PropTypes.oneOf(['email-address', 'phone-pad']),
    isSecure: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
}

export default InputValidated;
