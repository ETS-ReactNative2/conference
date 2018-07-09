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
        </Content>
      </Container>
    )
  }
}

export default FlowPage
