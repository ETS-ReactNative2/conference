import { Icon, Input, Item, Label, Text, View } from 'native-base'
import React, { Component } from 'react'
import EStyleSheet from "react-native-extended-stylesheet"
import PropTypes from "prop-types"

class ValidatedInput extends Component {
  constructor (props) {
    super(props)
      this.state = {
        value: this.props.value || ''
    }
  }
  onValueChanged (newValue) {
      this.setState( { value: newValue} )
      this.props.onChangeText(newValue)
  }
  render () {
    return (
        <React.Fragment>
          <Item floatingLabel={this.props.floatingLabel}>
           {this.props.iconProps && (
             <Icon {...this.props.iconProps}/>
           )}
           <Label>{this.props.labelText}</Label>
           <Input {...this.props} onChangeText={ newValue => this.onValueChanged(newValue) }/>
           </Item>
           {this.props.isError && (
             <Text style={styles.errorText}>{this.props.errorMessage}</Text>
           )}
        </React.Fragment>
    )
  }
}

const styles = EStyleSheet.create({
  inputContainer: {
      flex: 1
  },
  errorText: {
    alignSelf: 'center',
    color: 'red'
  }
})

ValidatedInput.propTypes = {
    floatingLabel: PropTypes.bool,
    value: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired
}

export default ValidatedInput;
