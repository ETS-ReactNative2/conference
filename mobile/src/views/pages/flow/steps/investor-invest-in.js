import { View } from 'native-base'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { TOKEN_TYPES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { SubheaderWithSwitch } from '../../../design/subheader'
import { InvestorTicketSize } from './index'

class InvestorInvestIn extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      investments: this.props.investments,
      all: this.props.investments.length === TOKEN_TYPES.length
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ investments: this.state.investments })
    this.props.onFill({ nextStep: InvestorTicketSize })
  }

  handleCheckboxClick = fieldName => {
    let investments = [ ...this.state.investments ]
    const investmentIndex = investments.indexOf(fieldName)
    if (investmentIndex !== -1) {
      investments = investments.filter(singleInvestemnt => singleInvestemnt !== fieldName)
    } else {
      investments.push(fieldName)
    }
    this.setState({
      investments,
      all: investments.length === TOKEN_TYPES.length
    })
  }

  selectAll = () => {
    this.state.all ?
      this.setState({ investments: [], all: false }) :
      this.setState({ investments: TOKEN_TYPES.map(tt => tt.index), all: true })
  }

  isCheckboxSelected = fieldName => {
    return this.state.investments.indexOf(fieldName) !== -1
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { flex: 1, justifyContent: 'flex-start' } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investor.invest_in.title') }/>
            </View>
            <SubheaderWithSwitch
              selected={ this.state.all }
              text={ I18n.t(`common.token_types.header`) }
              onToggle={ this.selectAll }
            />
            { TOKEN_TYPES.map((singleInvestment) => {
              return (
                <FlowListItem
                  multiple={ true }
                  key={ `investment-item-${singleInvestment.slug}` }
                  text={ I18n.t(`common.token_types.${singleInvestment.slug}`) }
                  onSelect={ () => this.handleCheckboxClick(singleInvestment.index) }
                  selected={ this.isCheckboxSelected(singleInvestment.index) }
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
}

InvestorInvestIn.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investments: state.signUp.investor.investments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorInvestIn)
