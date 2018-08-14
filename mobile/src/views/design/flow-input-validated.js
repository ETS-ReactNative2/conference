import { Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FlowInput } from './flow-inputs'

class FlowInputValidated extends Component {
  render () {
    return (
      <React.Fragment>
        <FlowInput
          floatingLabel={this.props.floatingLabel}
          placeholder={ this.props.placeholder }
          value={ this.props.value }
          labelText={ this.props.labelText }
          onChangeText={ this.props.onChangeText }
          status={ this.props.isError ? 'error' : 'ok' }
          errorStyleOverride={this.props.errorStyleOverride}
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
  floatingLabel: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
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
  })
}

export default FlowInputValidated
