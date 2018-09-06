import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import FlowInput from '../../../design/flow-inputs'
import FlowInputValidated from '../../../design/flow-input-validated'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'
import { InvesteeProjectLocation } from './index'
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native'

const githubUsernameValidator = /^[a-zA-Z0-9-]{1,39}(\/[a-zA-Z0-9-]{0,100})?$/
const telegramUsernameValidator = /^[a-zA-Z0-9_]{5,32}$/
const twitterUsernameValidator = /^[a-zA-Z0-9_]{1,15}$/

class InvesteeLinks extends React.Component {

  static BACKGROUND_COLOR = '#172D5C'

  constructor (props) {
    super(props)
    this.state = {
      ...{ website, whitepaper, telegram, twitter, github, news } = this.props.investee
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <FlowContainer>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={96} enabled={Platform.OS === 'ios'}>
            <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
              <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
                <StepTitle text={ I18n.t('flow_page.links.title') }/>
              </View>
              <Subheader
                text={ I18n.t(`flow_page.links.header`) }
              />
              <View style={{ marginLeft: 8, marginRight: 8 }}>
                <FlowInput
                  floatingLabel
                  labelText={I18n.t('flow_page.links.website')}
                  status={ this.state.website.length > 0 ? 'ok' : 'regular' }
                  onChangeText={ text => this.handleFieldChange(text, 'website') }
                  value={ this.state.website }/>
                <FlowInput
                  floatingLabel
                  labelText={I18n.t('flow_page.links.whitepaper')}
                  status={ this.state.whitepaper.length > 0 ? 'ok' : 'regular' }
                  onChangeText={ text => this.handleFieldChange(text, 'whitepaper') }
                  value={ this.state.whitepaper }/>
                <FlowInputValidated
                  floatingLabel
                  labelText={I18n.t('common.telegram_url')}
                  onChangeText={ text => this.handleFieldChange(text, 'telegram') }
                  isError={ !this.validateTelegramUserName() }
                  errorMessage={ I18n.t('common.errors.incorrect_telegram_user_name') }
                  value={ this.state.telegram }/>
                <FlowInputValidated
                  floatingLabel
                  labelText={I18n.t('common.twitter_url')}
                  onChangeText={ text => this.handleFieldChange(text, 'twitter') }
                  isError={ !this.validateTwitterUserName() }
                  errorMessage={ I18n.t('common.errors.incorrect_twitter_user_name') }
                  value={ this.state.twitter }/>
                <FlowInputValidated
                  floatingLabel
                  labelText={I18n.t('common.github_url')}
                  onChangeText={ text => this.handleFieldChange(text, 'github') }
                  isError={ !this.validateGithubUserName() }
                  errorMessage={ I18n.t('common.errors.incorrect_github_user_name') }
                  value={ this.state.github }/>
                <FlowInput
                  floatingLabel
                  labelText={I18n.t('common.news')}
                  status={ this.state.news.length > 0 ? 'ok' : 'regular' }
                  onChangeText={ text => this.handleFieldChange(text, 'news') }
                  value={ this.state.news }/>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={!this.state.isFormValid}
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }

  isFormValid = () => {
    return this.validateGithubUserName()
           && this.validateTelegramUserName()
           && this.validateTwitterUserName()
  }

  validateTwitterUserName = () => {
    const { twitter } = this.state
    return !twitter
      || !twitter.length
      || twitterUsernameValidator.test(twitter)
  }

  validateTelegramUserName = () => {
    const { telegram } = this.state
    return !telegram
      || !telegram.length
      || telegramUsernameValidator.test(telegram)
  }

  validateGithubUserName = () => {
    const { github } = this.state
    return !github
      || !github.length
      || githubUsernameValidator.test(github)
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.save(this.state)
    this.props.onFill({
      nextStep: InvesteeProjectLocation
    })
  }

  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    }, this.validateForm)
  }
}

InvesteeLinks.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investee: state.signUp.investee
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: investeeInfo => dispatch(signUpActions.saveProfileInvestee(investeeInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeLinks)
