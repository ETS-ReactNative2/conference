import { Button, Icon, View } from 'native-base'
import React from 'react'
import { BackHandler, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { batchActions } from 'redux-batch-enhancer'

import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { globalActions } from '../../../global'
import { PAGES_NAMES } from '../../../navigation'
import { profileActions } from '../../../profile'
import { signUpActions } from '../../../signup'
import { NavigationHeader } from '../../components/header/header'
import { EmployeeRole, InvesteeProjectSetup, InvestorCompanyLocation } from './steps'

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
        <Image style={ { marginRight: 20, width: 24, height: 30 } } source={ WhiteLogo }/>
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

  componentWillUnmount () {
    BackHandler.removeEventListener(
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
    } else {
      try {
        await this.props.startLoading()
        await this.props.uploadProfile()
        this.props.navigation.navigate(PAGES_NAMES.PROFILE_PAGE)
      } catch (err) {
        this.props.showAlertMessage(err)
      } finally {
        this.props.finishLoading()
      }
    }
  }

  render () {
    const { CurrentStep } = this.state

    return (
      <SafeAreaView style={ { flex: 1, backgroundColor: this.state.CurrentStep.BACKGROUND_COLOR || 'white' } }
                    forceInset={ { top: 'always' } }>
        <StatusBar
          translucent={ true }
          barStyle="light-content"
        />
        <View style={ { flex: 1, backgroundColor: this.state.CurrentStep.BACKGROUND_COLOR || 'white' } }>
          <View style={ { flex: 1 } }>
            <NavigationHeader
              onBack={ () => this.onHeaderBackButton() }
              title={ this.props.navigation.getParam('title', I18n.t('flow_page.title')) }
              rightIconSource={ WhiteLogo }/>
            <View style={{ flex: 1}}>
            <CurrentStep
              onFill={ this.onFill }
              style={ { marginBottom: 16, marginTop: 16 } }
            />
            </View>
          </View>
        </View>
      </SafeAreaView>
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
    uploadProfile: () => dispatch(signUpActions.uploadProfile()),
    fetchProfiles: () => dispatch(profileActions.fetchProfiles()),
    startLoading: () => dispatch(batchActions([ globalActions.hideAlert(),
    globalActions.setGlobalLoading(I18n.t('profile_page.upload_loader_text')) ])),
    showAlertMessage: errMessage => dispatch(globalActions.showAlertError(errMessage)),
    finishLoading: () => dispatch(globalActions.unsetGlobalLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowPage)
