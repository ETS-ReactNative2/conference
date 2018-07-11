import { Button, Card, Form, Input, Item, Label, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvesteeLinks } from './index'

class InvesteeProjectSetup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ...{ projectName, projectTagline, projectDescription } = this.props.investee
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.project_setup.title') }</Text>
        <Form>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.project_setup.project_name') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'projectName') }
              value={ this.state.projectName }/>
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.project_setup.project_tagline') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'projectTagline') }
              value={ this.state.projectTagline }
            />
          </Item>
          <Item floatingLabel>
            <Label>{ I18n.t('flow_page.project_setup.project_description') }</Label>
            <Input
              onChangeText={ text => this.handleFieldChange(text, 'projectDescription') }
              value={ this.state.projectDescription }
              multiline={ true }
              numberOfLines={ 5 }
            />
          </Item>
        </Form>
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
    const { projectName, projectTagline, projectDescription } = this.state
    const nameLength = validator.isLength(projectName, { min: 3 })
    const taglineExists = !validator.isEmpty(projectTagline)
    const descriptionExists = !validator.isEmpty(projectDescription)

    return nameLength && taglineExists && descriptionExists
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.save({
      projectName: this.state.projectName,
      projectTagline: this.state.projectTagline,
      projectDescription: this.state.projectDescription
    })
    this.props.onFill({
      nextStep: InvesteeLinks
    })
  }
  handleFieldChange = (value, name) => {
    this.setState({
      [ name ]: value
    }, this.validateForm)
  }
}

InvesteeProjectSetup.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeProjectSetup)
