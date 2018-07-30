import { Button, Card, Form, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvesteeLinks } from './index'
import ValidatedInput from '../../../components/validated-input/validated-input'

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
          <ValidatedInput floatingLabel
                          value={ this.state.projectName }
                          labelText={I18n.t('flow_page.project_setup.project_name')}
                          isError={!this.validateProjectName(this.state.projectName)}
                          errorMessage={I18n.t('common.errors.incorrect_project_name')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'projectName')} />
          <ValidatedInput floatingLabel
                          value={ this.state.projectTagline }
                          labelText={I18n.t('flow_page.project_setup.project_tagline')}
                          isError={!this.validateProjectTagline(this.state.projectTagline)}
                          errorMessage={I18n.t('common.errors.incorrect_project_tagline')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'projectTagline')} />
          <ValidatedInput floatingLabel
                          multiline={ true }
                          numberOfLines={ 5 }
                          value={ this.state.projectDescription }
                          labelText={I18n.t('flow_page.project_setup.project_description')}
                          isError={!this.validateProjectDescription(this.state.projectDescription)}
                          errorMessage={I18n.t('common.errors.incorrect_project_description')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'projectDescription')} />
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

  validateProjectName = (projectName) => {
    return validator.isLength(projectName, { min: 3 })
  }

  validateProjectTagline = (projectTagLine) => {
    return !validator.isEmpty(projectTagLine)
  }

  validateProjectDescription = (projectDescription) => {
    return !validator.isEmpty(projectDescription)
  }

  isFormValid = () => {
    const { projectName, projectTagline, projectDescription } = this.state
    const nameLength = this.validateProjectName(projectName)
    const taglineExists = this.validateProjectTagline(projectTagline)
    const descriptionExists = this.validateProjectDescription(projectDescription)

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
