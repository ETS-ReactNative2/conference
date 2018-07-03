import { Container, Content } from 'native-base'
import React from 'react'
import { InvesteeLinks, InvesteeProjectSetup } from './steps'

class FlowPage extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <InvesteeProjectSetup onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeLinks onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
        </Content>
      </Container>
    )
  }
}

export default FlowPage
