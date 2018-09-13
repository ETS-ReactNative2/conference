import { Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton, OutlineWhiteButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'
import { EmployerRole } from './index'

class InvesteeHiring extends React.Component {

  static BACKGROUND_COLOR = '#172D5C'

  constructor (props) {
    super(props)
    this.state = {
      hiring: this.props.investee.hiring
    }
  }

  render () {
    return (
      <FlowContainer>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.hiring.title') }/>
            </View>
            <Subheader
              color={ 'white' }
              text={ I18n.t(`flow_page.hiring.header`) }
            />
            <FlowListItem
              multiple={ false }
              text={ I18n.t('common.no') }
              onSelect={ () => this.setState({ hiring: false }) }
              selected={ !this.state.hiring }/>
            <FlowListItem
              multiple={ false }
              text={ I18n.t('common.yes') }
              onSelect={ () => this.setState({ hiring: true }) }
              selected={ this.state.hiring }/>
            <View style={ { margin: 8 } }>
              <Text style={ { marginBottom: 8, color: 'white', textAlign: 'center' } }>
                { I18n.t('flow_page.hiring.skip_text') }
              </Text>
              <OutlineWhiteButton
                text={ I18n.t('common.skip') }
                onPress={ this.handleSkip }
              />
            </View>
          </ScrollView>
        </View>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }

  handleSubmit = () => {
    const { hiring } = this.state
    this.props.save({
      hiring
    })
    this.props.onFill({
      done: !hiring,
      nextStep: hiring ? EmployerRole : null
    })
  }

  handleSkip = () => {
    this.props.onFill({
      done: true
    })
  }
}

InvesteeHiring.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeHiring)
