import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { FUNDING_STAGES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvestorGiveaways } from './index'

class InvestorCompanyFundingStage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stages: this.props.stages
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ stages: this.state.stages })
    this.props.onFill({ nextStep: InvestorGiveaways })
  }

  handleCheckboxClick = fieldName => {
    let stages = [ ...this.state.stages ]
    const stageIndex = stages.indexOf(fieldName)
    if (stageIndex !== -1) {
      stages = stages.filter(singleStage => singleStage !== fieldName)
    } else {
      stages.push(fieldName)
    }
    this.setState({ stages })
  }

  isCheckboxSelected = fieldName => {
    return this.state.stages.indexOf(fieldName) !== -1
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.company_funding_stage.title') }</Text>
        { FUNDING_STAGES.map(singleStage => {
          return (
            <ListItem
              onPress={ () => this.handleCheckboxClick(singleStage.index) }
              key={ `funding-item-${singleStage.slug}` }>
              <Left>
                <Text>{ I18n.t(`common.funding_stages.${singleStage.slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  onPress={ () => this.handleCheckboxClick(singleStage.index) }
                  selected={ this.isCheckboxSelected(singleStage.index) }/>
              </Right>
            </ListItem>
          )
        }) }
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
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorCompanyFundingStage)
