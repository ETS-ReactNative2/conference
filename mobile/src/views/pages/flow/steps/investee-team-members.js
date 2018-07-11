import { Button, Card, Form, Input, Item, Label, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvesteeMoneySource } from './index'

class InvesteeTeamMembers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      members: this.props.investee.teamMembers
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
              onChangeText={ text => this.handleFieldChange(text, 'members') }
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
    this.props.save({
      teamMembers: this.state.members
    })
    this.props.onFill({
      nextStep: InvesteeMoneySource
    })
  }
  handleFieldChange = (text, field) => {
    this.setState({
      [ field ]: text
    })
  }
}

InvesteeTeamMembers.propTypes = {
  onFill: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeTeamMembers)
