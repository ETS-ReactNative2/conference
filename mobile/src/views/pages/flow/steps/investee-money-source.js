import { Body, Button, Card, CheckBox, Form, Icon, Input, Item, Label, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvesteeHiring, InvesteeIco } from './index'

class InvesteeMoneySource extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lookingForMoney: this.props.investee.money,
      amount: this.props.investee.amount
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
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    })
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
