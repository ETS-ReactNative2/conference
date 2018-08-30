import { 
  Body, Button, Container, Icon, Left, List, ListItem, Right, Switch, Text, View 
} from 'native-base';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Flag from 'react-native-flags';
import I18n from '../../../../locales/i18n';
import { PAGES_NAMES } from '../../../navigation';
import { 
  FUNDING_STAGES, GIVEAWAY_TYPES, PRODUCT_STAGES, TICKET_SIZES, REGIONS_FILTER, TOKEN_TYPES
} from '../../../enums';
import EStyleSheet from 'react-native-extended-stylesheet';
import { BLUE_BACKGROUND_COLOR } from '../../design/constants';
import { NavigationHeader } from '../../components/header/header';
import WhiteLogo from '../../../assets/logos/logo-white.png'

class InvestorMainFilter extends React.Component {
  handleFilterItemClick = (filterSetting) => {
    this.props.navigation.navigate(PAGES_NAMES.FILTER_PAGE, { filterSetting, 'filterField': 'investor' });
  }

  handleSubmit = () => {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render () {
    const fields = [
      { label: 'TOKEN TYPES', items: TOKEN_TYPES, key: 'token_types', stateKey: 'tokenType' },
      { label: 'TICKET SIZE', items: TICKET_SIZES, key: 'ticket_size', stateKey: 'ticketSize' },
      { label: 'FUNDING STAGE', items: FUNDING_STAGES, key: 'funding_stages', stateKey: 'fundingStage' },
      { label: 'INVESTOR BUYS', items: GIVEAWAY_TYPES, key: 'giveaway', stateKey: 'giveaway' },
      { label: 'PRODUCT STAGE', items: PRODUCT_STAGES, key: 'product_stages', stateKey: 'productStage' },
      { label: 'REGION', items: REGIONS_FILTER, key: 'regions', stateKey: 'region' }
    ];

    return (
      <Container style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <NavigationHeader
            onBack={ () => this.props.navigation.goBack() }
            title={ I18n.t('search_page.investor_filter.main_title') }
            titleStyle={ { color: '#fff', marginTop: 12 } }
            rightIconSource={ WhiteLogo }/>
          <View style={styles.header}>
            <Text style={styles.headerText}>{ I18n.t('search_page.investor_filter.header') }</Text>
          </View>
          <List style={styles.filterList}>
            {
              fields.map((filterSetting, index) => (
                <ListItem thumbnail key={new Date().getUTCMilliseconds() + index} style={styles.investorFilterItem} onPress={() => this.handleFilterItemClick(filterSetting)}>
                  <Left>
                    <Text style={styles.Text}>{ filterSetting.label }</Text>
                  </Left>
                  <Body style={styles.nonBorder}>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              ))
            }
          </List>
          <View style={styles.saveButtonContainer}>
            <Button 
              style={styles.saveButton}
              onPress={this.handleSubmit}> 
              <Text style={styles.buttonCaption}>SAVE</Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1F5BE4'
  },
  filterList: {
    width: '100%',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  investorFilterItem: {
    width: '100%',
    height: 90,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    backgroundColor: '#1F5BE4',
    marginLeft: 0,
    paddingLeft: 15,
  },
  Text: {
    color: '#fff',
    fontSize: 14
  },
  nonBorder: {
    borderBottomWidth: 0
  },
  headerText: {
    width: 280,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  saveButtonContainer: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  saveButton: {
    width: '100%',
    height: 72,
    backgroundColor: '#fff',
    borderRadius: 0
  },
  buttonCaption: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: 'black'
  }
});

export default InvestorMainFilter;
