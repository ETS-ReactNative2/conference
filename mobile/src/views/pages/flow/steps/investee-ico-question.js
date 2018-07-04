import { Button, Card, Form, Input, Item, Label, Text, Icon, ListItem, CheckBox, Body, DatePicker } from 'native-base'
import React from 'react'
import PropTypes from 'prop-types'
import I18n from '../../../../../locales/i18n'

class InvesteeIco extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ico: false,
      when: ''
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.ico.title') }</Text>
        <ListItem>
          <CheckBox
            onPress={() => this.setState({ico: !this.state.ico})}
            checked={this.state.ico} />
          <Body>
          <Text>{I18n.t('flow_page.ico.question')}</Text>
          </Body>
        </ListItem>
        {
          this.state.ico && (
            <DatePicker
              minimumDate={new Date()}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText={ I18n.t('flow_page.ico.when')}
              onDateChange={this.setDate}
            />
          )
        }
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

  setDate = (newDate) => {
    this.setState({ when: newDate });
  }

  handleSubmit = () => {
    this.props.onFill(this.state)
  }
}

InvesteeIco.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default InvesteeIco
