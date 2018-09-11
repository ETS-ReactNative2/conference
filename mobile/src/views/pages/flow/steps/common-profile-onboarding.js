import { Form, Text, Thumbnail } from 'native-base'
import React from 'react'
import { ScrollView, TouchableHighlight, View, KeyboardAvoidingView, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { batchActions } from 'redux-batch-enhancer'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import WhiteLogo from '../../../../assets/logos/ico_white.png'
import { PAGES_NAMES } from '../../../../navigation/index'
import { profileActions } from '../../../../profile'
import { signUpActions } from '../../../../signup'
import { globalActions } from '../../../../global'
import { NavigationHeader } from '../../../components/header/header'
import HeaderSkip from '../../../components/header/header-skip'
import { BlueButton, PrimaryButton } from '../../../design/buttons'
import FlowInputValidated from '../../../design/flow-input-validated'
import FlowInput from '../../../design/flow-inputs'
import { ImagePageContainer } from '../../../design/image-page-container'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'

const options = {
  title: I18n.t('flow_page.common.profile_onboarding.select_image'),
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

const linkedInUsernameValidator = /^[a-zA-Z0-9-]{3,100}$/
const telegramUsernameValidator = /^[a-zA-Z0-9_]{5,32}$/

class CommonProfileOnboarding extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      company: this.props.company,
      telegram: this.props.telegram,
      linkedin: this.props.linkedin,
      avatarSource: this.props.imageUrl
    }
    this.state.isFormValid = this.isFormValid()
  }

  validateProfileFirstName = () => {
    return validator.isLength(this.state.firstName, { min: 2, max: undefined })
  }

  validateProfileLastName = () => {
    return validator.isLength(this.state.lastName, { min: 2, max: undefined })
  }

  validateLinkedInUserName = () => {
    const { linkedin } = this.state
    return !linkedin
      || !linkedin.length
      || linkedInUsernameValidator.test(this.state.linkedin)
  }

  validateTelegramUserName = () => {
    const { telegram } = this.state
    return !telegram
      || !telegram.length
      || telegramUsernameValidator.test(this.state.telegram)
  }

  isFormValid = () => {
    const isNameCorrect = this.validateProfileFirstName()
                          && this.validateProfileLastName()
                          && this.validateLinkedInUserName()
                          && this.validateTelegramUserName()
    const isFormValid = isNameCorrect
    return isFormValid
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = async () => {
    try {
      await this.props.startLoading()
      await this.props.saveProfileInfo({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        company: this.state.company,
        telegram: this.state.telegram,
        linkedin: this.state.linkedin,
        avatarSource: this.state.avatarSource
      })
      if (this.props.edit) {
        this.props.navigation.goBack()
      } else {
        this.props.navigation.navigate(PAGES_NAMES.HOME_PAGE)
      }
    } catch (err) {
      this.props.showAlertMessage(err)
    } finally {
      this.props.finishLoading()
    }
  }

  handleFieldChange = (newValue, name) => {
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  }

  handleGetImage = () => {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel || response.error || response.customButton) {
        return
      }
      else {
        let source = { uri: response.uri, data: response.data }
        this.setState({
          avatarSource: source
        })
      }
    })
  }

  render () {
    const { edit, navigation } = this.props
    return (
      <ImagePageContainer>
        <View style={ styles.content }>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={64} enabled={Platform.OS === "ios"}>
            <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
              {
                edit && (
                  <NavigationHeader
                    title={ I18n.t('flow_page.common.profile_onboarding.edit_header') }
                    rightIconSource={ WhiteLogo }
                    onBack={ () => { navigation.goBack() } }
                  />
                )
              }
              { !edit && (
                  <HeaderSkip
                    title={ I18n.t(edit ? 'common.back' : 'flow_page.common.profile_onboarding.header') }
                    rightIconSource={ WhiteLogo }
                    onSkipClick={ () => { navigation.navigate(PAGES_NAMES.HOME_PAGE) } }
                  />
                )
              }
              <View style={ styles.pageTitleContainer }>
                <StepTitle
                  text={ I18n.t('flow_page.common.profile_onboarding.title') }
                  textStyle={ styles.pageTitle }
                />
              </View>
              { this.props.isError && (
                <Alert color="error" message={ this.props.errorMessage }/>
              ) }
              <View style={ { flex: 1 } }>
                <Form>
                  <Subheader text={ I18n.t('flow_page.common.profile_onboarding.avatar') }/>
                  <View style={ { margin: 8 } }>
                    {
                      !this.state.avatarSource.uri ? (
                        <BlueButton text={ I18n.t('flow_page.common.profile_onboarding.choose_image') } onPress={ this.handleGetImage }/>) : null
                    }
                    { this.state.avatarSource.uri ? (
                      <View style={ { width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 8 } }>
                        <TouchableHighlight onPress={ this.handleGetImage } underlayColor='transparent'>
                          <Thumbnail large={ true } square={ true } style={ { width: undefined, height: 300 } }
                                    source={ { uri: `${this.state.avatarSource.uri}?w=500&h=500` }}/>
                        </TouchableHighlight>
                        <Text style={ { color: 'white', textAlign: 'center', marginTop: 8 } }>{ I18n.t('flow_page.common.profile_onboarding.change_image') }</Text>
                      </View>
                    ) : null }
                  </View>
                  <Subheader text={ 'Basic info' }/>
                  <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                    <FlowInputValidated
                      floatingLabel={ true }
                      value={ this.state.firstName }
                      placeholder={ I18n.t('flow_page.common.profile_onboarding.first_name') }
                      labelText={ I18n.t('flow_page.common.profile_onboarding.first_name') }
                      isError={ !this.validateProfileFirstName(this.state.firstName) }
                      errorMessage={ I18n.t('common.errors.incorrect_profile_first_name') }
                      onChangeText={ (newValue) => this.handleFieldChange(newValue, 'firstName') }
                    />
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
                      placeholder={ 'Company' }
                      labelText={ I18n.t('flow_page.common.profile_onboarding.company') }
                      value={ this.state.company }
                      status='regular'
                      onChangeText={ text => this.handleFieldChange(text, 'company') }/>
                  </View>
                  <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                    <FlowInputValidated
                      floatingLabel={ true }
                      status='regular'
                      value={ this.state.telegram }
                      placeholder=''
                      labelText={ I18n.t('common.telegram_url') }
                      isError={!this.validateTelegramUserName(this.state.telegram)}
                      errorMessage={I18n.t('common.errors.incorrect_telegram_user_name')}
                      onChangeText={ (newValue) => this.handleFieldChange(newValue, 'telegram') }/>
                  </View>
                  <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
                    <FlowInputValidated
                      floatingLabel={ true }
                      status='regular'
                      value={ this.state.linkedin }
                      placeholder=''
                      labelText={ I18n.t('common.linkedin_url') }
                      isError={!this.validateLinkedInUserName(this.state.linkedin)}
                      errorMessage={I18n.t('common.errors.incorrect_linkedin_user_name')}
                      onChangeText={ (newValue) => this.handleFieldChange(newValue, 'linkedin') }/>
                  </View>
                </Form>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={ { margin: 8 } }>
          <PrimaryButton
            text={ I18n.t('common.next') }
            disabled={ !this.state.isFormValid }
            onPress={ this.handleSubmit }
          />
        </View>
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
  }
})

const mapStateToProps = state => {
  return {
    firstName: state.signUp.profile.firstName,
    lastName: state.signUp.profile.lastName,
    company: state.signUp.profile.company,
    telegram: state.signUp.profile.telegram,
    linkedin: state.signUp.profile.linkedin,
    imageUrl: { uri: '' },
    edit: false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfileInfo: profileInfo => dispatch(signUpActions.saveProfileOnboardingInfo(profileInfo)),
    startLoading: () => dispatch(batchActions([ globalActions.hideAlert(), globalActions.setGlobalLoading(I18n.t('profile_page.upload_loader_text')) ])),
    showAlertMessage: errMessage => dispatch(globalActions.showAlertError(errMessage)),
    finishLoading: () => dispatch(globalActions.unsetGlobalLoading())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonProfileOnboarding)

export const EditBasicInfo = connect(
  state => ({
    firstName: state.profile.basic.firstName,
    lastName: state.profile.basic.lastName,
    company: state.profile.basic.company,
    telegram: state.profile.basic.telegram,
    linkedin: state.profile.basic.linkedin,
    imageUrl: { uri: state.profile.basic.imageUrl },
    edit: true
  }),
  dispatch => ({
    saveProfileInfo: profile => dispatch(profileActions.updateBasic(profile)),
    startLoading: () => dispatch(batchActions([ globalActions.hideAlert(), globalActions.setGlobalLoading(I18n.t('profile_page.upload_loader_text')) ])),
    showAlertMessage: errMessage => dispatch(globalActions.showAlertError(errMessage)),
    finishLoading: () => dispatch(globalActions.unsetGlobalLoading())
  })
)(CommonProfileOnboarding)
