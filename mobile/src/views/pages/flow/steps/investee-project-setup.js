import { Button, Card, Form, Input, Item, Label, Text } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../../locales/i18n'

class InvesteeProjectSetup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      tagline: '',
      description: ''
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{I18n.t('flow_page.project_setup.title')}</Text>
        <Form>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.project_setup.project_name') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'name') }
              value={ this.state.name }/>
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.project_setup.project_tagline') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'tagline') }
              value={ this.state.tagline }
            />
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.project_setup.project_description') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'description') }
              value={ this.state.description }
              multiline={true}
              numberOfLines={5}
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

InvesteeProjectSetup.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default InvesteeProjectSetup
