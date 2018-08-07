import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { INVESTOR_INDUSTRIES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvesteeTeamMembers } from './index'

class InvesteeIndustries extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      industry: this.props.industry
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ industry: this.state.industry })
    this.props.onFill( {nextStep: InvesteeTeamMembers})
  }

  handleCheckboxClick = index => {
    this.setState({ industry: index })
  }

  isCheckboxSelected = index => {
    return this.state.industry === index
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.industries.title') }</Text>
        { INVESTOR_INDUSTRIES.map((singleIndustry) => {
          return (
            <ListItem
              onPress={ () => this.handleCheckboxClick(singleIndustry.index) }
              key={ `investment-item-${singleIndustry.slug}` }>
              <Left>
                <Text>{ I18n.t(`common.industries.${singleIndustry.slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  onPress={ () => this.handleCheckboxClick(singleIndustry.index) }
                  selected={ this.isCheckboxSelected(singleIndustry.index) }/>
              </Right>
            </ListItem>
          )
        }) }
        <Button success
                rounded
                block
                disabled={ this.state.industry === -1  }
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }
}

InvesteeIndustries.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    industries: state.signUp.investee.industry
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeIndustries)
