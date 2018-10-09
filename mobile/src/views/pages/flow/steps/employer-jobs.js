import { Text, View } from 'native-base'
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
      employer: this.props.employer,
      // used to stop validation until Save button is hitted for the first time
      // unless field are already filled (editing)
      showValidationError: this.props.employer.keywords !== ''
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
                  overrideStatus={ !this.state.showValidationError }
                  overrideStatusType={'regular'}
                  floatingLabel
                  value={ this.state.employer.keywords }
                  labelText={ I18n.t('flow_page.employer.keyword.title') }
                  isError={ this.state.showValidationError && !this.validateSkills(this.state.employer.keywords) }
                  errorMessage={ I18n.t('flow_page.employee.skills.error') }
                  onChangeText={ (newValue) => this.handleFieldChange(newValue, 'keywords') }/>
                <FlowInputValidated
                  overrideStatus={ !this.state.showValidationError }
                  overrideStatusType={'regular'}
                  floatingLabel
                  value={ this.state.employer.link }
                  labelText={ I18n.t('flow_page.employer.job.link') }
                  isError={ this.state.showValidationError && !this.validateJobLink(this.state.employer.link,
                    this.state.employer.description) }
                  errorMessage={ I18n.t('common.errors.incorrect_job_link') }
                  onChangeText={ (newValue) => this.handleFieldChange(newValue, 'link') }/>
                <FlowInputValidated
                  overrideStatus={ !this.state.showValidationError }
                  overrideStatusType={'regular'}
                  floatingLabel
                  multiline={ true }
                  numberOfLines={ 5 }
                  value={ this.state.employer.description }
                  labelText={ I18n.t('flow_page.employer.job.description') }
                  isError={ this.state.showValidationError && !this.validateJobDescription(this.state.employer.link,
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
              { this.state.showValidationError && this.state.employer.payments.length === 0 && (
                <View style={ { marginTop: 8 } }>
                  <Text style={ { color: 'red', alignSelf: 'center' } }>
                    {I18n.t('flow_page.employer.payment.error_missing_payment')}
                  </Text>
                </View>
              )}
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
              { this.state.showValidationError && this.state.employer.location.length === 0 && (
                <View style={ { marginTop: 8 } }>
                  <Text style={ { color: 'red', alignSelf: 'center' } }>
                    {I18n.t('flow_page.employer.location.error_missing_location')}
                  </Text>
                </View>
              )}
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
                      overrideStatus={ !this.state.showValidationError }
                      overrideStatusType={'regular'}
                      floatingLabel
                      value={ this.state.employer.city }
                      labelText={ I18n.t('flow_page.employer.job.city') }
                      isError={ this.state.showValidationError && !this.validateJobCity(this.state.employer.city) }
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
            disabled={ this.state.showValidationError && !this.state.isFormValid }
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
    const { keywords, link, description, payments, location, city } = employer
    return this.validateJobLink(link, description)
      && keywords.length > 0
      && payments.length > 0
      && location.length > 0
      && (location.includes(LOCAL_JOB) ? this.validateJobCity(city) : true)
  }

  handleSubmit = () => {
    const { employer } = this.state
    // after first time hitting Save button, flip flag to enable showing validation errors
    if (!this.state.showValidationError) {
      this.setState( { showValidationError: true } )
    }
    if (this.state.isFormValid) {
      this.props.save({
        ...employer
      })
      this.props.onFill({
        done: true
      })
    }
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
