import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { EmployerKeywords } from './index'

const roles = [
  'developer',
  'founder',
  'ceo',
  'marketing',
  'sales'
]

class EmployerRole extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.employer.role
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.employer.role.title') }</Text>
        <Content>
          {
            roles.map((option, index) => {
              return (
                <ListItem style={ { width: '100%' } } key={ option } onPress={ () => this.handleChange(index) }>
                  <Left>
                    <Text>{ I18n.t(`common.roles.${option}`) }</Text>
                  </Left>
                  <Right>
                    <Radio
                      onPress={ () => this.handleChange(index) }
                      selected={ this.state.selected === index }/>
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
    const { selected } = this.state

    return selected !== -1
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.save({
      role: this.state.selected
    })
    this.props.onFill({
      nextStep: EmployerKeywords
    })
  }
  handleChange = (index) => {
    this.setState({
      selected: index
    }, this.validateForm)
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
