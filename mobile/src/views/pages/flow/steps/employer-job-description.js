import { Button, Card, Form, Icon, Input, Item, Label, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'

class EmployerJobDescription extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...{ link, description, min, max } = this.props.employer
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.employer.job.title') }</Text>
        <Form>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.employer.job.link') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'link') }
              value={ this.state.link }/>
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.employer.job.description') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'description') }
              value={ this.state.description }
              multiline={ true }
              numberOfLines={ 5 }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='cash'/>
            <Label>{ I18n.t('flow_page.employer.job.min') }</Label>
            <Input
              keyboardType={ 'numeric' }
              onChangeText={ text => this.handleFieldChange(text, 'min') }
              value={ this.state.min }
            />
          </Item>
          <Item floatingLabel>
            <Icon active name='cash'/>
            <Label>{ I18n.t('flow_page.employer.job.max') }</Label>
            <Input
              keyboardType={ 'numeric' }
              onChangeText={ text => this.handleFieldChange(text, 'max') }
              value={ this.state.max }
            />
          </Item>
        </Form>
        <Button success
                rounded
                block
                onPress={ this.handleSubmit }
                disabled={ !this.state.isFormValid }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  isFormValid = () => {
    const { link, description, min, max } = this.state
    const linkExists = !validator.isEmpty(link)
    const descriptionExists = !validator.isEmpty(description)
    const minExists = !validator.isEmpty(min)
    const maxExists = !validator.isEmpty(max)

    console.log({ linkExists, descriptionExists, minExists, maxExists })
    if (maxExists && minExists) {
      return (linkExists || descriptionExists)
        && max >= min
        && min >= 0
        && max >= 0
    }
    return linkExists || descriptionExists
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.save(this.state)
    this.props.onFill({
      done: true
    })
  }
  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    }, this.validateForm)
  }
}

EmployerJobDescription.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    employer: state.signUp.employer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: employerInfo => dispatch(signUpActions.saveProfileEmployer(employerInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerJobDescription)
