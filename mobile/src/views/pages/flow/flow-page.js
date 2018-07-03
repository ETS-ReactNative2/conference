import { Container, Content, Text } from 'native-base'
import React from 'react'
import { InvesteeProjectSetup } from './steps'

class FlowPage extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <InvesteeProjectSetup/>
        </Content>
      </Container>
    )
  }
}

export default FlowPage
