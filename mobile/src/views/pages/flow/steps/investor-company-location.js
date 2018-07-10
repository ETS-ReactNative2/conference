import { Button, Card, Content, Icon, Picker, Text} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { InvestorInvestIn } from './index'
import { signUpActions } from '../../../../signup'

const locationOptions = [
    'usa',
    'korea',
    'poland'
];

const nationalityOptions = [
    'american',
    'korean',
    'polish'
];

class InvestorCompanyLocation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: this.props.location || locationOptions[0],
      nationality: this.props.nationality || nationalityOptions
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.company_location.title') }</Text>
        <Content>
          <Text style={{ marginTop: 10 }}>{ I18n.t('flow_page.investor.company_location.localization') }</Text>
          <Picker	
            mode="dropdown"
            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
            style={{ width: undefined }}
            placeholder={I18n.t('flow_page.investor.company_location.localization_placeholder')}
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.location}
            onValueChange={(newSelectedValue) => this.handleChange('location', newSelectedValue)}
           >
           {locationOptions.map(singleLocation => {
               return (
                    <Picker.Item key={`comapny-location-${singleLocation}`} label={I18n.t(`common.country.${singleLocation}`)} value={singleLocation} />
               );
           })}
          </Picker>
          <Text style={{ marginTop: 10 }}>{ I18n.t('flow_page.investor.company_location.nationality') }</Text>
          <Picker	
            mode="dropdown"
            iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
            style={{ width: undefined }}
            placeholder={I18n.t('flow_page.investor.company_location.nationality_placeholder')}
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.nationality}
            onValueChange={(newSelectedValue) => this.handleChange('nationality', newSelectedValue)}
           >
           {nationalityOptions.map(singleNationality => {
               return (
                    <Picker.Item key={`nationality-${singleNationality}`} label={I18n.t(`common.nationality.${singleNationality}`)} value={singleNationality} />
               );
           })}
          </Picker>
        </Content>
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
    this.props.saveInvestor({companyLocation: this.state.location, nationality: this.state.nationality})
    this.props.onFill({ nextStep: InvestorInvestIn })
  }
  handleChange = (fieldName, value) => {
    this.setState({
        [fieldName]: value
    });
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
    saveInvestor : investorData => dispatch(signUpActions.saveInvestor(investorData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorCompanyLocation)
