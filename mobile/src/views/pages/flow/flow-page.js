import { Body, Button, Container, Content, Header, Icon, Left, Title } from 'native-base'
import React from 'react'

import { CommonProfileOnboarding } from './steps'

class FlowPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      CurrentStep: CommonProfileOnboarding,
      PreviousStep: null
    }
  }

  onFill = (payload) => {
    this.setState({
      PreviousStep: this.state.CurrentStep,
      CurrentStep: payload.nextStep
    })
  }

  render () {
    const { CurrentStep } = this.state

    return (
      <Container>
        <Content>
          <CurrentStep
            onFill={ this.onFill }
            style={ { marginBottom: 16, marginTop: 16 } }/>

          { /*<Text>Employee steps</Text>*/ }
          { /*<EmployeeKeywords onFill={console.log} style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<EmployeeRole onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<Text>Investee steps</Text>*/ }

          { /*<InvesteeHiring onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvesteeIco onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvesteeMoneySource onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvesteeTeamMembers onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvesteeFundingStage onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvesteeProductStage onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvesteeLinks onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvesteeProjectSetup onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }

          { /*<Text style={ { marginBottom: 16, marginTop: 16 } }>Common LAYOUTS:</Text>*/ }
          { /*<CommonProfileOnboarding onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<CommonProfileType onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }

          { /*<Text style={ { marginBottom: 16, marginTop: 16 } }>Investor LAYOUTS:</Text>*/ }
          { /*<InvestorCompanyLocation onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvestorInvestIn onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvestorTicketSize onFill={ console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvestorCompanyFundingStage onFill= { console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }
          { /*<InvestorCompaniesLocation onFill= { console.log } style={ { marginBottom: 16, marginTop: 16 } }/>*/ }

        </Content>
      </Container>
    )
  }
}

export default FlowPage
