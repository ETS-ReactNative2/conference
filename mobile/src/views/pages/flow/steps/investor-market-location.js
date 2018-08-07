import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { REGIONS } from '../../../../enums'
import { InvestorIndustries } from './index'
import ValidatedInput from '../../../components/validated-input/validated-input'

class InvestorMarketLocation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: this.props.marketLocation,
      regionOtherText: this.props.regionOtherText
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ marketLocation: this.state.location, regionOtherText: this.state.regionOtherText })
    this.props.onFill({ nextStep: InvestorIndustries })
  }

  handleCheckboxClick = newValue => {
    this.setState({ location: newValue});
  }

  handleFieldChange = (newValue, name) => {
    this.setState({
      [ name ]: newValue
    })
  };

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.market_location.title') }</Text>
        { REGIONS.map((singleRegion) => {
          return (
            <ListItem
              onPress={ () => this.handleCheckboxClick(singleRegion) }
              key={ `market-location-${singleRegion.slug}`}>
              <Left>
                <Text>{ I18n.t(`common.regions.${singleRegion.slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  onPress={ () => this.handleCheckboxClick(singleRegion) }
                  selected={ this.state.location.index === singleRegion.index }/>
              </Right>
            </ListItem>
          )})
        }
        {this.state.location.slug === "other" && (
          <ValidatedInput floatingLabel
            value={ this.state.regionOtherText }
            labelText={ I18n.t('flow_page.investor.market_location.other_location_placeholder') }
            isError={ this.state.regionOtherText.length > 40 }
            errorMessage={ I18n.t('common.errors.incorrect_investor_custom_location') }
            onChangeText={ (newValue) => this.handleFieldChange(newValue, 'regionOtherText') }/>
        )}
        <Button success
                rounded
                block
                disabled={ this.state.location.slug === "other" && this.state.regionOtherText.length > 40}
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
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
