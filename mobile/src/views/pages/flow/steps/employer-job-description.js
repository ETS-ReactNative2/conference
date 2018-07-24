import { Button, Card, Form, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import ValidatedInput from '../../../components/validated-input/validated-input'

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
          <ValidatedInput floatingLabel
                          value={ this.state.link }
                          labelText={I18n.t('flow_page.employer.job.link')}
                          isError={!this.validateJobLink(this.state.link, this.state.description)}
                          errorMessage={I18n.t('common.errors.incorrect_job_link')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'link')} />
          <ValidatedInput floatingLabel
                          multiline={ true }
                          numberOfLines={ 5 }
                          value={ this.state.description }
                          labelText={I18n.t('flow_page.employer.job.description')}
                          isError={!this.validateJobDescription(this.state.link, this.state.description)}
                          errorMessage={I18n.t('common.errors.incorrect_job_description')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'description')} />
          <ValidatedInput floatingLabel
                          keyboardType={ 'numeric' }
                          value={ this.state.min }
                          iconProps = { { active: true, name: 'cash' } }
                          labelText={I18n.t('flow_page.employer.job.min')}
                          isError={!this.validateMinSalary(this.state.min)}
                          errorMessage={I18n.t('common.errors.incorrect_job_min_salary')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'min')} />
          <ValidatedInput floatingLabel
                          keyboardType={ 'numeric' }
                          value={ this.state.max }
                          iconProps = { { active: true, name: 'cash' } }
                          labelText={I18n.t('flow_page.employer.job.max')}
                          isError={!this.validateMaxSalary(this.state.min, this.state.max)}
                          errorMessage={I18n.t('common.errors.incorrect_job_max_salary')}
                          onChangeText={ (newValue) => this.handleFieldChange(newValue, 'max')} />
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

  validateJobLink = (jobLink, jobDescription) => {
    const jobLinkExists = !validator.isEmpty(jobLink)
    const jobDescriptionExists = !validator.isEmpty(jobDescription)
    return jobDescriptionExists || jobLinkExists;
  }

  validateJobDescription = (jobLink, jobDescription) => {
    const jobLinkExists = !validator.isEmpty(jobLink)
    const jobDescriptionExists = !validator.isEmpty(jobDescription)
    return jobDescriptionExists || jobLinkExists;
  }

  validateMinSalary = (minSalary) => {
    const minExists = !validator.isEmpty(minSalary)
    return !minExists || (minExists  && minSalary >= 0);
  }

  validateMaxSalary = (minSalary, maxSalary) => {
    const minExists = !validator.isEmpty(minSalary)
    const maxExists = !validator.isEmpty(maxSalary)
    if (!minExists && !maxExists) {
      return true
    }
    if (!minExists && maxExists) {
      return maxSalary >= 0
    }
    if (minExists && maxExists) {
      return maxSalary >= minSalary && maxSalary >= 0
    }
    return true;
  }

  isFormValid = () => {
    const { link, description, min, max } = this.state
    const linkExists = !validator.isEmpty(link)
    const descriptionExists = !validator.isEmpty(description)
    const minExists = !validator.isEmpty(min)
    const maxExists = !validator.isEmpty(max)

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
