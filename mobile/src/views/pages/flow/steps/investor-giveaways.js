import { Button, Card, Content, Body, ListItem, CheckBox, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { GIVEAWAY_TYPES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvestorProductStages } from './index'

class InvestorGiveaways extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedGiveaways: this.props.investor.giveaways
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.giveaways.title') }</Text>
        <Content>
          {
            GIVEAWAY_TYPES.map((option) => {
              return (
                <ListItem style={ { width: '100%' } } key={ option.slug } onPress={ () => this.handleChange(option.index) }>
                  <Body>
                    <Text>{ I18n.t(`common.giveaways.${option.slug}`) }</Text>
                  </Body>
                  <CheckBox
                    onPress={ () => this.handleChange(option.index) }
                    checked={ this.state.selectedGiveaways.indexOf(option.index) !== -1  }/>
                </ListItem>
              )
            })
          }
        </Content>
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
    return this.state.selectedGiveaways.length > 0
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.saveInvestor({
      giveaways: this.state.selectedGiveaways
    })
    this.props.onFill({
      nextStep: InvestorProductStages
    })
  }

  handleChange = (index) => {
    let giveaways = [ ...this.state.selectedGiveaways ]
    const giveawayIndex = giveaways.indexOf(index)
    if (giveawayIndex !== -1) {
      giveaways = giveaways.filter(singleGiveaway => singleGiveaway !== index)
    } else {
      giveaways.push(index)
    }
    this.setState({
      selectedGiveaways: giveaways
    }, this.validateForm)
  }
}

InvestorGiveaways.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investor: state.signUp.investor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorGiveaways)
