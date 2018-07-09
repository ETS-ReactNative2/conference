import { Body, Button, Card, CheckBox, Form, Icon, Input, Item, Label, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'

const stages = [
    'seed',
    'pre',
    'post'
]

class InvestorCompanyFundingStage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stages: []
    }
  }

  handleSubmit = () => {
    this.props.onFill(this.state)
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
                    <ListItem key={`funding-item-${singleStage}`}>
                      <CheckBox
                        onPress={ () => this.handleCheckboxClick(singleStage)}
                        checked={ this.isCheckboxSelected(singleStage)}
                      />
                      <Body>
                        <Text>{ I18n.t(`common.funding_stages.${singleStage}`) }</Text>
                      </Body>
                    </ListItem>
                );
            })}
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

export default InvestorCompanyFundingStage
