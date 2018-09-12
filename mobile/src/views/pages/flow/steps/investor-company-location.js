import { View } from 'native-base'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowContainer } from '../../../design/container'
import { CountrySelect } from '../../../design/select'
import { StepTitle } from '../../../design/step-title'
import { Subheader } from '../../../design/subheader'
import { InvestorInvestIn } from './index'

class InvestorCompanyLocation extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      nationality: this.props.nationality
    }
  }

  render () {
    return (
      <FlowContainer>
        <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
          <View style={ { flex: 1, justifyContent: 'flex-start' } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investor.company_location.title') }/>
            </View>
            <Subheader
              color={'white'}
              text={ I18n.t('flow_page.investor.company_location.nationality') }
            />
            <CountrySelect
              onChange={ value => {
                this.setState({ nationality: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
              } }
              value={ this.state.nationality }
              placeholder={ I18n.t('flow_page.investor.company_location.nationality_placeholder') }
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

  handleSubmit = () => {
    this.props.saveInvestor({ nationality: this.state.nationality })
    this.props.onFill({ nextStep: InvestorInvestIn })
  }
  handleChange = (fieldName, value) => {
    this.setState({
      [ fieldName ]: value
    })
  }
}

InvestorCompanyLocation.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    nationality: state.signUp.investor.nationality
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorCompanyLocation)
