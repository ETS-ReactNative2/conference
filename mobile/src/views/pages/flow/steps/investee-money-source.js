import { Body, Button, Card, CheckBox, Form, Icon, Input, Item, Label, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'

class InvesteeMoneySource extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lookingForMoney: false,
      amount: ''
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.money.title') }</Text>
        <ListItem>
          <CheckBox
            onPress={ () => this.setState({ lookingForMoney: !this.state.lookingForMoney }) }
            checked={ this.state.lookingForMoney }/>
          <Body>
          <Text>{ I18n.t('flow_page.money.need_money') }</Text>
          </Body>
        </ListItem>
        {
          this.state.lookingForMoney && (
            <Form>
              <Item floatingLabel>
                <Icon active name='cash'/>
                <Label>{ I18n.t('flow_page.money.amount') }</Label>
                <Input
                  keyboardType={ 'numeric' }
                  onChange={ (e) => this.handleFieldChange(e, 'amount') }
                  value={ this.state.amount }
                />
              </Item>
            </Form>
          )
        }
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

  handleFieldChange = (e, name) => {
    this.setState({
      [ name ]: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.onFill(this.state)
  }
}

InvesteeMoneySource.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default InvesteeMoneySource
