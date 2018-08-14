import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { TICKET_SIZES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvestorCompanyFundingStage } from './index'

class InvestorTicketSize extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ticketSizes: this.props.ticketSizes || []
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.ticket_size.title') }</Text>
        <Content>
          {
            TICKET_SIZES.map(({index, label}) => {
              return (
                <ListItem style={ { width: '100%' } } key={ index } onPress={ () => this.handleCheckboxClick(index) }>
                  <Left>
                    <Text>{ label }</Text>
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
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleCheckboxClick = id => {
    let ticketSizes = [ ...this.state.ticketSizes ]
    const ticketIndex = ticketSizes.indexOf(id)
    if (ticketIndex !== -1) {
      ticketSizes = ticketSizes.filter(size => size !== id)
    } else {
      ticketSizes.push(id)
    }
    this.setState({ ticketSizes })
  }

  isCheckboxSelected = id => {
    return this.state.ticketSizes.indexOf(id) !== -1
  }

  handleSubmit = () => {
    this.props.saveInvestor({ ticketSizes: this.state.ticketSizes })
    this.props.onFill({ nextStep: InvestorCompanyFundingStage })
  }
}

InvestorTicketSize.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    ticketSizes: state.signUp.investor.ticketSizes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: ticketSizes => dispatch(signUpActions.saveInvestor(ticketSizes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTicketSize)
