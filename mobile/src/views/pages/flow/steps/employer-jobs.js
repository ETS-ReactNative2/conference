import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { JOB_LOCATION, PAYMENTS, ROLES } from '../../../../enums'
import * as signUpActions from '../../../../signup/actions'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/Container'
import FlowInputValidated from '../../../design/flow-input-validated'
import { FlowListItem, FlowListSwitch } from '../../../design/list-items'
import { CountrySelect } from '../../../design/select'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'

class EmployerJobs extends React.Component {

  static BACKGROUND_COLOR = '#182E5B'
  static TITLE = 'Job questions'

  constructor (props) {
    super(props)
    const { roles, ...jobs } = this.props.employer
    this.state = {
      ...jobs
    }
    this.state.isFormValid = this.isFormValid()
  }

  handleFieldChange = (text, role, name) => {
    this.setState({
      [ role ]: {
        ...this.state[ role ],
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

  handleCheck = (role, field) => {
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        [ field ]: !this.state[ role ][ field ]
      }
    }, this.validateForm)
  }

  handleCheckboxClickLocation = (index, role) => {
    let location = [ ...this.state[ role ].location ]
    const locationIndex = location.indexOf(index)
    if (locationIndex !== -1) {
      location = location.filter(pay => pay !== index)
    } else {
      location.push(index)
    }
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        location
      }
    }, this.validateForm)
  }

  handleCheckboxPartTimeClick = (role) => {
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        partTime: !this.state[ role ].partTime
      }
    }, this.validateForm)
  }

  isCheckboxSelectedLocation = (index, role) => {
    return this.state[ role ].location.indexOf(index) !== -1
  }

  handleCheckboxClick = (index, role) => {
    let payments = [ ...this.state[ role ].payments ]
    const paymentIndex = payments.indexOf(index)
    if (paymentIndex !== -1) {
      payments = payments.filter(pay => pay !== index)
    } else {
      payments.push(index)
    }
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        payments
      }
    }, this.validateForm)
  }

  isCheckboxSelected = (index, role) => {
    return this.state[ role ].payments.indexOf(index) !== -1
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
            <StepTitle text={ I18n.t('flow_page.employer.job.title') }/>
          </View>
          { this.props.employer.roles
            .map(role => ROLES.find(job => job.index === role).slug)
            .map(role => {
                return (
                  <React.Fragment key={ role }>
                    <StepTitle text={ I18n.t(`common.roles_job.${role}`) }/>
                    <Subheader text={ I18n.t(`flow_page.employer.keyword.links`) }/>
                    <View style={ { marginLeft: 8, marginRight: 8 } }>
                      <FlowInputValidated
                        floatingLabel
                        value={ this.state[ role ].keywords }
                        labelText={ I18n.t('flow_page.employer.keyword.title') }
                        isError={ !this.validateSkills(this.state[ role ].keywords) }
                        errorMessage={ I18n.t('flow_page.employee.skills.error') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, role, 'keywords') }/>
                      <FlowInputValidated
                        floatingLabel
                        value={ this.state[ role ].link }
                        labelText={ I18n.t('flow_page.employer.job.link') }
                        isError={ !this.validateJobLink(this.state[ role ].link,
                          this.state[ role ].description) }
                        errorMessage={ I18n.t('common.errors.incorrect_job_link') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue, role, 'link') }/>
                      <FlowInputValidated
                        floatingLabel
                        multiline={ true }
                        numberOfLines={ 5 }
                        value={ this.state[ role ].description }
                        labelText={ I18n.t('flow_page.employer.job.description') }
                        isError={ !this.validateJobDescription(this.state[ role ].link,
                          this.state[ role ].description) }
                        errorMessage={ I18n.t('common.errors.incorrect_job_description') }
                        onChangeText={ (newValue) => this.handleFieldChange(newValue,
                          role,
                          'description') }/>
                    </View>
                    <View style={ { marginTop: 16, marginBottom: 16 } }>
                      <FlowListSwitch
                        text={ I18n.t('flow_page.employer.job.part_time') }
                        switchText={ I18n.t('common.yes') }
                        selected={ this.state[ role ].partTime }
                        onToggle={ () => this.handleCheckboxPartTimeClick(role) }/>
                    </View>
                    <Subheader
                      text={ I18n.t('flow_page.employer.payment.title') }
                    />
                    { PAYMENTS.map(({ slug, index }) => {
                      return (
                        <FlowListItem
                          key={ `payment-${slug}` }
                          selected={ this.isCheckboxSelected(index, role) }
                          onSelect={ () => this.handleCheckboxClick(index, role) }
                          text={ I18n.t(`common.payment.${slug}`) }
                        />
                      )
                    }) }
                    <Subheader
                      text={ I18n.t('flow_page.employer.location.title') }
                    />
                    { JOB_LOCATION.map(({ slug, index }) => {
                      return (
                        <FlowListItem
                          key={ `location-${slug}` }
                          selected={ this.isCheckboxSelectedLocation(index, role) }
                          onSelect={ () => this.handleCheckboxClickLocation(index, role) }
                          text={ I18n.t(`common.job_location.${slug}`) }
                        />
                      )
                    }) }

                    { this.state[ role ].location.includes(1) && (
                      <React.Fragment>
                        <CountrySelect
                          placeholder={ 'Country' }
                          value={ this.state[ role ].country }
                          onChange={ value => {
                            this.setState({
                              [ role ]: {
                                ...this.state[ role ],
                                country: { cca2: value.cca2, countryName: value.name, calling: value.callingCode }
                              }
                            })
                          } }
                        />
                        <View style={ { marginLeft: 8, marginRight: 8 } }>
                          <FlowInputValidated
                            floatingLabel
                            value={ this.state[ role ].city }
                            labelText={ I18n.t('flow_page.employer.job.city') }
                            isError={ !this.validateJobCity(this.state[ role ].city) }
                            errorMessage={ I18n.t('common.errors.incorrect_job_city') }
                            onChangeText={ (newValue) => this.handleFieldChange(newValue, role, 'city') }/>
                        </View>
                      </React.Fragment>
                    ) }
                    <View style={ { marginBottom: 64 } }/>
                  </React.Fragment>
                )
              }
            )
          }
        </ScrollView>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ 'Next' }
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
    const { isFormValid, ...jobs } = this.state
    return Object.values(jobs)
      .map(({ link, description, payments, location, city }) => {
        return this.validateJobLink(link,
          description) && payments.length > 0 && location.length > 0 && (location.includes(1) ? this.validateJobCity(
          city) : true)
      })
      .reduce((previous, current) => {
        return previous && current
      })

  }

  handleSubmit = () => {
    const { isFormValid, ...jobs } = this.state
    this.props.save({
      ...jobs
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
