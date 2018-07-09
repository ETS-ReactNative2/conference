import { Body, Button, Card, CheckBox, Form, Icon, Input, Item, Label, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'

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
      locations: []
    }
  }

  handleSubmit = () => {
    this.props.onFill(this.state)
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
                    <ListItem key={`location-item-${singleLocation}`}>
                      <CheckBox
                        onPress={ () => this.handleCheckboxClick(singleLocation)}
                        checked={ this.isCheckboxSelected(singleLocation)}
                      />
                      <Body>
                        <Text>{ I18n.t(`common.country.${singleLocation}`) }</Text>
                      </Body>
                    </ListItem>
                );
            })}
        <Button success
                rounded
                block
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

export default InvestorMarketLocation
