import { Container, Content } from 'native-base'
import React from 'react'
import {
  InvesteeFundingStage,
  InvesteeHiring,
  InvesteeIco,
  InvesteeLinks,
  InvesteeMoneySource,
  InvesteeProductStage,
  InvesteeProjectSetup,
  InvesteeTeamMembers
} from './steps'

class FlowPage extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <InvesteeHiring onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeIco onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeMoneySource onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeTeamMembers onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeFundingStage onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeProductStage onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeLinks onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <InvesteeProjectSetup onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
        </Content>
      </Container>
    )
  }
}

export default FlowPage
