import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { INVESTOR_INDUSTRIES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'
import { InvesteeLinks } from './index'

class InvesteeIndustries extends React.Component {
  static BACKGROUND_COLOR = '#172D5C'

  constructor (props) {
    super(props)
    this.state = {
      industry: this.props.industry
    }
  }

  handleSubmit = () => {
    this.props.saveInvestor({ industry: this.state.industry })
    this.props.onFill({ nextStep: InvesteeLinks })
  }

  handleCheckboxClick = index => {
    this.setState({ industry: index })
  }

  isCheckboxSelected = index => {
    return this.state.industry === index
  }

  flatListItem = ({ item }) => (
    <FlowListItem
      multiple={false}
      text={ I18n.t(`common.industries.${item.slug}`) }
      selected={ this.isCheckboxSelected(item.index) }
      onSelect={ () => this.handleCheckboxClick(item.index) }
    />
  )

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ styles.contentContainer }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investee.industries.title') }/>
            </View>
            <Subheader
              text={ I18n.t('flow_page.investee.industries.header') }
            />
            <FlatList keyExtractor={ item => item.slug }
                      data={ INVESTOR_INDUSTRIES }
                      extraData={ this.state }
                      renderItem={ this.flatListItem }/>
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

const styles = EStyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})

InvesteeIndustries.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    industry: state.signUp.investee.industry
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveProfileInvestee(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeIndustries)
