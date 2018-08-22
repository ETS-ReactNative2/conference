import { Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { ROLES } from '../../../../enums'
import * as signUpActions from '../../../../signup/actions'
import { FlowButton } from '../../../design/buttons'
import { Chip } from '../../../design/chips'
import { FlowContainer } from '../../../design/container'
import { StepTitle } from '../../../design/step-title'
import { EmployeeKeywords } from './index'

class EmployeeRole extends React.Component {

  static BACKGROUND_COLOR = '#c72355'

  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.employee.role,
    }
    this.state.isFormValid = this.state.selected !== -1
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

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1, paddingLeft: 16, paddingRight: 16 } }>
          <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
            <StepTitle text={ I18n.t('flow_page.employee.role.title') }/>
          </View>
          <View style={ { flex: 1, flexWrap: 'wrap', justifyContent: 'flex-start', flexDirection: 'row' } }>
            {
              ROLES.map(({ slug: option, index }) => {
                return (
                  <Chip
                    key={`role-item-${index}`}
                    onSelect={ () => this.handleChange(index) }
                    selected={ this.state.selected === index }
                    text={ I18n.t(`common.roles.${option}`) }/>
                )
              })
            }
          </View>
        </ScrollView>
        <View style={ { margin: 8 } }>
          <Text style={ { color: 'white', fontWeight: 'bold', margin: 16, textAlign: 'center' } }
                onPress={ this.onAbortClick }>{ I18n.t('flow_page.employee.role.not_looking_for_job') }</Text>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={ !this.state.isFormValid }
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }

  handleSubmit = () => {
    this.props.save({
      role: this.state.selected,
      lookingForJob: true
    })
    this.props.onFill({
      nextStep: EmployeeKeywords
    })
  }

  handleCheck = () => {
    const { lookingForJob } = this.state
    this.setState({
      lookingForJob: !lookingForJob,
    })
  }

  handleChange = (index) => {
    this.setState({
      selected: index,
      isFormValid: true
    })
  }
}

EmployeeRole.propTypes = {
  onFill: PropTypes.func.isRequired
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
