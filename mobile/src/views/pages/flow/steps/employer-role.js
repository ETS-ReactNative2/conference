import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { EmployerJobs } from './index'
import {ROLES} from '../../../../enums'

class EmployerRole extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roles: this.props.employer.roles
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.employer.role.title') }</Text>
        <Content>
          {
            ROLES.map(({slug, index}) => {
              return (
                <ListItem style={ { width: '100%' } } key={ slug }
                          onPress={ () => this.handleCheckboxClick(index) }>
                  <Left>
                    <Text>{ I18n.t(`common.roles.${slug}`) }</Text>
                  </Left>
                  <Right>
                    <Radio
                      onPress={ () => this.handleCheckboxClick(index) }
                      selected={ this.isCheckboxSelected(index) }/>
                  </Right>
                </ListItem>
              )
            })
          }
        </Content>
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
