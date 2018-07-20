import {
  Body,
  Button,
  Card,
  CheckBox,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Left,
  ListItem,
  Radio,
  Right,
  Text
} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'

const locations = [
    'korea',
    'north_america',
    'south_america',
    'africa'
]

class InvestorMarketLocation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      locations: this.props.marketLocations
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ marketLocations: this.state.locations })
    this.props.onFill({ done: true })
  }

  handleCheckboxClick = fieldName => {
      let locations = [...this.state.locations]
      const locationIndex = locations.indexOf(fieldName)
      if (locationIndex !== -1) {
          locations = locations.filter(singleLocation => singleLocation !== fieldName)
      } else {
          locations.push(fieldName)
      }
      this.setState({ locations })
  }

  isCheckboxSelected = fieldName => {
      return this.state.locations.indexOf(fieldName) !== -1;
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.market_location.title') }</Text>
            {locations.map(singleLocation => {
                return (
                    <ListItem
                      onPress={ () => this.handleCheckboxClick(singleLocation) }
                      key={`location-item-${singleLocation}`}>
                      <Left>
                        <Text>{ I18n.t(`common.country.${singleLocation}`) }</Text>
                      </Left>
                      <Right>
                        <Radio
                          onPress={ () => this.handleCheckboxClick(singleLocation) }
                          selected={ this.isCheckboxSelected(singleLocation) }/>
                      </Right>
                    </ListItem>
                );
            })}
        <Button success
                rounded
                block
                disabled={ this.state.locations.length === 0}
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
    marketLocations: state.signUp.investor.marketLocations
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor : investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorMarketLocation)
