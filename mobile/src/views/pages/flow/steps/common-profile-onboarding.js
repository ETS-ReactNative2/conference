import { Form, Text, Thumbnail } from 'native-base'
import React from 'react'
import { ScrollView, TouchableHighlight, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { batchActions } from 'redux-batch-enhancer'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import WhiteLogo from '../../../../assets/logos/logo-white.png'
import { PAGES_NAMES } from '../../../../navigation/index'
import { profileActions } from '../../../../profile'
import { signUpActions } from '../../../../signup'
import Alert from '../../../components/alert/alert'
import { NavigationHeader } from '../../../components/header/header'
import HeaderSkip from '../../../components/header/header-skip'
import { BlueButton, PrimaryButton } from '../../../design/buttons'
import FlowInputValidated from '../../../design/flow-input-validated'
import FlowInput from '../../../design/flow-inputs'
import { ImagePageContainer } from '../../../design/image-page-container'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}

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
      company: this.state.company,
      telegram: this.state.telegram,
      linkedin: this.state.linkedin,
      avatarSource: this.state.avatarSource
    }, PAGES_NAMES.HOME_PAGE)
    if (this.props.edit) {
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

  handleGetImage = () => {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel || response.error || response.customButton) {
        return
      }
      else {
        let source = { uri: response.uri, data: response.data }

        // You can also display the image using data:
        // source = { uri: 'data:image/jpeg;base64,' + response.data }

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
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            {
              edit && (
                <NavigationHeader title={ I18n.t('flow_page.common.profile_onboarding.edit_header') }
                                  rightIconSource={ WhiteLogo }
                                  titleStyle={ [ styles.headerTitle, { marginTop: 12 } ] }
                                  onBack={ () => { navigation.goBack() } }/>

              )
            }
            { !edit && (
              <HeaderSkip title={ I18n.t(edit ? 'common.back' : 'flow_page.common.profile_onboarding.header') }
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
              <Alert color="error" message={ this.props.errorMessage }/>
            ) }
            <View style={ { flex: 1 } }>
              <Form>
                <Subheader text={ 'Avatar' }/>
                <View style={ { margin: 8 } }>
                  {
                    !this.state.avatarSource.uri ? (
                      <BlueButton text={ 'Choose avatar' } onPress={ this.handleGetImage }/>) : null
                  }
                  { this.state.avatarSource.uri ? (
                    <View style={ { width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 8 } }>
                      <TouchableHighlight onPress={ this.handleGetImage } underlayColor='transparent'>
                        <Thumbnail large={ true } square={ true } style={ { width: undefined, height: 300 } }
                                   source={ this.state.avatarSource }/>
                      </TouchableHighlight>
                      <Text style={ { color: 'white', textAlign: 'center', marginTop: 8 } }>Tap image above to
                        change</Text>
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
    company: state.signUp.profile.company,
    telegram: state.signUp.profile.telegram,
    linkedin: state.signUp.profile.linkedin,
    imageUrl: { uri: '' },
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
    company: state.profile.basic.company,
    telegram: state.profile.basic.telegram,
    linkedin: state.profile.basic.linkedin,
    imageUrl: { uri: state.profile.basic.imageUrl },
    edit: true
  }),
  dispatch => ({
    saveProfileInfo: (profile) => {dispatch(profileActions.updateBasic(profile))},
    clearErrors: () => {}
  })
)(CommonProfileOnboarding)
