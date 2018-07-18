import { Body, Button, Card, CheckBox, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { InvestorMarketLocation } from './index'
import { signUpActions } from '../../../../signup'

const stages = [
    'seed',
    'pre',
    'post'
]

class InvestorCompanyFundingStage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stages: this.props.stages
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ stages: this.state.stages })
    this.props.onFill({ nextStep: InvestorMarketLocation})
  }

  handleCheckboxClick = fieldName => {
      let stages = [...this.state.stages]
      const stageIndex = stages.indexOf(fieldName)
      if (stageIndex !== -1) {
          stages = stages.filter(singleStage => singleStage !== fieldName)
      } else {
          stages.push(fieldName)
      }
      this.setState({ stages })
  }

  isCheckboxSelected = fieldName => {
      return this.state.stages.indexOf(fieldName) !== -1;
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.company_funding_stage.title') }</Text>
            {stages.map(singleStage => {
                return (
                    <ListItem
                      onPress={ () => this.handleCheckboxClick(singleStage) }
                      key={`funding-item-${singleStage}`}>
                      <Left>
                        <Text>{ I18n.t(`common.funding_stages.${singleStage}`) }</Text>
                      </Left>
                      <Right>
                        <Radio
                          onPress={ () => this.handleCheckboxClick(singleStage) }
                          selected={ this.isCheckboxSelected(singleStage) }/>
                      </Right>
                    </ListItem>
                );
            })}
        <Button success
                rounded
                block
                disabled={ this.state.stages.length === 0}
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }
}

InvestorCompanyFundingStage.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    stages: state.signUp.investor.stages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor : investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorCompanyFundingStage)
