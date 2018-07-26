import { Body, Button, Left, ListItem, Radio, Right, Switch, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'
import { FUNDING_STAGES, GIVEAWAY_TYPES, PRODUCT_STAGES, REGION, TOKEN_TYPES } from '../../../../enums'

class Filters extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fundingStages: {
        show: this.props.defaults.fundingStages ? this.props.defaults.fundingStages.length > 0 : false,
        values: this.props.defaults.fundingStages ? this.props.defaults.fundingStages : []
      },
      giveaway: {
        show: this.props.defaults.giveaway ? this.props.defaults.giveaway.length > 0 : false,
        values: this.props.defaults.giveaway ? this.props.defaults.giveaway : []
      },
      productStages: {
        show: this.props.defaults.productStages ? this.props.defaults.productStages.length > 0 : false,
        values: this.props.defaults.productStages ? this.props.defaults.productStages : []
      },
      tokenTypes: {
        show: this.props.defaults.tokenTypes ? this.props.defaults.tokenTypes.length > 0 : false,
        values: this.props.defaults.tokenTypes ? this.props.defaults.tokenTypes : []
      },
      region: {
        show: this.props.defaults ? this.props.defaults.region.length > 0 : false,
        values: this.props.defaults ? this.props.defaults.region : []
      }
    }
  }

  handleSubmit = () => {
    const { region, tokenTypes, productStages, giveaway, fundingStages } = this.state
    this.props.onSearch({
      region: region.show ? region.values : [],
      tokenTypes: tokenTypes.show ? tokenTypes.values : [],
      productStages: productStages.show ? productStages.values : [],
      giveaway: giveaway.show ? giveaway.values : [],
      fundingStages: fundingStages.show ? fundingStages.values : []
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
        options.map((option, index) => {
          return (
            <ListItem style={ { width: '100%' } }
                      onPress={ () => this.handleCheckboxClick(field, index) }
                      key={ `${field}}.${option.slug}` }>
              <Left>
                <Text>{ I18n.t(`common.${label}.${option.slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  selected={ this.isSelected(field, index) }/>
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
        { this.renderFilter('fundingStages',
          { options: FUNDING_STAGES, title: 'Funding stage', label: 'funding_stages' }) }
        { this.renderFilter('giveaway',
          { options: GIVEAWAY_TYPES, title: 'Giveaway', label: 'giveaway' }) }
        { this.renderFilter('productStages',
          { options: PRODUCT_STAGES, title: 'Product stages', label: 'product_stages' }) }
        { this.renderFilter('tokenTypes',
          { options: TOKEN_TYPES, title: 'Token types', label: 'token_types' }) }
        { this.renderFilter('region',
          { options: REGION, title: 'Region', label: 'region' }) }

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
