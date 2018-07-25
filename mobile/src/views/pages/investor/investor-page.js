import { Text } from 'native-base'
import React, { Component } from 'react'

class InvestorPage extends Component {
  render () {
    const investor = this.props.navigation.getParam('investor', {})
    return (
      <Text>{ JSON.stringify(investor, null, 2) }</Text>
    )
  }
}

export default InvestorPage
