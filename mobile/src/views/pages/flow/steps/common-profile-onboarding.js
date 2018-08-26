import { Form } from 'native-base'
import React from 'react'
import { ImageBackground, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import { batchActions } from 'redux-batch-enhancer'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import BackgroundImage from '../../../../assets/images/background_image.png'
import WhiteLogo from '../../../../assets/logos/logo-white.png'
import { PAGES_NAMES } from '../../../../navigation/index'
import { profileActions } from '../../../../profile'
import { signUpActions } from '../../../../signup'
import Alert from '../../../components/alert/alert'
import { NavigationHeader } from '../../../components/header/header'
import HeaderSkip from '../../../components/header/header-skip'
import { BlackButton, PrimaryButton } from '../../../design/buttons'
import FlowInputValidated from '../../../design/flow-input-validated'
import FlowInput from '../../../design/flow-inputs'
import { ImagePageContainer } from '../../../design/image-page-container'
import { StepTitle } from '../../../design/step-title'

// const errorStyleOverride = {
//   border: {
//     borderColor: '#000000',
//     borderBottomColor: '#000000'
//   },
//   text: {
//     color: '#000000'
//   }
// }

class CommonProfileOnboarding extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      title: this.props.title,
      company: this.props.company,
      twitter: this.props.twitter,
      facebook: this.props.facebook,
      telegram: this.props.telegram,
      linkedin: this.props.linkedin
    }
    this.state.isFormValid = this.isFormValid()
  }

  validateProfileFirstName = () => {
    return validator.isLength(this.state.firstName, { min: 3, max: undefined })
  }

  validateProfileLastName = () => {
    return validator.isLength(this.state.lastName, { min: 3, max: undefined })
  }

  isFormValid = () => {
    const isNameCorrect = this.validateProfileFirstName() && this.validateProfileLastName()
    const isFormValid = isNameCorrect
    return isFormValid
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.saveProfileInfo({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      title: this.state.title,
      company: this.state.company,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      telegram: this.state.telegram,
      linkedin: this.state.linkedin
    }, PAGES_NAMES.PROFILE_TYPE_PAGE)
    if(this.props.edit) {
      this.props.navigation.goBack()
    }
  }

  handleFieldChange = (newValue, name) => {
    if (this.props.isError) {
      this.props.clearErrors()
    }
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  }

  render () {
    const { edit, navigation } = this.props
    return (
      <ImagePageContainer>
      {/*<SafeAreaView style={ { flex: 1, backgroundColor: '#000000' } } forceInset={ { top: 'always' } }>*/}
        {/*<ImageBackground source={ BackgroundImage } style={ styles.imageContainer } blurRadius={ 1 }>*/}
          {/*<LinearGradient style={ { flex: 1 } } locations={ [ 0, 0.4, 0.8 ] }*/}
                          {/*colors={ [ 'rgba(0, 0, 0, 1)', 'rgba(255, 0, 92 ,0.8)', 'rgba(156, 26, 73, 0.7)' ] }>*/}
            <View style={ styles.content }>
              <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
                {
                  edit && (
                    <NavigationHeader title={ I18n.t( 'flow_page.common.profile_onboarding.edit_header') }
                                rightIconSource={ WhiteLogo }
                                titleStyle={ [styles.headerTitle, { marginTop: 12}] }
                                onBack={ () => { navigation.goBack() }}/>

                  )
                }
                { !edit && (
                  <HeaderSkip title={ I18n.t( edit ? 'common.back' : 'flow_page.common.profile_onboarding.header') }
                              rightIconSource={ WhiteLogo }
                              titleStyle={ styles.headerTitle }
                              onSkipClick={ () => { navigation.navigate(PAGES_NAMES.HOME_PAGE) } }/>
                )
                }
                <View style={ styles.pageTitleContainer }>
                  <StepTitle text={ I18n.t('flow_page.common.profile_onboarding.title') }
                             textStyle={ styles.pageTitle }/>
                </View>
                { this.props.isError && (
                  <Alert color="error" message={ this.props.errorMessage } errorStyleOverride={ errorStyleOverride }/>
                ) }
                <View style={ { flex: 1 } }>
                  <Form>
                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInputValidated
                        floatingLabel={ true }
                        value={ this.state.firstName }
                        placeholder={ I18n.t('flow_page.common.profile_onboarding.first_name') }
                        labelText={ I18n.t('flow_page.common.profile_onboarding.first_name') }
                        isError={ !this.validateProfileFirstName(this.state.firstName) }
                        errorMessage={ I18n.t('common.errors.incorrect_profile_first_name') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, 'firstName') }/>
                    </View>
                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInputValidated
                        floatingLabel={ true }
                        value={ this.state.lastName }
                        placeholder={ I18n.t('flow_page.common.profile_onboarding.last_name') }
                        labelText={ I18n.t('flow_page.common.profile_onboarding.last_name') }
                        isError={ !this.validateProfileLastName(this.state.lastName) }
                        errorMessage={ I18n.t('common.errors.incorrect_profile_last_name') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, 'lastName') }/>
                    </View>
                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInput
                        floatingLabel={ true }
                        placeholder={ 'Job title' }
                        labelText={ I18n.t('flow_page.common.profile_onboarding.titleField') }
                        value={ this.state.title }
                        status='regular'
                        onChangeText={ text => this.handleFieldChange(text, 'title') }/>
                    </View>
                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInput
                        floatingLabel={ true }
                        placeholder={ 'Company' }
                        labelText={ I18n.t('flow_page.common.profile_onboarding.company') }
                        value={ this.state.company }
                        status='regular'
                        onChangeText={ text => this.handleFieldChange(text, 'company') }/>
                    </View>

                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInput
                        floatingLabel={ true }
                        status='regular'
                        value={ this.state.twitter }
                        placeholder=''
                        labelText={ I18n.t('common.personal_twitter') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, 'twitter') }/>
                    </View>
                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInput
                        floatingLabel={ true }
                        status='regular'
                        value={ this.state.facebook }
                        placeholder=''
                        labelText={ I18n.t('common.personal_facebook') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, 'facebook') }/>
                    </View>
                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInput
                        floatingLabel={ true }
                        status='regular'
                        value={ this.state.telegram }
                        placeholder=''
                        labelText={ I18n.t('common.personal_telegram') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, 'telegram') }/>
                    </View>
                    <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                      <FlowInput
                        floatingLabel={ true }
                        status='regular'
                        value={ this.state.linkedin }
                        placeholder=''
                        labelText={ I18n.t('common.personal_linkedin') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, 'linkedin') }/>
                    </View>
                  </Form>
                </View>
              </ScrollView>
              <View style={ { margin: 8 } }>
                <PrimaryButton
                  text={ I18n.t('common.next') }
                  disabled={ !this.state.isFormValid }
                  onPress={ this.handleSubmit }
                />
              </View>
            </View>
          {/*</LinearGradient>*/}
        {/*</ImageBackground>*/}
      {/*</SafeAreaView>*/}
      </ImagePageContainer>
    )
  }
}

const styles = EStyleSheet.create({
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  },
  content: {
    flex: 1
  },
  pageTitleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  },
  headerTitle: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  }
})

const mapStateToProps = state => {
  return {
    firstName: state.signUp.profile.firstName,
    lastName: state.signUp.profile.lastName,
    title: state.signUp.profile.title,
    company: state.signUp.profile.company,
    twitter: state.signUp.profile.twitter,
    facebook: state.signUp.profile.facebook,
    telegram: state.signUp.profile.telegram,
    linkedin: state.signUp.profile.linkedin,
    isError: state.signUp.auth.profile.isError,
    errorMessage: state.signUp.auth.profile.errorMessage,
    edit: false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfileInfo: (profileInfo, redirectPage) => dispatch(batchActions([ signUpActions.saveProfileInfo(profileInfo),
      signUpActions.saveProfileOnboardingInfo(profileInfo, redirectPage) ])),
    clearErrors: () => dispatch(signUpActions.clearSaveProfileError())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonProfileOnboarding)

export const EditBasicInfo = connect(
  state => ({
    firstName: state.profile.basic.firstName,
    lastName: state.profile.basic.lastName,
    title: state.profile.basic.title,
    company: state.profile.basic.company,
    twitter: state.profile.basic.twitter,
    facebook: state.profile.basic.facebook,
    telegram: state.profile.basic.telegram,
    linkedin: state.profile.basic.linkedin,
    edit: true
  }),
  dispatch => ({
    saveProfileInfo: (profile) => {dispatch(profileActions.updateBasic(profile))},
    clearErrors: () => {}
  })
)(CommonProfileOnboarding)
