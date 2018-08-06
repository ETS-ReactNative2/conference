import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { GIVEAWAY_TYPES_PROJECT } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvesteeProductStage, InvesteeTeamMembers } from './index'

class InvesteeGiveaway extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      giveaway: this.props.giveaway
    }

    this.state.isFormValid = this.isFormValid()
  }

  handleSubmit = () => {
    this.props.saveInvestee({ giveaway: this.state.giveaway })
    this.props.onFill({ nextStep: InvesteeTeamMembers })
  }

  handleChange = (index) => {
    this.setState({
      giveaway: index
    }, this.validateForm)
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.giveaway.title') }</Text>
        { GIVEAWAY_TYPES_PROJECT.map((giveaway) => {
          return (
            <ListItem
              onPress={ () => this.handleChange(giveaway.index) }
              key={ `investment-item-${giveaway.slug}` }>
              <Left>
                <Text>{ I18n.t(`common.giveaways.${giveaway.slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  onPress={ () => this.handleChange(giveaway.index) }
                  selected={ this.state.giveaway === giveaway.index }/>
              </Right>
            </ListItem>
          )
        }) }
        <Button success
                rounded
                block
                disabled={ !this.state.isFormValid }
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
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
