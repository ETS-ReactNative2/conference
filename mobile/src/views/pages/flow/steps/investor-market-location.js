import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { REGIONS } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import FlowInputValidated from '../../../design/flow-input-validated'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'

class InvestorMarketLocation extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      location: this.props.marketLocation,
      regionOtherText: this.props.regionOtherText
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ marketLocation: this.state.location, regionOtherText: this.state.regionOtherText })
    this.props.onFill({ done: true })
  }

  handleCheckboxClick = newValue => {
    this.setState({ location: newValue })
  }

  handleFieldChange = (newValue, name) => {
    this.setState({
      [ name ]: newValue
    })
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={96} enabled={Platform.OS === 'ios'}>
            <View style={ { flex: 1, justifyContent: 'flex-start' } }>
              <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
                <StepTitle text={ I18n.t('flow_page.investor.market_location.title') }/>
              </View>
              <Subheader
                text={ I18n.t(`common.regions.header`) }
              />
              { REGIONS.map((region) => {
                  return (
                    <FlowListItem
                      multiple={ false }
                      key={ `product_stage-item-${region.slug}` }
                      text={ I18n.t(`common.regions.${region.slug}`) }
                      onSelect={ () => this.handleCheckboxClick(region.index) }
                      selected={ this.state.location === region.index }
                    />
                  )
              }) }
              { this.state.location === REGIONS.find(r => r.slug === 'other').index && (
                  <View style={ { marginLeft: 8, marginRight: 40 } }>
                    <FlowInputValidated
                      floatingLabel
                      value={ this.state.regionOtherText }
                      labelText={ I18n.t('flow_page.investor.market_location.other_location_placeholder') }
                      isError={ this.state.regionOtherText.length > 40 }
                      errorMessage={ I18n.t('common.errors.incorrect_investor_custom_location') }
                      onChangeText={ (newValue) => this.handleFieldChange(newValue, 'regionOtherText') }/>
                  </View>
              ) }
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={ this.state.location === REGIONS.find(r => r.slug === 'other').index && this.state.regionOtherText.length > 40 }
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }
}

InvestorMarketLocation.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    marketLocation: state.signUp.investor.marketLocation,
    regionOtherText: state.signUp.investor.regionOtherText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorMarketLocation)
