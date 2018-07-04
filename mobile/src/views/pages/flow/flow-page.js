import { Container, Content, Text } from 'native-base'
import React from 'react'
import {
  EmployeeKeywords,
  EmployeeRole,
  InvesteeFundingStage,
  InvesteeLinks,
  InvesteeProductStage,
  InvesteeProjectSetup,
  InvesteeTeamMembers
} from './steps'

class FlowPage extends React.Component {
  render () {
    return (
      <Container>
        <Content>
          <Text>Employee steps</Text>
          <EmployeeKeywords onFill={console.log} style={ { marginBottom: 16, marginTop: 16 } }/>
          <EmployeeRole onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>
          <Text>Investee steps</Text>
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
