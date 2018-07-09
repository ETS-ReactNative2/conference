import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'

const ticketSizes = [
    '<5k',
    '5-25k',
    '25-100k',
    '100-500k',
    '500k-1000000',
    '1000000'
]

class InvestorTicketSize extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: '',
      selected: -1
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.ticket_size.title') }</Text>
        <Content>
        {
            ticketSizes.map((option, index) => {
              return (
                <ListItem style={ { width: '100%' } } key={ option } onPress={ () => this.handleChange(index) }>
                  <Left>
                    <Text>{option}</Text>
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
    this.props.onFill(this.state)
  }
  handleChange = (index) => {
    this.setState({
      selected: index,
      selectedValue: ticketSizes[index]
    })
  }
}

InvestorTicketSize.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default InvestorTicketSize
