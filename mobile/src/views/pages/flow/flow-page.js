import { Button, Container, Content, Icon, Text } from 'native-base'
import React from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { signUpActions } from '../../../signup'
import { CommonProfileOnboarding, EmployeeKeywords, EmployeeRole } from './steps'
import { PAGES_NAMES } from '../../../navigation'

class FlowPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        style={ { height: '100%' } }
        transparent
        onPress={ navigation.getParam('onHeaderBackButton') }>
        <Icon style={ { color: 'white' } } name='arrow-back'/>
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
      'hardwareBackPress',
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
    const { CurrentStep, PreviousSteps } = this.state
    const previousStepsCopy = [ ...PreviousSteps ]
    if (CurrentStep && previousStepsCopy.length !== 0) {
      this.setState({
        CurrentStep: previousStepsCopy.pop(),
        PreviousSteps: previousStepsCopy
      });
      return true;
    }
    return false;
  };

  onFill = async ({ nextStep, done }) => {
    const { PreviousSteps, CurrentStep } = this.state
    const { navigation, uploadProfile } = this.props
    const previousStepsCopy = [ ...PreviousSteps ]
    previousStepsCopy.push(CurrentStep)
    if (!done) {
      this.setState({
        PreviousSteps: previousStepsCopy,
        CurrentStep: nextStep,
        done
      })
    }
    else {
      try {
        await uploadProfile()
        //TODO
        navigation.navigate(PAGES_NAMES.HOME_PAGE);
      } catch (err) {
        console.error(err)
      }
    }
  }

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

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    uploadProfile: () => dispatch(signUpActions.uploadProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowPage)
