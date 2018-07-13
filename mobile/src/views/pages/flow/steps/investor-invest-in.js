import { Body, Button, Card, CheckBox, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { InvestorTicketSize } from './index'
import { signUpActions } from '../../../../signup'

const investments = [
    'protocols',
    'app_tokens',
    'security_tokens'
]

class InvestorInvestIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      investments: this.props.investments
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ investments: this.state.investments })
    this.props.onFill({ nextStep: InvestorTicketSize })
  }

  handleCheckboxClick = fieldName => {
      let investments = [...this.state.investments]
      const investmentIndex = investments.indexOf(fieldName)
      if (investmentIndex !== -1) {
          investments = investments.filter(singleInvestemnt => singleInvestemnt !== fieldName)
      } else {
          investments.push(fieldName)
      }
      this.setState({ investments })
  }

  isCheckboxSelected = fieldName => {
      return this.state.investments.indexOf(fieldName) !== -1;
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.invest_in.title') }</Text>
            {investments.map(singleInvestment => {
                return (
                    <ListItem key={`investment-item-${singleInvestment}`}>
                      <CheckBox
                        onPress={ () => this.handleCheckboxClick(singleInvestment)}
                        checked={ this.isCheckboxSelected(singleInvestment)}
                      />
                      <Body>
                        <Text>{ I18n.t(`flow_page.investor.invest_in.investment_topics.${singleInvestment}`) }</Text>
                      </Body>
                    </ListItem>
                );
            })}
        <Button success
                rounded
                block
                disabled={ this.state.investments.length === 0}
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }
}

InvestorInvestIn.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investments: state.signUp.investor.investments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor : investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorInvestIn)
