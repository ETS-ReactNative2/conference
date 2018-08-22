import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { INVESTOR_INDUSTRIES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { SubheaderWithSwitch } from '../../../design/subheader'

class InvestorIndustries extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      industries: this.props.industries,
      all: this.props.industries.length === INVESTOR_INDUSTRIES.length,
      items: INVESTOR_INDUSTRIES.map(industry => {
        return {
          ...industry,
          checked: this.props.industries.indexOf(industry.index) !== -1
        }
      })
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ industries: this.state.industries })
    this.props.onFill({ done: true })
  }

  handleCheckboxClick = fieldName => {
    let industries = [ ...this.state.industries ]
    const industryIndex = industries.indexOf(fieldName)
    if (industryIndex !== -1) {
      industries = industries.filter(singleIndustry => singleIndustry !== fieldName)
    } else {
      industries.push(fieldName)
    }
    this.setState({
      industries,
      all: industries.length === INVESTOR_INDUSTRIES.length,
      items: this.state.items.map(it => {
        if (it.index === fieldName) {
          it.checked = !it.checked
        }
        return it
      })
    })
  }

  isCheckboxSelected = fieldName => {
    return this.state.industries.indexOf(fieldName) !== -1
  }

  selectAll = () => {
    this.state.all ?
      this.setState({
        industries: [],
        all: false,
        items: this.state.items.map(it => { return { ...it, checked: false }})
      }) :
      this.setState({
        industries: INVESTOR_INDUSTRIES.map(tt => tt.index),
        all: true,
        items: this.state.items.map(it => { return { ...it, checked: true }})
      })
  }

  renderItem = obj => {
    const industry = obj.item
    return (
      <FlowListItem
        multiple={ true }
        text={ I18n.t(`common.industries.${industry.slug}`) }
        onSelect={ () => this.handleCheckboxClick(industry.index) }
        selected={ industry.checked }
      />
    )
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { flex: 1, justifyContent: 'flex-start' } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investor.industries.title') }/>
            </View>
            <SubheaderWithSwitch
              selected={ this.state.all }
              text={ I18n.t(`common.industries.header`) }
              onToggle={ this.selectAll }
            />
            <FlatList
              data={ this.state.items }
              keyExtractor={ (item) => item.slug }
              renderItem={ this.renderItem }
            />
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

InvestorIndustries.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    industries: state.signUp.investor.industries
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorIndustries)
