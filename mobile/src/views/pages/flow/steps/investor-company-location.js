import { Container, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Header } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
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
      <Container style={ styles.container }>
        <View style={ { marginLeft: 32, marginRight: 32, marginTop: 32 } }>
          <StepTitle text={ I18n.t('flow_page.investor.company_location.title') }/>
        </View>
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <Subheader
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
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ 'Next' }
            onPress={ this.handleSubmit }
          />
        </View>
      </Container>
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

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: `100% - ${Header.HEIGHT}`
  }
})

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
