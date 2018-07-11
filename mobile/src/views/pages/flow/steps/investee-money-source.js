import { Body, Button, Card, CheckBox, Form, Icon, Input, Item, Label, ListItem, Text } from 'native-base'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvesteeHiring, InvesteeIco } from './index'
import validator from 'validator'

class InvesteeMoneySource extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lookingForMoney: this.props.investee.money,
      amount: this.props.investee.amount
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.money.title') }</Text>
        <ListItem>
          <CheckBox
            onPress={ this.handleCheck }
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
                  onChangeText={ text => this.handleFieldChange(text, 'amount') }
                  value={ this.state.amount }
                />
              </Item>
            </Form>
          )
        }
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
    const { lookingForMoney: money, amount } = this.state
    if (!money) {
      return true
    }
    return !validator.isEmpty(amount) && amount > 0
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleCheck = () => {
    this.setState({ lookingForMoney: !this.state.lookingForMoney }, this.validateForm)
  }

  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    }, this.validateForm)
  }

  handleSubmit = () => {
    const { lookingForMoney, amount } = this.state
    this.props.save({
      money: lookingForMoney,
      amount: amount
    })
    this.props.onFill({
      nextStep: lookingForMoney ? InvesteeIco : InvesteeHiring
    })
  }
}

const mapStateToProps = state => {
  return {
    investee: state.signUp.investee
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: investeeInfo => dispatch(signUpActions.saveProfileInvestee(investeeInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeMoneySource)
