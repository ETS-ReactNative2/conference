import { Button, Card, Form, Input, Item, Label, Text, Icon } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../../locales/i18n'

class EmployerJobDescription extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      link: '',
      description: '',
      min: '0',
      max: '0'
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{I18n.t('flow_page.employer.job.title')}</Text>
        <Form>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.employer.job.link') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'link') }
              value={ this.state.name }/>
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.employer.job.description') }</Label>
            <Input
              onChange={ (e) => this.handleFieldChange(e, 'description') }
              value={ this.state.description }
              multiline={true}
              numberOfLines={5}
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='cash'/>
            <Label>{ I18n.t('flow_page.employer.job.min') }</Label>
            <Input
              keyboardType={ 'numeric' }
              onChange={ (e) => this.handleFieldChange(e, 'min') }
              value={ this.state.min }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='cash'/>
            <Label>{ I18n.t('flow_page.employer.job.max') }</Label>
            <Input
              keyboardType={ 'numeric' }
              onChange={ (e) => this.handleFieldChange(e, 'max') }
              value={ this.state.max }
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

EmployerJobDescription.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default EmployerJobDescription
