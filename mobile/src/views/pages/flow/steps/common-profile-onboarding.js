import { Container, Form, Icon, Input, Item, Label, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Header } from 'react-navigation'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import FlowInputValidated from '../../../design/flow-input-validated'
import FlowInput from '../../../design/flow-inputs'
import { StepTitle } from '../../../design/step-title'
import { CommonProfileType } from './index'

class CommonProfileOnboarding extends React.Component {
  static BACKGROUND_COLOR = '#2C65E2'

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
    })
    this.props.onFill({ nextStep: CommonProfileType })
  }

  handleFieldChange = (newValue, name) => {
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  }

  render () {
    return (
      <Container style={ styles.container }>
        <StepTitle text={ I18n.t('flow_page.common.profile_onboarding.title') }/>
        <ScrollView style={ { flex: 1}}>
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
                labelText={ I18n.t('flow_page.common.profile_onboarding.titleField') }
                value={ this.state.title }
                status={ this.state.title.length > 0 ? 'ok' : 'regular' }
                onChangeText={ text => this.handleFieldChange(text, 'title') }/>
            </View>
            <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
              <FlowInput
                floatingLabel={ true }
                labelText={ I18n.t('flow_page.common.profile_onboarding.company') }
                value={ this.state.company }
                status={ this.state.company.length > 0 ? 'ok' : 'regular' }
                onChangeText={ text => this.handleFieldChange(text, 'company') }/>
            </View>
            <View style={ { paddingLeft: 8, paddingRight: 8, marginBottom: 16 } }>
              <FlowInput
                leftIcon={'logo-twitter'}
                floatingLabel={ true }
                labelText={ I18n.t('common.personal_twitter') }
                value={ this.state.twitter }
                status={ this.state.twitter.length > 0 ? 'ok' : 'regular' }
                onChangeText={ text => this.handleFieldChange(text, 'twitter') }/>
            </View>

            <Item floatingLabel>
              <Icon active name='logo-twitter'/>
              <Label>{ I18n.t('common.personal_twitter') }</Label>
              <Input
                onChangeText={ text => this.handleFieldChange(text, 'twitter') }
                value={ this.state.twitter }
              />
            </Item>
            <Item floatingLabel>
              <Icon active name='logo-facebook'/>
              <Label>{ I18n.t('common.personal_facebook') }</Label>
              <Input
                onChangeText={ text => this.handleFieldChange(text, 'facebook') }
                value={ this.state.facebook }
              />
            </Item>
            <Item floatingLabel>
              <Icon active name='paper-plane'/>
              <Label>{ I18n.t('common.personal_telegram') }</Label>
              <Input
                onChangeText={ text => this.handleFieldChange(text, 'telegram') }
                value={ this.state.telegram }
              />
            </Item>
            <Item floatingLabel>
              <Icon active name='logo-linkedin'/>
              <Label>{ I18n.t('common.personal_linkedin') }</Label>
              <Input
                onChangeText={ text => this.handleFieldChange(text, 'linkedin') }
                value={ this.state.linkedin }
              />
            </Item>
          </Form>
        </ScrollView>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={ !this.state.isFormValid }
            onPress={ this.handleSubmit }
          />
        </View>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: `100% - ${Header.HEIGHT}`
  }
})

CommonProfileOnboarding.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    firstName: state.signUp.profile.firstName,
    lastName: state.signUp.profile.lastName,
    title: state.signUp.profile.title,
    company: state.signUp.profile.company,
    twitter: state.signUp.profile.twitter,
    facebook: state.signUp.profile.facebook,
    telegram: state.signUp.profile.telegram,
    linkedin: state.signUp.profile.linkedin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfileInfo: profileInfo => dispatch(signUpActions.saveProfileInfo(profileInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonProfileOnboarding)
