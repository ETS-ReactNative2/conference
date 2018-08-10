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
import { InvesteeMoneySource } from './index'

class InvesteeProjectLocation extends React.Component {

  static BACKGROUND_COLOR = '#2C65E2'

  constructor (props) {
    super(props)
    this.state = {
      legal: this.props.legal || {
        cca2: 'US',
        countryName: 'United States of America',
        callingCode: '1'
      },
      main: this.props.main || {
        cca2: 'US',
        countryName: 'United States of America',
        callingCode: '1'
      }
    }
  }

  render () {
    return (
      <Container style={ styles.container }>
        <StepTitle text={ I18n.t('flow_page.investee.project_location.title') }/>
        <View style={ { flex: 1, justifyContent: 'center' } }>
          <Subheader
            text={ I18n.t('flow_page.investee.project_location.legal') }
          />
          <CountrySelect
            onChange={ value => {
              this.setState({ legal: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
            } }
            value={ this.state.legal }
          />
          <Subheader
            text={ I18n.t('flow_page.investee.project_location.main') }
          />
          <CountrySelect
            onChange={ value => {
              this.setState({ main: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
            } }
            value={ this.state.main }
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
    this.props.saveInvestor({ legal: this.state.legal, main: this.state.main })
    this.props.onFill({ nextStep: InvesteeMoneySource })
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
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeProjectLocation)
