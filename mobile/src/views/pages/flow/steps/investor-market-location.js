import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { REGIONS } from '../../../../enums'
import { InvestorIndustries } from './index'

class InvestorMarketLocation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: this.props.marketLocation
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ marketLocation: this.state.location })
    this.props.onFill({ nextStep: InvestorIndustries })
  }

  handleCheckboxClick = newValue => {
    this.setState({ location: newValue});
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.market_location.title') }</Text>
        { REGIONS.map((singleRegion) => {
          return (
            <ListItem
              onPress={ () => this.handleCheckboxClick(singleRegion.index) }
              key={ `market-location-${singleRegion.slug}`}>
              <Left>
                <Text>{ I18n.t(`common.regions.${singleRegion.slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  onPress={ () => this.handleCheckboxClick(singleRegion.index) }
                  selected={ this.state.location === singleRegion.index }/>
              </Right>
            </ListItem>
          )})
        }
        <Button success
                rounded
                block
                disabled={ this.state.location === -1}
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
    marketLocation: state.signUp.investor.marketLocation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorMarketLocation)
