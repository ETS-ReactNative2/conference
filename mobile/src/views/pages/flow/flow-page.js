import { Button, Icon, View } from 'native-base'
import React from 'react'
import { BackHandler, Image } from 'react-native'
import { connect } from 'react-redux'
import { PAGES_NAMES } from '../../../navigation'
import { signUpActions } from '../../../signup'
import { EmployeeRole, InvesteeProjectSetup, InvestorCompanyLocation } from './steps'
import WhiteLogo from '../../../assets/logos/logo-white.png'

class FlowPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      title: navigation.getParam('getTitle'),
      headerStyle: {
        backgroundColor: navigation.getParam('getBackgroundColor')
      },
      headerLeft: (
        <Button
          style={ { height: '100%' } }
          transparent
          onPress={ navigation.getParam('onHeaderBackButton') }>
          <Icon style={ { color: 'white' } } name='arrow-back'/>
        </Button>
      ),
      headerRight: (
        <Image style={ { marginRight: 20 } } source={ WhiteLogo }/>
      )

    })
  }

  constructor (props) {
    super(props)
    this.state = {
      CurrentStep: this.getStepForType(),
      PreviousSteps: []
    }
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressAndroid
    )
  }

  componentDidMount () {
    this.props.navigation.setParams({
      onHeaderBackButton: this.onHeaderBackButton,
      getBackgroundColor: this.getBackgroundColor(),
      getTitle: this.getTitle()
    })
  }

  getStepForType () {
    switch (this.props.profileType) {
      case 'employee':
        return EmployeeRole
      case 'investor':
        return InvestorCompanyLocation
      case 'investee':
        return InvesteeProjectSetup
    }
  }

  getBackgroundColor = () => {
    return this.state.CurrentStep.BACKGROUND_COLOR || '#603695'
  }

  getTitle = () => {
    const title = this.state.CurrentStep.TITLE || 'Match questions'
    return title.toUpperCase()
  }

  onHeaderBackButton = () => {
    if (!this.onBackButtonPressAndroid()) {
      this.props.navigation.goBack()
      this.props.navigation.setParams({
        getBackgroundColor: this.getBackgroundColor(),
        getTitle: this.getTitle()
      })
    }
  }

  onBackButtonPressAndroid = () => {
    const { CurrentStep, PreviousSteps } = this.state
    const previousStepsCopy = [ ...PreviousSteps ]
    if (CurrentStep && previousStepsCopy.length !== 0) {
      this.setState({
        CurrentStep: previousStepsCopy.pop(),
        PreviousSteps: previousStepsCopy
      }, () => {
        this.props.navigation.setParams({
          getBackgroundColor: this.getBackgroundColor(),
          getTitle: this.getTitle()
        })
      })
      return true
    }
    return false
  }

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
      }, () => {
        this.props.navigation.setParams({
          getBackgroundColor: this.getBackgroundColor(),
          getTitle: this.getTitle()
        })
      })
    }
    else {
      try {
        await uploadProfile()
        navigation.navigate(PAGES_NAMES.HOME_PAGE)
      } catch (err) {
        console.error(err)
      }
    }
  }

  render () {
    const { CurrentStep } = this.state

    return (
      <View style={ { flex:1, backgroundColor: this.state.CurrentStep.BACKGROUND_COLOR || 'white' } }>
        <View style={ { flex: 1 } }>
          <CurrentStep
            onFill={ this.onFill }
            style={ { marginBottom: 16, marginTop: 16 } }
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    profileType: state.signUp.profile.type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadProfile: () => dispatch(signUpActions.uploadProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowPage)
