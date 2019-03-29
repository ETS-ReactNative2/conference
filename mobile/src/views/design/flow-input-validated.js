import { Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FlowInput } from './flow-inputs'

class FlowInputValidated extends Component {

  getInputStatus = (shouldOverrideStatus, overrideStatusType, isError, customStatus) => {
    if (shouldOverrideStatus) {
      return overrideStatusType
    }
    if (isError) {
      return 'error'
    }
    return customStatus || 'ok'
  }

  render () {
    return (
      <React.Fragment>
        <FlowInput
          floatingLabel={this.props.floatingLabel}
          placeholder={ this.props.placeholder }
          value={ this.props.value }
          labelText={ this.props.labelText }
          onChangeText={ this.props.onChangeText }
          status={this.getInputStatus(this.props.overrideStatus, this.props.overrideStatusType, this.props.isError, this.props.status)}
          errorStyleOverride={this.props.errorStyleOverride}
          keyboardType={this.props.keyboardType}
        />
        { this.props.isError && (
          <Text style={ [styles.errorText, this.props.errorStyleOverride ? this.props.errorStyleOverride.text : ''] }>{ this.props.errorMessage }</Text>
        ) }
      </React.Fragment>
    )
  }
}

const styles = EStyleSheet.create({
  errorText: {
    alignSelf: 'flex-end',
    color: 'red'
  }
})

FlowInputValidated.propTypes = {
  keyboardType: PropTypes.string,
  floatingLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  errorStyleOverride: PropTypes.shape({
    border: PropTypes.shape({
      borderColor: PropTypes.string,
      borderBottomColor: PropTypes.string
    }),
    text: PropTypes.shape({
      color: PropTypes.string
    })
  }),
  // Used to override status props of Input component
  // Useful when for example, validation of component should not happen immediately
  overrideStatus: PropTypes.bool,
  // Type of status that should be used when overrideStatus flag is flipped to true
  overrideStatusType: PropTypes.oneOf(['regular', 'ok', 'warning', 'error'])
}

export default FlowInputValidated
