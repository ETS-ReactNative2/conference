import { Container, Content, Text } from 'native-base'
import React from 'react'
import { CommonProfileOnboarding } from './steps'

class FlowPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      CurrentStep: CommonProfileOnboarding,
      PreviousStep: null,
      done: false
    }
  }

  onFill = ({ nextStep, done }) => {

    this.setState({
      PreviousStep: this.state.CurrentStep,
      CurrentStep: nextStep,
      done
    })
  }

  render () {
    const { CurrentStep, done } = this.state

    return (
      <Container>
        <Content>
          { !done &&
          <CurrentStep
            onFill={ this.onFill }
            style={ { marginBottom: 16, marginTop: 16 } }/>
          }
          { done &&
          <Text>Done</Text>
          }
        </Content>
      </Container>
    )
  }
}

export default FlowPage
