import { Body, Button, Left, ListItem, Radio, Right, Switch, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'
import { FUNDING_STAGES, GIVEAWAY_TYPES, PRODUCT_STAGES, REGION, REGIONS, TOKEN_TYPES } from '../../../../enums'

class Filters extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fundingStage: {
        show: this.props.defaults.fundingStage ? this.props.defaults.fundingStage.length > 0 : false,
        values: this.props.defaults.fundingStage ? this.props.defaults.fundingStage : []
      },
      giveaway: {
        show: this.props.defaults.giveaway ? this.props.defaults.giveaway.length > 0 : false,
        values: this.props.defaults.giveaway ? this.props.defaults.giveaway : []
      },
      productStage: {
        show: this.props.defaults.productStage ? this.props.defaults.productStage.length > 0 : false,
        values: this.props.defaults.productStage ? this.props.defaults.productStage : []
      },
      tokenType: {
        show: this.props.defaults.tokenType ? this.props.defaults.tokenType.length > 0 : false,
        values: this.props.defaults.tokenType ? this.props.defaults.tokenType : []
      },
      region: {
        show: this.props.defaults.region ? this.props.defaults.region.length > 0 : false,
        values: this.props.defaults.region ? this.props.defaults.region : []
      }
    }
  }

  handleSubmit = () => {
    const { region, tokenType, productStage, giveaway, fundingStage } = this.state
    this.props.onSearch({
      region: region.show ? region.values : [],
      tokenType: tokenType.show ? tokenType.values : [],
      productStage: productStage.show ? productStage.values : [],
      giveaway: giveaway.show ? giveaway.values : [],
      fundingStage: fundingStage.show ? fundingStage.values : []
    })
  }

  toggleFilter = (field) => {
    this.setState({
      [ field ]: {
        ...this.state[ field ],
        show: !this.state[ field ].show
      }
    })
  }

  isSelected = (fieldName, index) => {
    return this.state[ fieldName ].values.indexOf(index) !== -1
  }

  handleCheckboxClick = (field, index) => {
    let values = [ ...this.state[ field ].values ]
    const valueIndex = values.indexOf(index)
    if (valueIndex !== -1) {
      values = values.filter(value => value !== index)
    } else {
      values.push(index)
    }
    this.setState({
      [ field ]: {
        ...this.state[ field ],
        values
      }
    })
  }

  renderFilter = (field, { options, title, label }) => {
    const filter = this.state[ field ]
    return (
      <View>
        <ListItem header style={ { width: '100%' } }>
          <Body>
          <Text>{ title }</Text>
          </Body>
          <Right>
            <Switch
              onValueChange={ () => this.toggleFilter(field) }
              value={ filter.show }/>
          </Right>
        </ListItem>
        { filter.show &&
        options.map((option) => {
          return (
            <ListItem style={ { width: '100%' } }
                      onPress={ () => this.handleCheckboxClick(field, option.index) }
                      key={ `${field}.${option.slug}` }>
              <Left>
                <Text>{ I18n.t(`common.${label}.${option.slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  selected={ this.isSelected(field, option.index) }/>
              </Right>
            </ListItem>
          )
        })
        }
      </View>
    )
  }

  render () {
    return (
      <View>
        { this.renderFilter('fundingStage',
          { options: FUNDING_STAGES, title: 'Funding stage', label: 'funding_stages' }) }
        { this.renderFilter('giveaway',
          { options: GIVEAWAY_TYPES, title: 'Giveaway', label: 'giveaway' }) }
        { this.renderFilter('productStage',
          { options: PRODUCT_STAGES, title: 'Product stages', label: 'product_stages' }) }
        { this.renderFilter('tokenType',
          { options: TOKEN_TYPES, title: 'Token types', label: 'token_types' }) }
        { this.renderFilter('region',
          { options: REGIONS, title: 'Region', label: 'regions' }) }

        <Button block success bordered style={ { marginTop: 16, marginBottom: 16 } } onPress={ this.handleSubmit }>
          <Text>Search</Text>
        </Button>
      </View>
    )
  }
}

Filters.propTypes = {
  defaults: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default Filters
