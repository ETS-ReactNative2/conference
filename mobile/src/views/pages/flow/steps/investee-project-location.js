import { View } from 'native-base'
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
import { InvesteeMoneySource } from './index'
import { ScrollView} from 'react-native'

class InvesteeProjectLocation extends React.Component {

  static BACKGROUND_COLOR = '#172D5C'

  constructor (props) {
    super(props)
    this.state = {
      legal: this.props.legal,
      main: this.props.main
    }
  }

  render () {
    return (
      <FlowContainer>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
              <StepTitle text={ I18n.t('flow_page.investee.project_location.title') }/>
            </View>
            <Subheader
              text={ I18n.t('flow_page.investee.project_location.legal') }
            />
            <CountrySelect
              onChange={ value => {
                this.setState({ legal: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
              } }
              value={ this.state.legal }
              placeholder={ I18n.t('flow_page.investee.project_location.country_picker_placeholder') }
            />
            <Subheader
              text={ I18n.t('flow_page.investee.project_location.main') }
            />
            <CountrySelect
              onChange={ value => {
                this.setState({ main: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
              } }
              value={ this.state.main }
              placeholder={ I18n.t('flow_page.investee.project_location.country_picker_placeholder') }
            />
          </ScrollView>
        </View>
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
    this.props.saveInvestee({ legal: this.state.legal, main: this.state.main })
    this.props.onFill({ nextStep: InvesteeMoneySource })
  }
  handleChange = (fieldName, value) => {
    this.setState({
      [ fieldName ]: value
    })
  }
}

InvesteeProjectLocation.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    legal: state.signUp.investee.legal,
    main: state.signUp.investee.main
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestee: investorData => dispatch(signUpActions.saveProfileInvestee(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeProjectLocation)
