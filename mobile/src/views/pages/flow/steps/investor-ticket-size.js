import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { TICKET_SIZES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/Container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { SubheaderWithSwitch } from '../../../design/subheader'
import { InvestorCompanyFundingStage } from './index'

class InvestorTicketSize extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      ticketSizes: this.props.ticketSizes || [],
      all: this.props.ticketSizes.length === TICKET_SIZES.length
    }
  }

  selectAll = () => {
    this.state.all ?
      this.setState({ ticketSizes: [], all: false }) :
      this.setState({ ticketSizes: TICKET_SIZES.map(tt => tt.index), all: true })
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { flex: 1, justifyContent: 'flex-start' } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investor.ticket_size.title') }/>
            </View>
            <SubheaderWithSwitch
              selected={ this.state.all}
              onToggle={ this.selectAll }
              text={ I18n.t(`flow_page.investor.ticket_size.header`) }
            />
            { TICKET_SIZES.map((size) => {
              return (
                <FlowListItem
                  multiple={ true }
                  key={ `ticket-size-item-${size.index}` }
                  text={ size.label }
                  onSelect={ () => this.handleCheckboxClick(size.index) }
                  selected={ this.isCheckboxSelected(size.index) }
                />
              )
            }) }
          </View>
        </ScrollView>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
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
    this.setState({
      ticketSizes,
      all: ticketSizes.length === TICKET_SIZES.length
    })
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
