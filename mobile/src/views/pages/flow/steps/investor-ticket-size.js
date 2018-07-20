import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvestorCompanyFundingStage } from './index'

const ticketSizes = [
  { id: 0, min: '0', max: '5000', label: '<5k' },
  { id: 1, min: '5000', max: '25000', label: '5k-25k' },
  { id: 2, min: '25000', max: '100000', label: '25k-100k' },
  { id: 3, min: '100000', max: '500000', label: '100k-500k' },
  { id: 4, min: '500000', max: '1000000', label: '500k-1000k' },
  { id: 5, min: '1000000', max: Number.POSITIVE_INFINITY, label: '>1000k' }
]

class InvestorTicketSize extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.props.ticketSize || -1
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
                <ListItem style={ { width: '100%' } } key={ option.id } onPress={ () => this.handleChange(index) }>
                  <Left>
                    <Text>{ option.label }</Text>
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
                disabled={ this.state.selected === -1 }
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleSubmit = () => {
    this.props.saveInvestor({ ticketSize: ticketSizes.find(size => size.id === this.state.selected) })
    this.props.onFill({ nextStep: InvestorCompanyFundingStage })
  }

  handleChange = (index) => {
    this.setState({
      selected: index
    })
  }
}

InvestorTicketSize.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    ticketSize: state.signUp.investor.ticketSize
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: ticketSize => dispatch(signUpActions.saveInvestor(ticketSize))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTicketSize)
