import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { FUNDING_STAGES, TOKEN_TYPES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { SubheaderWithSwitch } from '../../../design/subheader'
import { InvestorGiveaways } from './index'

class InvestorCompanyFundingStage extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      stages: this.props.stages,
      all: this.props.stages.length === FUNDING_STAGES.length
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ stages: this.state.stages })
    this.props.onFill({ nextStep: InvestorGiveaways })
  }

  handleCheckboxClick = fieldName => {
    let stages = [ ...this.state.stages ]
    const stageIndex = stages.indexOf(fieldName)
    if (stageIndex !== -1) {
      stages = stages.filter(singleStage => singleStage !== fieldName)
    } else {
      stages.push(fieldName)
    }
    this.setState({
      stages,
      all: stages.length === TOKEN_TYPES.length
    })
  }

  selectAll = () => {
    this.state.all ?
      this.setState({ stages: [], all: false }) :
      this.setState({ stages: FUNDING_STAGES.map(tt => tt.index), all: true })
  }

  isCheckboxSelected = fieldName => {
    return this.state.stages.indexOf(fieldName) !== -1
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { flex: 1, justifyContent: 'flex-start' } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investor.company_funding_stage.title') }/>
            </View>
            <SubheaderWithSwitch
              selected={ this.state.all }
              text={ I18n.t(`common.funding_stages.header`) }
              onToggle={ this.selectAll }
            />
            { FUNDING_STAGES.map((singleInvestment) => {
              return (
                <FlowListItem
                  multiple={ true }
                  key={ `investment-item-${singleInvestment.slug}` }
                  text={ I18n.t(`common.funding_stages.${singleInvestment.slug}`) }
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

InvestorCompanyFundingStage.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    stages: state.signUp.investor.stages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorCompanyFundingStage)
