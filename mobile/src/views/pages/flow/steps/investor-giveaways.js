import { Button, Card, Content, Body, ListItem, CheckBox, Text, Radio, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { GIVEAWAY_TYPES, TOKEN_TYPES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/Container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { SubheaderWithSwitch } from '../../../design/subheader'
import { InvestorProductStages } from './index'

class InvestorGiveaways extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      selectedGiveaways: this.props.investor.giveaways,
      all: this.props.investor.giveaways.length === GIVEAWAY_TYPES.length
    }
    this.state.isFormValid = this.isFormValid()
  }

  selectAll = () => {
    this.state.all ?
      this.setState({ selectedGiveaways: [], all: false }) :
      this.setState({ selectedGiveaways: GIVEAWAY_TYPES.map(tt => tt.index), all: true })
  }

  render () {
    return (
      <FlowContainer>
        <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
          <StepTitle text={ I18n.t('flow_page.investor.giveaways.title') }/>
        </View>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <SubheaderWithSwitch
            selected={ this.state.all }
            text={ I18n.t(`common.giveaway.header`) }
            onToggle={ this.selectAll }
          />
          { GIVEAWAY_TYPES.map((giveaway) => {
            return (
              <FlowListItem
                multiple={ true }
                key={ `giveaway-item-${giveaway.slug}` }
                text={ I18n.t(`common.giveaway.${giveaway.slug}`) }
                onSelect={ () => this.handleChange(giveaway.index) }
                selected={ this.state.selectedGiveaways.indexOf(giveaway.index) !== -1 }
              />
            )
          }) }
        </View>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ 'Next' }
            disabled={ !this.state.isFormValid }
            onPress={ this.handleSubmit }
          />
        </View>
      </FlowContainer>
    )
  }

  isFormValid = () => {
    return true;
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.saveInvestor({
      giveaways: this.state.selectedGiveaways
    })
    this.props.onFill({
      nextStep: InvestorProductStages
    })
  }

  handleChange = (index) => {
    let giveaways = [ ...this.state.selectedGiveaways ]
    const giveawayIndex = giveaways.indexOf(index)
    if (giveawayIndex !== -1) {
      giveaways = giveaways.filter(singleGiveaway => singleGiveaway !== index)
    } else {
      giveaways.push(index)
    }
    this.setState({
      selectedGiveaways: giveaways,
      all: giveaways.length === GIVEAWAY_TYPES.length
    }, this.validateForm)
  }
}

InvestorGiveaways.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investor: state.signUp.investor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorGiveaways)
