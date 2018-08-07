import { Button, Card, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'

import CountryPicker from 'react-native-country-picker-modal'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvesteeMoneySource, InvesteeTokenType, InvestorInvestIn } from './index'

class InvesteeProjectLocation extends React.Component {
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
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investee.project_location.title') }</Text>
        <Text style={ { marginTop: 16, marginBottom: 16 } }>{ I18n.t('flow_page.investee.project_location.legal') }</Text>
        <CountryPicker
          onChange={ value => {
            this.setState({ legal: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
          } }
          filterable
          closeable
          cca2={ this.state.legal.cca2 }
          translation="eng"
          styles={ {
            touchFlag: {
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 24
            },
          } }
        >
          <View style={ {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            height: 19
          } }>
            { CountryPicker.renderFlag(this.state.legal.cca2) }
            <Text style={ { marginLeft: 8 } }>{ this.state.legal.countryName }</Text>
          </View>
        </CountryPicker>
        <Text style={ { marginTop: 16, marginBottom: 16 } }>{ I18n.t('flow_page.investee.project_location.main') }</Text>
        <CountryPicker
          onChange={ value => {
            this.setState({ main: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
          } }
          filterable
          closeable
          cca2={ this.state.main.cca2 }
          translation="eng"
          styles={ {
            touchFlag: {
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 24
            },
          } }
        >
          <View style={ {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            height: 19
          } }>
            { CountryPicker.renderFlag(this.state.main.cca2) }
            <Text style={ { marginLeft: 8 } }>{ this.state.main.countryName }</Text>
          </View>
        </CountryPicker>
        <Button success
                rounded
                block
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
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
