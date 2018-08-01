import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { INVESTOR_INDUSTRIES } from '../../../../enums'
import { signUpActions } from '../../../../signup'

class InvestorIndustries extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      industries: this.props.industries
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ industries: this.state.industries })
    this.props.onFill({ done: true })
  }

  handleCheckboxClick = fieldName => {
    let industries = [ ...this.state.industries ]
    const industryIndex = industries.indexOf(fieldName)
    if (industryIndex !== -1) {
      industries = industries.filter(singleIndustry => singleIndustry !== fieldName)
    } else {
      industries.push(fieldName)
    }
    this.setState({ industries })
  }

  isCheckboxSelected = fieldName => {
    return this.state.industries.indexOf(fieldName) !== -1
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.industries.title') }</Text>
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
                disabled={ this.state.industries.length === 0 }
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }
}

InvestorIndustries.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    industries: state.signUp.investor.industries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorIndustries)
