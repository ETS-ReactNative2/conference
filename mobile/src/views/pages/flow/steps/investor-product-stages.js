import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { PRODUCT_STAGES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/Container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { SubheaderWithSwitch } from '../../../design/subheader'
import { InvestorMarketLocation } from './index'


class InvestorProductStages extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      productStages: this.props.investor.productStages,
      all: this.props.investor.productStages.length === PRODUCT_STAGES.length
    }
    this.state.isFormValid = this.isFormValid()
  }

  selectAll = () => {
    this.state.all ?
      this.setState({ productStages: [], all: false }) :
      this.setState({ productStages: PRODUCT_STAGES.map(tt => tt.index), all: true })
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { flex: 1, justifyContent: 'flex-start' } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investor.product_stage.title') }/>
            </View>
            <SubheaderWithSwitch
              selected={ this.state.all }
              text={ I18n.t(`common.product_stages.header`) }
              onToggle={ this.selectAll }
            />
            { PRODUCT_STAGES.map((stage) => {
              return (
                <FlowListItem
                  multiple={ true }
                  key={ `product_stage-item-${stage.slug}` }
                  text={ I18n.t(`common.product_stages.${stage.slug}`) }
                  onSelect={ () => this.handleChange(stage.index) }
                  selected={ this.state.productStages.indexOf(stage.index) !== -1 }
                />
              )
            }) }
          </View>
        </ScrollView>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
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
    this.props.save({
      productStages: this.state.productStages
    })
    this.props.onFill({
      nextStep: InvestorMarketLocation
    })
  }

  handleChange = (index) => {
    const selectedProductStagesCopy = [...this.state.productStages]
    const clickedItemIndex = selectedProductStagesCopy.indexOf(index);
    if (clickedItemIndex === -1) {
      selectedProductStagesCopy.push(index);
    } else {
      selectedProductStagesCopy.splice(clickedItemIndex, 1);
    }
    this.setState({
      productStages: selectedProductStagesCopy,
      all: selectedProductStagesCopy.length === PRODUCT_STAGES.length
    }, this.validateForm)
  }
}

InvestorProductStages.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investor: state.signUp.investor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: investorInfo => dispatch(signUpActions.saveInvestor(investorInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorProductStages)
