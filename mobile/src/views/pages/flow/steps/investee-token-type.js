import { Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { TOKEN_TYPES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'
import { InvesteeProductStage } from './index'

class InvesteeTokenType extends React.Component {

  static BACKGROUND_COLOR = '#172D5C'

  constructor (props) {
    super(props)
    this.state = {
      tokenType: this.props.tokenType,
      // used to stop validation until Save button is hitted for the first time
      // unless field are already filled (editing)
      showValidationError: this.props.tokenType !== -1
    }

    this.state.isFormValid = this.isFormValid()
  }

  handleSubmit = () => {
    // after first time hitting Save button, flip flag to enable showing validation errors
    if (!this.state.showValidationError) {
      this.setState( { showValidationError: true } )
    }
    if (this.state.isFormValid) {
      this.props.saveInvestee({ tokenType: this.state.tokenType })
      this.props.onFill({ nextStep: InvesteeProductStage })
    }
  }

  handleChange = (index) => {
    this.setState({
      tokenType: index
    }, this.validateForm)
  }

  render () {
    return (
      <FlowContainer>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investee.token_type.title') }/>
            </View>
            <Subheader
              color={'white'}
              text={ I18n.t(`flow_page.investee.token_type.header`) }
            />
            { TOKEN_TYPES.map((size) => {
              return (
                <FlowListItem
                  multiple={ false }
                  key={ `token-type-item-${size.index}` }
                  text={ I18n.t(`common.token_types.${size.slug}`) }
                  onSelect={ () => this.handleChange(size.index) }
                  selected={ this.state.tokenType === size.index }
                />
              )
            }) }
            {this.state.showValidationError && this.state.tokenType === -1 && (
                <View style={ { margin: 8 } }>
                  <Text style={ { color: 'red', alignSelf: 'center' } }>
                    {I18n.t('flow_page.investee.token_type.error_missing_token_type')}
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
    return this.state.tokenType !== -1
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }
}

InvesteeTokenType.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    tokenType: state.signUp.investee.tokenType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestee: investeeData => dispatch(signUpActions.saveProfileInvestee(investeeData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeTokenType)
