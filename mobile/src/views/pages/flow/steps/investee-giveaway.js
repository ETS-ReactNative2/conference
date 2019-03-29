import { Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { GIVEAWAY_TYPES_PROJECT } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'

class InvesteeGiveaway extends React.Component {

  static BACKGROUND_COLOR = '#172D5C'

  constructor (props) {
    super(props)
    this.state = {
      giveaway: this.props.giveaway,
      // used to stop validation until Save button is hitted for the first time
      // unless field are already filled (editing)
      showValidationError: this.props.giveaway !== -1
    }

    this.state.isFormValid = this.isFormValid()
  }

  handleSubmit = () => {
    // after first time hitting Save button, flip flag to enable showing validation errors
    if (!this.state.showValidationError) {
      this.setState( { showValidationError: true } )
    }
    if (this.state.isFormValid) {
      this.props.saveInvestee({ giveaway: this.state.giveaway })
      this.props.onFill({ done: true })
    }
  }

  handleChange = (index) => {
    this.setState({
      giveaway: index
    }, this.validateForm)
  }

  render () {
    return (
      <FlowContainer>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.giveaway.title') }/>
            </View>
            <Subheader
              color={'white'}
              text={ I18n.t(`flow_page.giveaway.header`) }
            />
            { GIVEAWAY_TYPES_PROJECT.map((size) => {
              return (
                <FlowListItem
                  multiple={ false }
                  key={ `funding-stage-item-${size.index}` }
                  text={ I18n.t(`common.giveaway.${size.slug}`) }
                  onSelect={ () => this.handleChange(size.index) }
                  selected={ this.state.giveaway === size.index }
                />
              )
            }) }
            {this.state.showValidationError && this.state.giveaway === -1 && (
              <View style={ { margin: 8 } }>
                <Text style={ { color: 'red', alignSelf: 'center' } }>
                  {I18n.t('flow_page.giveaway.error_missing_giveaway')}
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={ this.state.showValidationError && !this.state.isFormValid}
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }

  isFormValid = () => {
    return this.state.giveaway !== -1
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }
}

InvesteeGiveaway.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    giveaway: state.signUp.investee.giveaway
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestee: investeeData => dispatch(signUpActions.saveProfileInvestee(investeeData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeGiveaway)
