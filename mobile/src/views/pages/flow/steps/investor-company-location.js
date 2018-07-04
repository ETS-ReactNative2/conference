import { Button, Card, Content, Icon, Picker, Text} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'

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
      location: '',
      nationality: ''
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
    this.props.onFill(this.state)
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

export default InvestorCompanyLocation
