import { Button, Card, Form, Icon, Input, Item, Label, Left, ListItem, Radio, Right, Switch, Text } from 'native-base'
import React from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { INVESTOR_NATIONALITY } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvesteeHiring } from './index'

class InvesteeMoneySource extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      lookingForMoney: this.props.investee.money,
      amount: this.props.investee.amount,
      nationality: this.props.investee.investorNationality
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.money.title') }</Text>
        <ListItem>
          <Left>
            <Switch
              onValueChange={ () => this.handleCheck() }
              value={ this.state.lookingForMoney }/>
            <Text style={ { marginLeft: 8 } }>{ I18n.t('flow_page.money.need_money') }</Text>
          </Left>
        </ListItem>
        {
          this.state.lookingForMoney && (
            <React.Fragment>
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
              <Text style={ { fontSize: 24, marginTop: 16 } }>{ I18n.t('flow_page.money.nationality') }</Text>
              { INVESTOR_NATIONALITY.map((nationality, index) => {
                return (
                  <ListItem
                    onPress={ () => this.handleChange(index) }
                    key={ `nationality-${nationality.slug}` }>
                    <Left>
                      <Text>{ I18n.t(`common.investor_nationality.${nationality.slug}`) }</Text>
                    </Left>
                    <Right>
                      <Radio
                        onPress={ () => this.handleChange(index) }
                        selected={ this.state.nationality === index }/>
                    </Right>
                  </ListItem>
                )
              }) }
            </React.Fragment>
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

  handleChange = (index) => {
    this.setState({
      nationality: index
    }, this.validateForm)
  }

  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    }, this.validateForm)
  }

  handleSubmit = () => {
    const { lookingForMoney, amount, nationality } = this.state
    this.props.save({
      money: lookingForMoney,
      amount: amount,
      investorNationality: nationality
    })
    this.props.onFill({
      nextStep: InvesteeHiring
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
