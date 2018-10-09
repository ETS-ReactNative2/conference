import { Text } from 'native-base'
import React, { Component } from 'react'
import EStyleSheet from "react-native-extended-stylesheet"
import PropTypes from "prop-types"
import Input from './input'

class InputValidated extends Component {

  getInputStatus = (shouldOverrideStatus, overrideStatusType, isError) => {
    if (shouldOverrideStatus) {
      return overrideStatusType;
    }
    return isError ? 'error' : 'ok'
  }

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
                 status={this.getInputStatus(this.props.overrideStatus, this.props.overrideStatusType, this.props.isError)}
                 >
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
  onChangeText: PropTypes.func.isRequired,
  // Used to override status props of Input component
  // Useful when for example, validation of component should not happen immediately
  overrideStatus: PropTypes.bool,
  // Type of status that should be used when overrideStatus flag is flipped to true
  overrideStatusType: PropTypes.oneOf(['regular', 'ok', 'warning', 'error'])
}

export default InputValidated;
