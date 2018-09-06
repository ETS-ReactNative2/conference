import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { FUNDING_STAGES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import FlowInput from '../../../design/flow-inputs'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'
import { InvesteeGiveaway } from './index'

class InvesteeFundingStage extends React.Component {

  static BACKGROUND_COLOR = '#172D5C'

  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.investee.fundingStage,
      members: this.props.investee.teamMembers,
      size: this.props.investee.teamSize
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
                <StepTitle text={ I18n.t('flow_page.funding_stage.title') }/>
              </View>
              <Subheader
                text={ I18n.t(`flow_page.funding_stage.header`) }
              />
              { FUNDING_STAGES.map((size) => {
                return (
                  <FlowListItem
                    multiple={ false }
                    key={ `funding-stage-item-${size.index}` }
                    text={ I18n.t(`common.funding_stages.${size.slug}`) }
                    onSelect={ () => this.handleChange(size.index) }
                    selected={ this.state.selected === size.index }
                  />
                )
              }) }
              <View style={ { paddingTop: 10 } }>
                <Subheader
                  text={ I18n.t(`flow_page.members.header`) }
                />
              </View>
              <View style={ styles.inputContainer }>
                <FlowInput
                  floatingLabel
                  value={ this.state.members }
                  labelText={ I18n.t('flow_page.members.title') }
                  onChangeText={ text => this.handleTextChange('members', text) }
                  status={ this.state.members.length > 0 ? 'ok' : 'regular' }/>
              </View>
              <View style={ styles.inputContainer }>
                <FlowInput
                  floatingLabel
                  value={ this.state.size }
                  keyboardType={ 'numeric' }
                  labelText={ I18n.t('flow_page.members.size') }
                  onChangeText={ text => this.handleTextChange('size', text) }
                  status={ this.state.size.length > 0 ? 'ok' : 'regular' }/>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={ !this.state.isFormValid }
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }

  isFormValid = () => {
    return this.state.selected !== -1
  }

  handleTextChange = (field, text) => {
    this.setState({
      [ field ]: text
    })
  }
  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.save({
      fundingStage: this.state.selected,
      teamMembers: this.state.members,
      teamSize: this.state.size
    })
    this.props.onFill({
      nextStep: InvesteeGiveaway
    })
  }

  handleChange = index => {
    this.setState({
      selected: index
    }, this.validateForm)
  }
}

const styles = EStyleSheet.create({
  inputContainer: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8
  }
})

InvesteeFundingStage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeFundingStage)
