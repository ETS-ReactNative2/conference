import { Button, Card, Form, Icon, Input, Item, Label, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvesteeProductStage } from './index'

class InvesteeLinks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...{ website, whitepaper, telegram, twitter } = this.props.investee
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.links.title') }</Text>
        <Form>
          <Item floatingLabel>
            <Icon active name='globe'/>
            <Label>{ I18n.t('flow_page.links.website') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'website') }
              value={ this.state.website }/>
          </Item>
          <Item floatingLabel>
            <Icon active name='copy'/>
            <Label>{ I18n.t('flow_page.links.whitepaper') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'whitepaper') }
              value={ this.state.whitepaper }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='paper-plane'/>
            <Label>{ I18n.t('flow_page.links.telegram') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'telegram') }
              value={ this.state.telegram }/>
          </Item>
          <Item floatingLabel>
            <Icon active name='logo-twitter'/>
            <Label>{ I18n.t('common.twitter') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'twitter') }
              value={ this.state.twitter }
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
    this.props.save(this.state)
    this.props.onFill({
      nextStep: InvesteeProductStage
    })
  }

  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    })
  }
}

InvesteeLinks.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeLinks)
