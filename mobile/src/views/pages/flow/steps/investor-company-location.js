import { Button, Card, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'

import CountryPicker from 'react-native-country-picker-modal'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { InvestorInvestIn } from './index'

const locationOptions = [
  'usa',
  'korea',
  'poland'
]

const nationalityOptions = [
  'american',
  'korean',
  'polish'
]

class InvestorCompanyLocation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: this.props.location || {
        cca2: 'US',
        countryName: 'United States of America',
        callingCode: '1'
      },
      nationality: this.props.nationality || {
        cca2: 'US',
        countryName: 'United States of America',
        callingCode: '1'
      }
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.company_location.title') }</Text>
        <Text style={ { marginTop: 16, marginBottom: 16 } }>{ I18n.t('flow_page.investor.company_location.localization') }</Text>
        <CountryPicker
          onChange={ value => {
            console.log({ value })
            this.setState({ location: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
          } }
          filterable
          closeable
          cca2={ this.state.location.cca2 }
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
            { CountryPicker.renderFlag(this.state.location.cca2) }
            <Text style={ { marginLeft: 8 } }>{ this.state.location.countryName }</Text>
          </View>
        </CountryPicker>
        <Text style={ { marginTop: 16, marginBottom: 16 } }>{ I18n.t('flow_page.investor.company_location.nationality') }</Text>
        <CountryPicker
          onChange={ value => {
            console.log({ value })
            this.setState({ nationality: { cca2: value.cca2, countryName: value.name, calling: value.callingCode } })
          } }
          filterable
          closeable
          cca2={ this.state.nationality.cca2 }
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
            { CountryPicker.renderFlag(this.state.nationality.cca2) }
            <Text style={ { marginLeft: 8 } }>{ this.state.nationality.countryName }</Text>
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
    this.props.saveInvestor({ companyLocation: this.state.location, nationality: this.state.nationality })
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
    location: state.signUp.investor.companyLocation,
    nationality: state.signUp.investor.nationality
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestor: investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorCompanyLocation)
