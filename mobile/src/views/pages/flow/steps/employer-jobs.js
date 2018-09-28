import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { JOB_LOCATION, PAYMENTS, ROLES } from '../../../../enums'
import * as signUpActions from '../../../../signup/actions'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import FlowInputValidated from '../../../design/flow-input-validated'
import { FlowListItem, FlowListSwitch } from '../../../design/list-items'
import { CountrySelect } from '../../../design/select'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'

const LOCAL_JOB = 1

class EmployerJobs extends React.Component {

  static BACKGROUND_COLOR = '#182E5B'

  constructor (props) {
    super(props)
    this.state = {
      employer: this.props.employer
    }
    this.state.isFormValid = this.isFormValid()
  }

  handleFieldChange = (text, name) => {
    this.setState({
      employer: {
        ...this.state.employer,
        [ name ]: text
      }

    }, this.validateForm)
  }

  validateSkills = (skills) => {
    return !validator.isEmpty(skills)
  }

  validateJobLink = (jobLink, jobDescription) => {
    const jobLinkExists = !validator.isEmpty(jobLink)
    const jobDescriptionExists = !validator.isEmpty(jobDescription)
    return jobDescriptionExists || jobLinkExists
  }

  validateJobDescription = (jobLink, jobDescription) => {
    const jobLinkExists = !validator.isEmpty(jobLink)
    const jobDescriptionExists = !validator.isEmpty(jobDescription)
    return jobDescriptionExists || jobLinkExists
  }

  validateJobCity = (city) => {
    return !validator.isEmpty(city)
  }

  handleCheckboxClickLocation = index => {
    let location = [ ...this.state.employer.location ]
    const locationIndex = location.indexOf(index)
    if (locationIndex !== -1) {
      location = location.filter(pay => pay !== index)
    } else {
      location.push(index)
    }
    this.setState({
      employer: {
        ...this.state.employer ,
        location
      }
    }, this.validateForm)
  }

  handleCheckboxPartTimeClick = () => {
    this.setState({
      employer: {
        ...this.state.employer,
        partTime: !this.state.employer.partTime
      }
    }, this.validateForm)
  }

  isCheckboxSelectedLocation = index => {
    return this.state.employer.location.indexOf(index) !== -1
  }

  handleCheckboxClick = index => {
    let payments = [ ...this.state.employer.payments ]
    const paymentIndex = payments.indexOf(index)
    if (paymentIndex !== -1) {
      payments = payments.filter(pay => pay !== index)
    } else {
      payments.push(index)
    }
    this.setState({
      employer: {
        ...this.state.employer,
        payments
      }
    }, this.validateForm)
  }

  isCheckboxSelected = (index) => {
    return this.state.employer.payments.indexOf(index) !== -1
  }

  render () {
    const role = ROLES.find(r => r.index === this.state.employer.role).slug

    return (
      <FlowContainer>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ 96 } enabled={ Platform.OS === 'ios' }>
            <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
              <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
                <StepTitle text={ I18n.t(`common.roles_job.${role}`) }/>
              </View>
              <Subheader
                color={ 'white' }
                text={ I18n.t(`flow_page.employer.keyword.links`) }/>
              <View style={ { marginLeft: 8, marginRight: 8 } }>
                <FlowInputValidated
                  floatingLabel
                  value={ this.state.employer.keywords }
                  labelText={ I18n.t('flow_page.employer.keyword.title') }
                  isError={ !this.validateSkills(this.state.employer.keywords) }
                  errorMessage={ I18n.t('flow_page.employee.skills.error') }
                  onChangeText={ (newValue) => this.handleFieldChange(newValue, 'keywords') }/>
                <FlowInputValidated
                  floatingLabel
                  value={ this.state.employer.link }
                  labelText={ I18n.t('flow_page.employer.job.link') }
                  isError={ !this.validateJobLink(this.state.employer.link,
                    this.state.employer.description) }
                  errorMessage={ I18n.t('common.errors.incorrect_job_link') }
                  onChangeText={ (newValue) => this.handleFieldChange(newValue, 'link') }/>
                <FlowInputValidated
                  floatingLabel
                  multiline={ true }
                  numberOfLines={ 5 }
                  value={ this.state.employer.description }
                  labelText={ I18n.t('flow_page.employer.job.description') }
                  isError={ !this.validateJobDescription(this.state.employer.link,
                    this.state.employer.description) }
                  errorMessage={ I18n.t('common.errors.incorrect_job_description') }
                  onChangeText={ (newValue) => this.handleFieldChange(newValue, 'description') }/>
              </View>
              <View style={ { marginTop: 16, marginBottom: 16 } }>
                <FlowListSwitch
                  text={ I18n.t('flow_page.employer.job.part_time') }
                  switchText={ this.state.employer.partTime ? I18n.t('common.yes') : I18n.t('common.no') }
                  selected={ this.state.employer.partTime }
                  onToggle={ () => this.handleCheckboxPartTimeClick() }/>
              </View>
              <Subheader
                color={ 'white' }
                text={ I18n.t('flow_page.employer.payment.title') }
              />
              { PAYMENTS.map(({ slug, index }) => {
                return (
                  <FlowListItem
                    key={ `payment-${slug}` }
                    selected={ this.isCheckboxSelected(index) }
                    onSelect={ () => this.handleCheckboxClick(index) }
                    text={ I18n.t(`common.payment.${slug}`) }
                  />
                )
              }) }
              <Subheader
                color={ 'white' }
                text={ I18n.t('flow_page.employer.location.title') }
              />
              { JOB_LOCATION.map(({ slug, index }) => {
                return (
                  <FlowListItem
                    key={ `location-${slug}` }
                    selected={ this.isCheckboxSelectedLocation(index) }
                    onSelect={ () => this.handleCheckboxClickLocation(index) }
                    text={ I18n.t(`common.job_location.${slug}`) }
                  />
                )
              }) }

              { this.state.employer.location.includes(LOCAL_JOB) && (
                <React.Fragment>
                  <CountrySelect
                    placeholder={ 'Country' }
                    value={ this.state.employer.country }
                    onChange={ value => {
                      this.setState({
                        employer: {
                          ...this.state.employer,
                          country: { cca2: value.cca2, countryName: value.name, calling: value.callingCode }
                        }
                      })
                    } }
                  />
                  <View style={ { marginLeft: 8, marginRight: 8 } }>
                    <FlowInputValidated
                      floatingLabel
                      value={ this.state.employer.city }
                      labelText={ I18n.t('flow_page.employer.job.city') }
                      isError={ !this.validateJobCity(this.state.employer.city) }
                      errorMessage={ I18n.t('common.errors.incorrect_job_city') }
                      onChangeText={ (newValue) => this.handleFieldChange(newValue, 'city') }/>
                  </View>
                </React.Fragment>
              ) }
              <View style={ { marginBottom: 64 } }/>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={ !this.state.isFormValid }
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  isFormValid = () => {
    const { employer } = this.state
    const { link, description, payments, location, city } = employer
    return this.validateJobLink(link, description)
      && payments.length > 0
      && location.length > 0
      && (location.includes(LOCAL_JOB) ? this.validateJobCity(city) : true)
  }

  handleSubmit = () => {
    const { employer } = this.state
    this.props.save({
      ...employer
    })
    this.props.onFill({
      done: true
    })
  }
}

EmployerJobs.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployerJobs)
