import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { Chip } from '../../../design/chips'
import { FlowContainer } from '../../../design/container'
import { StepTitle } from '../../../design/step-title'
import { EmployerJobs } from './index'
import {ROLES} from '../../../../enums'

class EmployerRole extends React.Component {

  static BACKGROUND_COLOR = '#182E5B'
  static TITLE = 'Select role'

  constructor (props) {
    super(props)
    this.state = {
      roles: this.props.employer.roles
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1, paddingLeft: 16, paddingRight: 16 } }>
          <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
            <StepTitle text={ I18n.t('flow_page.employer.role.title') }/>
          </View>
          <View style={ { flex: 1, flexWrap: 'wrap', justifyContent: 'flex-start', flexDirection: 'row' } }>
            {
              ROLES.map(({ slug: option, index }) => {
                return (
                  <Chip
                    key={`role-item-${index}`}
                    onSelect={ () => this.handleCheckboxClick(index) }
                    selected={ this.isCheckboxSelected(index) }
                    text={ I18n.t(`common.roles.${option}`) }/>
                )
              })
            }
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

  isFormValid = () => {
    return this.state.roles.length > 0
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.save({
      roles: this.state.roles
    })
    this.props.onFill({
      nextStep: EmployerJobs
    })
  }
  handleCheckboxClick = index => {
    let roles = [ ...this.state.roles ]
    const roleIndex = roles.indexOf(index)
    if (roleIndex !== -1) {
      roles = roles.filter(role => role !== index)
    } else {
      roles.push(index)
    }
    this.setState({ roles }, this.validateForm)
  }

  isCheckboxSelected = index => {
    return this.state.roles.indexOf(index) !== -1
  }
}

EmployerRole.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EmployerRole)
