import { Button, Container, Content, Icon } from 'native-base'
import React from 'react'
import { BackHandler } from 'react-native'
import { CommonProfileOnboarding } from './steps'

class FlowPage extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <Button transparent onPress={ navigation.getParam('onHeaderBackButton') }>
      <Icon name='arrow-back'/>
    </Button>
  })

  constructor (props) {
    super(props)
    this.state = {
      CurrentStep: CommonProfileOnboarding,
      PreviousSteps: []
    }
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
  }

  componentDidMount () {
    this.props.navigation.setParams({ onHeaderBackButton: this.onHeaderBackButton })
  }

  onHeaderBackButton = () => {
    if (!this.onBackButtonPressAndroid()) {
      this.props.navigation.goBack()
    }
  }

  onBackButtonPressAndroid = () => {
    const { CurrentStep, PreviousSteps } = this.state
    if (CurrentStep && PreviousSteps.length !== 0) {
      this.setState({
        CurrentStep: PreviousSteps.pop(),
        PreviousSteps
      })
      return true
    }
    return false
  }

  onFill = (payload) => {
    const { PreviousSteps, CurrentStep } = this.state
    PreviousSteps.push(CurrentStep)
    this.setState({
      PreviousSteps,
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
