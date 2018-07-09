import { Button, Card, Form, Input, Item, Label, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'
import { InvesteeMoneySource } from './index'

class InvesteeTeamMembers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      members: ''
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.members.title') }</Text>
        <Form>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.members.label') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'members') }
              value={ this.state.members }
              multiline={ true }
              numberOfLines={ 5 }
            />
          </Item>
        </Form>
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

  handleSubmit = () => {
    this.props.onFill({
      nextStep: InvesteeMoneySource
    })
  }
  handleFieldChange = (event, field) => {
    this.setState({
      [ field ]: event.target.value
    })
  }
}

InvesteeTeamMembers.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default InvesteeTeamMembers
