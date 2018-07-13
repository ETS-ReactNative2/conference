import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { InvestorCompanyFundingStage } from './index'
import { signUpActions } from '../../../../signup'

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
      selectedValue: this.props.ticketSize,
      selected: ticketSizes.findIndex(singleSize => singleSize === this.props.ticketSize)
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
                disabled={ this.state.selected === -1}
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleSubmit = () => {
    this.props.saveInvestor({ ticketSize: this.state.selectedValue })
    this.props.onFill({ nextStep: InvestorCompanyFundingStage})
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

const mapStateToProps = state => {
  return {
    ticketSize: state.signUp.investor.ticketSize
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor : ticketSize => dispatch(signUpActions.saveInvestor(ticketSize))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTicketSize)
