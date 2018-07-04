import { Button, Card, Form, Input, Item, Label, Text, Icon } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../../locales/i18n'

class InvesteeLinks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      website: '',
      whitepaper: '',
      telegram: '',
      twitter: ''
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.links.title') }</Text>
        <Form>
          <Item floatingLabel>
            <Icon active name='globe' />
            <Label>{ I18n.t('flow_page.links.website') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'website') }
              value={ this.state.website }/>
          </Item>
          <Item floatingLabel>
            <Icon active name='copy' />
            <Label>{ I18n.t('flow_page.links.whitepaper') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'whitepaper') }
              value={ this.state.whitepaper }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='paper-plane' />
            <Label>{ I18n.t('flow_page.links.telegram') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'telegram') }
              value={ this.state.telegram }/>
          </Item>
          <Item floatingLabel>
            <Icon active name='logo-twitter' />
            <Label>{ I18n.t('flow_page.links.twitter') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'twitter') }
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
    this.props.onFill(this.state)
  }
  handleFieldChange = (e, name) => {
    this.setState({
      [ name ]: e.target.value
    })
  }
}

InvesteeLinks.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default InvesteeLinks
