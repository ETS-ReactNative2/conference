import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/Container'
import FlowInputValidated from '../../../design/flow-input-validated'
import { FlowListSwitch } from '../../../design/list-items'
import { CountrySelect } from '../../../design/select'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'

const errorStyleOverride = {
  border: {
    borderColor: '#f2b9cb',
    borderBottomColor: '#f2b9cb'
  },
  text: {
    color: '#f2b9cb'
  }
}

class EmployeeKeywords extends React.Component {

  static BACKGROUND_COLOR = '#c72355'

  constructor (props) {
    super(props)
    this.state = {
      skills: this.props.employee.skills,
      traits: this.props.employee.traits,
      mostInfo: this.props.employee.mostInfo,
      relocate: this.props.employee.relocate,
      remote: this.props.employee.remote,
      country: this.props.employee.country,
      city: this.props.employee.city
    }
    this.state.isFormValid = this.isFormValid()
  }

  validateSkills = (skills) => {
    return skills.length > 0
  }

  validateTraits = (traits) => {
    return traits.length > 0
  }

  validateMostInfo = (mostInfo) => {
    return mostInfo.length > 0
  }

  validateJobCity = (city) => {
    return !validator.isEmpty(city)
  }

  isFormValid = () => {
    const { skills, traits, mostInfo, city } = this.state
    const skillsFilled = this.validateSkills(skills)
    const traitsFilled = this.validateTraits(traits)
    const mostInfoFilled = this.validateMostInfo(mostInfo)
    const jobCityFilled = this.validateJobCity(city)
    return skillsFilled && traitsFilled && mostInfoFilled && jobCityFilled
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleFieldChange = (newValue, name) => {
    this.setState({
      [ name ]: newValue
    }, this.validateForm)
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
            <StepTitle text={ I18n.t('flow_page.employee.role.about') }/>
          </View>
          <Subheader
            text={ I18n.t('flow_page.employee.skills.title') }
          />
          <View style={ { marginLeft: 8, marginRight: 8 } }>
            <FlowInputValidated
              floatingLabel
              value={ this.state.skills }
              labelText={ I18n.t('flow_page.employee.skills.placeholder') }
              isError={ !this.validateSkills(this.state.skills) }
              errorMessage={ I18n.t('flow_page.employee.skills.error') }
              errorStyleOverride={ errorStyleOverride }
              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'skills') }/>
            <FlowInputValidated
              floatingLabel
              value={ this.state.traits }
              labelText={ I18n.t('flow_page.employee.traits.placeholder') }
              isError={ !this.validateTraits(this.state.traits) }
              errorMessage={ I18n.t('flow_page.employee.traits.error') }
              errorStyleOverride={ errorStyleOverride }
              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'traits') }/>
            <FlowInputValidated
              floatingLabel
              value={ this.state.mostInfo }
              labelText={ I18n.t('flow_page.employee.most_info.placeholder') }
              isError={ !this.validateMostInfo(this.state.mostInfo) }
              errorMessage={ I18n.t('flow_page.employee.most_info.error') }
              errorStyleOverride={ errorStyleOverride }
              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'mostInfo') }/>

          </View>
          <Subheader
            text={ I18n.t('flow_page.employee.condition.title') }
          />
          <FlowListSwitch
            text={ I18n.t('flow_page.employee.relocate') }
            switchText={ 'Yes' }
            onToggle={ () => this.handleCheck('relocate') }
            selected={ this.state.relocate }
          />
          <FlowListSwitch
            text={ I18n.t('flow_page.employee.remote') }
            switchText={ 'Yes' }
            onToggle={ () => this.handleCheck('remote') }
            selected={ this.state.remote }
          />
          <CountrySelect
            onChange={ value => {
              this.setState({ country: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
            } }
            value={ this.state.country }
            placeholder={ I18n.t('flow_page.investee.project_location.country_picker_placeholder') }
          />
          <View style={ { marginLeft: 8, marginRight: 8 } }>
            <FlowInputValidated
              floatingLabel
              value={ this.state.city }
              labelText={ I18n.t('flow_page.employee.most_info.placeholder') }
              isError={ !this.validateJobCity(this.state.city) }
              errorMessage={ I18n.t('common.errors.incorrect_job_city') }
              errorStyleOverride={ errorStyleOverride }
              onChangeText={ (newValue) => this.handleFieldChange(newValue, 'city') }/>
          </View>
        </ScrollView>
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

  handleCheck = field => {
    this.setState({
      [ field ]: !this.state[ field ]
    })
  }

  handleSubmit = () => {
    this.props.save({
      skills: this.state.skills,
      traits: this.state.traits,
      mostInfo: this.state.mostInfo,
      relocate: this.state.relocate,
      remote: this.state.remote,
      country: this.state.country,
      city: this.state.city
    })
    this.props.onFill({
      done: true
    })
  }
}

EmployeeKeywords.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    employee: state.signUp.employee
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: saveEmployee => dispatch(signUpActions.saveEmployee(saveEmployee))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeKeywords)
