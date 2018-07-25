import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  ListItem,
  Radio,
  Right,
  Switch,
  Text,
  Title,
  View
} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import I18n from '../../../../../locales/i18n'
import { FUNDING_STAGES, GIVEAWAY_TYPES, PRODUCT_STAGES, TOKEN_TYPES } from '../../../../enums'

class ProjectsFilterModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fundingStages: {
        show: this.props.defaults ? this.props.defaults.fundingStages.length > 0 : false,
        values: this.props.defaults ? this.props.defaults.fundingStages : []
      },
      giveaway: {
        show: this.props.defaults ? this.props.defaults.giveaway.length > 0 : false,
        values: this.props.defaults ? this.props.defaults.giveaway : []
      },
      productStages: {
        show: this.props.defaults ? this.props.defaults.productStage.length > 0 : false,
        values: this.props.defaults ? this.props.defaults.productStages : []
      },
      tokenTypes: {
        show: this.props.defaults ? this.props.defaults.tokenTypes.length > 0 : false,
        values: this.props.defaults ? this.props.defaults.tokenTypes : []
      }
    }
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
        <ListItem icon style={ { width: '100%' } }>
          <Left>
            <Button style={ { backgroundColor: '#FF9501' } }>
              <Icon active name="plane"/>
            </Button>
          </Left>
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
            <ListItem style={ { width: '100%' } } key={ `${field}}.${option.slug}` }
                      onPress={ () => this.handleCheckboxClick(field, index) }>
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
        <ListItem itemDivider/>
      </View>
    )
  }

  render () {
    return (
      <Container>
        <ScrollView>
          <Header>
            <Left/>
            <Body>
            <Title>Search filters</Title>
            </Body>
            <Right>
              <Button
                style={ { height: '100%' } }
                transparent
                onPress={ this.props.onClose }>
                <Text style={ { color: 'red' } }>Close</Text>
              </Button>
            </Right>
          </Header>
          <ListItem itemDivider/>
          { this.renderFilter('fundingStages',
            { options: FUNDING_STAGES, title: 'Supporting funding stage', label: 'funding_stages' }) }
          { this.renderFilter('giveaway',
            { options: GIVEAWAY_TYPES, title: 'Supporting giveaway', label: 'giveaway' }) }
          { this.renderFilter('productStages',
            { options: PRODUCT_STAGES, title: 'Supporting product stages', label: 'product_stages' }) }
          { this.renderFilter('tokenTypes',
            { options: TOKEN_TYPES, title: 'Supporting token', label: 'token_types' }) }

          <Button block success onPress={ () => this.props.onSearch() }>
            <Text>Search</Text>
          </Button>
        </ScrollView>
      </Container>
    )
  }
}

ProjectsFilterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
}

export default ProjectsFilterModal
