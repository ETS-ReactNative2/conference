import { Body, Button, Card, CheckBox, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'
import { EmployerRole } from './index'

class InvesteeHiring extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hiring: false
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.hiring.title') }</Text>
        <ListItem>
          <CheckBox
            onPress={ () => this.setState({ hiring: !this.state.hiring }) }
            checked={ this.state.hiring }/>
          <Body>
          <Text>{ I18n.t('flow_page.hiring.question') }</Text>
          </Body>
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
    this.props.onFill({
      done: !hiring,
      nextStep: hiring ? EmployerRole : null
    })
  }
}

InvesteeHiring.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default InvesteeHiring
