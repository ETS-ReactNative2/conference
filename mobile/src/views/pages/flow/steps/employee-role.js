import { Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { ROLES } from '../../../../enums'
import * as signUpActions from '../../../../signup/actions'
import { FlowButton } from '../../../design/buttons'
import { Chip } from '../../../design/chips'
import { FlowContainer } from '../../../design/container'
import FlowInputValidated from '../../../design/flow-input-validated'
import { StepTitle } from '../../../design/step-title'
import { EmployeeKeywords } from './index'

const roleOtherIndex = ROLES.find(role => role.slug === 'other').index

const errorStyleOverride = {
  border: {
    borderColor: '#f2b9cb',
    borderBottomColor: '#f2b9cb'
  },
  text: {
    color: '#f2b9cb'
  }
}

class EmployeeRole extends React.Component {

  static BACKGROUND_COLOR = '#c72355'

  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.employee.role,
      other: this.props.employee.roleOtherText,
      // used to stop validation until Save button is hitted for the first time
      // unless field are already filled (editing)
      showValidationError: this.props.employee.role !== -1
    }
    this.state.isFormValid = this.isFormValid()
  }

  validateOtherRoleText () {
    const { selected, other } = this.state
    return selected !== roleOtherIndex || (selected === roleOtherIndex && other !== '')
  }

  isFormValid () {
    return this.state.selected !== -1 && (this.state.selected === roleOtherIndex ? this.state.other !== '' : true)
  }

  onAbortClick = () => {
    this.props.save({
      lookingForJob: false
    })
    this.props.onFill({
      nextStep: null,
      done: true
    })
  }

  handleFieldChange = (text, name) => {
    this.setState({
      [ name ]: text
    }, this.validateForm)
  }

  render () {
    return (
      <FlowContainer>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ 96 } enabled={ Platform.OS === 'ios' }>
            <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
              <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
                <StepTitle text={ I18n.t('flow_page.employee.role.title') }/>
              </View>
              <View style={ { flex: 1, flexWrap: 'wrap', justifyContent: 'flex-start', flexDirection: 'row' } }>
                {
                  ROLES.map(({ slug: option, index }) => {
                    return (
                      <Chip
                        key={ `role-item-${index}` }
                        onSelect={ () => this.handleChange(index) }
                        selected={ this.state.selected === index }
                        text={ I18n.t(`common.roles.${option}`) }/>
                    )
                  })
                }
              </View>
              { this.state.showValidationError && this.state.selected === -1 && (
                <View style={ { marginTop: 8 } }>
                  <Text style={ { color: '#f2b9cb', alignSelf: 'center' } }>
                    {I18n.t('flow_page.employee.role.error_missing_role')}
                  </Text>
                </View>
              )}
              <View style={ { margin: 8 } }>
                <FlowInputValidated
                  overrideStatus={ !this.state.showValidationError }
                  overrideStatusType={'regular'}
                  floatingLabel
                  labelText={ I18n.t('flow_page.employee.role.other') }
                  isError={ this.state.showValidationError && !this.validateOtherRoleText() }
                  errorMessage={ I18n.t('flow_page.employee.role.error_other_role_missing_text') }
                  errorStyleOverride={ errorStyleOverride }
                  onChangeText={ text => this.handleFieldChange(text, 'other') }
                  value={ this.state.other }/>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <View style={ { margin: 8 } }>
          <Text style={ { color: 'white', fontWeight: 'bold', margin: 16, textAlign: 'center' } }
                onPress={ this.onAbortClick }>{ I18n.t('flow_page.employee.role.not_looking_for_job') }</Text>
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

  handleSubmit = () => {
    // after first time hitting Save button, flip flag to enable showing validation errors
    if (!this.state.showValidationError) {
      this.setState( { showValidationError: true } )
    }
    if (this.state.isFormValid) {
      this.props.save({
        role: this.state.selected,
        roleOtherText: this.state.other,
        lookingForJob: true
      })
      this.props.onFill({
        nextStep: EmployeeKeywords
      })
    }
  }

  handleChange = (index) => {
    this.setState({
      selected: index
    }, this.validateForm)
  }
}

EmployeeRole.propTypes = {
  onFill: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    employee: state.signUp.employee
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: employeeData => dispatch(signUpActions.saveEmployee(employeeData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRole)
