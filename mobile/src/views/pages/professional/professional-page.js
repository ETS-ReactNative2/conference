import { Text } from 'native-base'
import React, { Component } from 'react'

class ProfessionalPage extends Component {
  render () {
    const professional = this.props.navigation.getParam('professional', {})
    return (
      <Text>{ JSON.stringify(professional, null, 2) }</Text>
    )
  }
}

export default ProfessionalPage
