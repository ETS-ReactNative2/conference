import { Button, Card, Form, Icon, Input, Item, Label, Text } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../../locales/i18n'

class CommonProfileOnboarding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      title: '',
      company: '',
      twitter: '',
      facebook: ''
    }
  }

  handleSubmit = () => {
    this.props.onFill(this.state)
  }
  handleFieldChange = (e, name) => {
    this.setState({
      [ name ]: e.target.value
    })
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{I18n.t('flow_page.common.profile_onboarding.title')}</Text>
        <Form>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.common.profile_onboarding.name') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'name') }
              value={ this.state.name }/>
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.common.profile_onboarding.titleField') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'title') }
              value={ this.state.title }
            />
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.common.profile_onboarding.company') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'company') }
              value={ this.state.title }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='logo-twitter' />
            <Label>{ I18n.t('common.twitter') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'twitter') }
              value={ this.state.twitter }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='logo-facebook' />
            <Label>{ I18n.t('common.facebook') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'facebook') }
              value={ this.state.facebook }
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
}

CommonProfileOnboarding.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default CommonProfileOnboarding
