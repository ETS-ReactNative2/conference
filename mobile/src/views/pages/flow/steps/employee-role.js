import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { EmployeeKeywords } from './index'

const roles = [
  'developer',
  'founder',
  'ceo',
  'marketing',
  'sales'
]

class EmployeeRole extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.employee.role
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.employee.role.title') }</Text>
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
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleSubmit = () => {
    this.props.save({
      role: this.state.selected
    })
    this.props.onFill({
      nextStep: EmployeeKeywords
    })
  }
  handleChange = (index) => {
    this.setState({
      selected: index
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
    save : employeeData => dispatch(signUpActions.saveEmployee(employeeData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeRole)
