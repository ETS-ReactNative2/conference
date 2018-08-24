import { 
  Body, Button, Container, Icon, Left, List, ListItem, Right, Switch, Text, View 
} from 'native-base';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import I18n from '../../../../locales/i18n';
import { PAGES_NAMES } from '../../../navigation';
import { 
  FUNDING_STAGES, GIVEAWAY_TYPES, PRODUCT_STAGES, REGION, REGIONS, TOKEN_TYPES
} from '../../../enums';
import EStyleSheet from 'react-native-extended-stylesheet';

class ProjectMainFilter extends React.Component {
  handleFilterItemClick = (filterSetting) => {
    this.props.navigation.navigate(PAGES_NAMES.FILTER_PAGE, { filterSetting });
  }

  handleSubmit = () => {
    const { goBack } = this.props.navigation;
    goBack();
  }

  render () {
    const fields = [
      { label: 'TOKEN TYPES', items: TOKEN_TYPES, key: 'token_types', stateKey: 'tokenType' },
      { label: 'PRODUCT STAGE', items: PRODUCT_STAGES, key: 'product_stages', stateKey: 'productStage' },
      { label: 'FUNDING STAGE', items: FUNDING_STAGES, key: 'funding_stages', stateKey: 'fundingStage' },
      { label: 'GIVE AWAY', items: GIVEAWAY_TYPES, key: 'giveaway', stateKey: 'giveaway' },
      { label: 'REGION', items: REGIONS, key: 'regions', stateKey: 'region' },
    ];

    return (
      <Container style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{ I18n.t('search_page.project_filter.header') }</Text>
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
    backgroundColor: '#0E224D'
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
    backgroundColor: '#0E224D',
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

export default ProjectMainFilter;
