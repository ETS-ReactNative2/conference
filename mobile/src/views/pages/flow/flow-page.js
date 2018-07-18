import { Button, Container, Content, Icon, Text } from 'native-base'
import React from 'react'
import { BackHandler } from 'react-native'
import { CommonProfileOnboarding } from './steps'
import { PAGES_NAMES } from '../../../navigation'

class FlowPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        style={{ height: "100%" }}
        transparent
        onPress={navigation.getParam("onHeaderBackButton")}
      >
        <Icon style={{ color: "white" }} name="arrow-back" />
      </Button>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      CurrentStep: CommonProfileOnboarding,
      PreviousSteps: []
    };
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.onBackButtonPressAndroid
    );
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onHeaderBackButton: this.onHeaderBackButton
    });
  }

  onHeaderBackButton = () => {
    if (!this.onBackButtonPressAndroid()) {
      this.props.navigation.goBack();
    }
  };
  onBackButtonPressAndroid = () => {
    const { CurrentStep, PreviousSteps } = this.state;
    const previousStepsCopy = [...PreviousSteps];
    if (CurrentStep && previousStepsCopy.length !== 0) {
      this.setState({
        CurrentStep: previousStepsCopy.pop(),
        PreviousSteps: previousStepsCopy
      });
      return true;
    }
    return false;
  };

  onFill = ({ nextStep, done }) => {
    const { PreviousSteps, CurrentStep } = this.state;
    const previousStepsCopy = [...PreviousSteps];
    previousStepsCopy.push(CurrentStep);
    if (done) {
      this.props.navigation.navigate(PAGES_NAMES.HOME_PAGE);
    } else {
      this.setState({
        PreviousSteps: previousStepsCopy,
        CurrentStep: nextStep
      });
    }
  };

  render() {
    const { CurrentStep } = this.state;

    return (
      <Container>
        <Content>
          <CurrentStep
            onFill={this.onFill}
            style={{ marginBottom: 16, marginTop: 16 }}
          />
        </Content>
      </Container>
    );
  }
}

export default FlowPage;
