import { Button, Card, Form, Icon, Input, Item, Label, Left, ListItem, Radio, Right, Switch, Text } from 'native-base'
import React from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { REGIONS } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvesteeHiring, InvesteeTokenType } from './index'
import ValidatedInput from '../../../components/validated-input/validated-input'

class InvesteeMoneySource extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lookingForMoney: this.props.investee.money,
      amount: this.props.investee.amount,
      nationality: this.props.investee.investorNationality,
      regionOtherText: this.props.investee.regionOtherText
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
              { REGIONS.map((nationality) => {
                return (
                  <ListItem
                    onPress={ () => this.handleChange(nationality) }
                    key={ `nationality-${nationality.slug}` }>
                    <Left>
                      <Text>{ I18n.t(`common.regions.${nationality.slug}`) }</Text>
                    </Left>
                    <Right>
                      <Radio
                        onPress={ () => this.handleChange(nationality) }
                        selected={ this.state.nationality.index === nationality.index }/>
                    </Right>
                  </ListItem>
                )
              }) }
              {this.state.nationality.slug === "other" && (
                <ValidatedInput floatingLabel
                  value={ this.state.regionOtherText }
                  labelText={ I18n.t('flow_page.money.other_location_placeholder') }
                  isError={ this.state.regionOtherText.length > 40 }
                  errorMessage={ I18n.t('common.errors.incorrect_investor_custom_location') }
                  onChangeText={ (newValue) => this.handleFieldChange(newValue, 'regionOtherText') }/>
              )}
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
    let isValid = true;
    const { lookingForMoney: money, amount, nationality, regionOtherText } = this.state
    if (money) {
      isValid = !validator.isEmpty(amount) && amount > 0
    }
    if (nationality.slug === "other") {
      isValid = regionOtherText.length <= 40
    }
    return isValid;
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleCheck = () => {
    this.setState({ lookingForMoney: !this.state.lookingForMoney }, this.validateForm)
  }

  handleChange = (newValue) => {
    this.setState({
      nationality: newValue
    }, this.validateForm)
  }

  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    }, this.validateForm)
  }

  handleSubmit = () => {
    const { lookingForMoney, amount, nationality, regionOtherText } = this.state
    this.props.save({
      money: lookingForMoney,
      amount: amount,
      investorNationality: nationality,
      regionOtherText: regionOtherText
    })
    this.props.onFill({
      nextStep: lookingForMoney ? InvesteeTokenType : InvesteeHiring
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
