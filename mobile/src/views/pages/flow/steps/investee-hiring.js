import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { EmployerRole } from './index'

class InvesteeHiring extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hiring: this.props.investee.hiring
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.hiring.title') }</Text>
        <ListItem style={ { width: '100%' } } onPress={ () => this.setState({ hiring: false }) }>
          <Left>
            <Text>{ I18n.t('common.no') }</Text>
          </Left>
          <Right>
            <Radio
              onPress={ () => this.setState({ hiring: false }) }
              selected={ !this.state.hiring }/>
          </Right>
        </ListItem>
        <ListItem style={ { width: '100%' } } onPress={ () => this.setState({ hiring: true }) }>
          <Left>
            <Text>{ I18n.t('common.yes') }</Text>
          </Left>
          <Right>
            <Radio
              onPress={ () => this.setState({ hiring: true }) }
              selected={ this.state.hiring }/>
          </Right>
        </ListItem>
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
    const { hiring } = this.state
    this.props.save({
      hiring
    })
    this.props.onFill({
      done: !hiring,
      nextStep: hiring ? EmployerRole : null
    })
  }
}

InvesteeHiring.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investee: state.signUp.investee
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: investeeInfo => dispatch(signUpActions.saveProfileInvestee(investeeInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeHiring)
