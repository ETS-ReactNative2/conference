import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/Container'
import FlowInput from '../../../design/flow-inputs'
import { StepTitle } from '../../../design/step-title'
import { Subheader, SubheaderWithSwitch } from '../../../design/subheader'
import { InvesteeProjectLocation } from './index'
import { ScrollView} from 'react-native'

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
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.links.title') }/>
            </View>
            <Subheader
              text={ I18n.t(`flow_page.links.header`) }
            />
            <View style={{ marginLeft: 8, marginRight: 8}}>
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
              <FlowInput
                floatingLabel
                labelText={I18n.t('flow_page.links.telegram')}
                status={ this.state.telegram.length > 0 ? 'ok' : 'regular' }
                onChangeText={ text => this.handleFieldChange(text, 'telegram') }
                value={ this.state.telegram }/>
              <FlowInput
                floatingLabel
                labelText={I18n.t('common.twitter')}
                status={ this.state.twitter.length > 0 ? 'ok' : 'regular' }
                onChangeText={ text => this.handleFieldChange(text, 'twitter') }
                value={ this.state.twitter }/>
              <FlowInput
                floatingLabel
                labelText={I18n.t('common.github')}
                status={ this.state.github.length > 0 ? 'ok' : 'regular' }
                onChangeText={ text => this.handleFieldChange(text, 'github') }
                value={ this.state.github }/>
              <FlowInput
                floatingLabel
                labelText={I18n.t('common.news')}
                status={ this.state.news.length > 0 ? 'ok' : 'regular' }
                onChangeText={ text => this.handleFieldChange(text, 'news') }
                value={ this.state.news }/>
            </View>
          </ScrollView>
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
    return true
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
