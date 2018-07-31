import { Button, Card, Form, Icon, Input, Item, Label, Text } from 'native-base'
import validator from 'validator'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { CommonProfileType } from './index'
import { signUpActions } from '../../../../signup'
import ValidatedInput from '../../../components/validated-input/validated-input'

class CommonProfileOnboarding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      title: this.props.title,
      company: this.props.company,
      twitter: this.props.twitter,
      facebook: this.props.facebook
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
    this.setState( {isFormValid} )
  }

  handleSubmit = () => {
    this.props.saveProfileInfo({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      title: this.state.title,
      company: this.state.company,
      twitter: this.state.twitter,
      facebook: this.state.facebook
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
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.common.profile_onboarding.title') }</Text>
        <Form>
          <ValidatedInput floatingLabel
                          value={ this.state.firstName }
                          labelText={I18n.t('flow_page.common.profile_onboarding.first_name')}
                          isError={!this.validateProfileFirstName(this.state.firstName)}
                          errorMessage={I18n.t('common.errors.incorrect_profile_first_name')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'firstName')} />
          <ValidatedInput floatingLabel
                          value={ this.state.lastName }
                          labelText={I18n.t('flow_page.common.profile_onboarding.last_name')}
                          isError={!this.validateProfileLastName(this.state.lastName)}
                          errorMessage={I18n.t('common.errors.incorrect_profile_last_name')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'lastName')} />
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.common.profile_onboarding.titleField') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'title')}
              value={ this.state.title }
            />
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.common.profile_onboarding.company') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'company')}
              value={ this.state.company }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='logo-twitter'/>
            <Label>{ I18n.t('common.twitter') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'twitter')}
              value={ this.state.twitter }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='logo-facebook'/>
            <Label>{ I18n.t('common.facebook') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'facebook')}
              value={ this.state.facebook }
            />
          </Item>
        </Form>
        <Button success
                rounded
                block
                disabled={!this.state.isFormValid}
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }
}

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
    facebook: state.signUp.profile.facebook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfileInfo : profileInfo => dispatch(signUpActions.saveProfileInfo(profileInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonProfileOnboarding)
