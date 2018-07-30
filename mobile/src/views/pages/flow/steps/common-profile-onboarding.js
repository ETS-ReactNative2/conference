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
      name: this.props.name,
      title: this.props.title,
      company: this.props.company,
      twitter: this.props.twitter,
      facebook: this.props.facebook
    }
    this.state.isFormValid = this.isFormValid()
  }

  validateProfileName = (profileName) => {
    return validator.isLength(this.state.name, { min: 4, max: undefined })
  }

  isFormValid = () => {
    const isNameCorrect = this.validateProfileName(this.state.name)
    const isFormValid = isNameCorrect
    return isFormValid
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState( {isFormValid} )
  }

  handleSubmit = () => {
    this.props.saveProfileInfo({
      name: this.state.name,
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
                          value={ this.state.name }
                          labelText={I18n.t('flow_page.common.profile_onboarding.name')}
                          isError={!this.validateProfileName(this.state.name)}
                          errorMessage={I18n.t('common.errors.incorrect_profile_name')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'name')} />
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
    name: state.signUp.profile.name,
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
