import { Button, Container, Left, Body, Right, ListItem, Text, View } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { BLUE_BACKGROUND_COLOR } from '../../design/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from '../../../../locales/i18n';
import { FlowButton } from '../../design/buttons';
import { FlowContainer } from '../../design/container';
import { FlowListItem } from '../../design/list-items';
import { StepTitle } from '../../design/step-title';
import { SubheaderWithSwitch } from '../../design/subheader';
import * as filterActions from '../../../filters/actions';
import { FlatList } from 'react-native';

class FilterPage extends Component {
  constructor(props) {
    super(props);

    const { filters } = props;
    const filterSetting = this.props.navigation.getParam('filterSetting', {});
    this.state = {
      checkeds: filterSetting.items.map((item, index) => filters[filterSetting.stateKey].includes(index + 1)),
    };
  }

  handleSubmit = (event, values) => {
    const { navigation: { goBack }, setFilter } =  this.props;
    const filterSetting = this.props.navigation.getParam('filterSetting', {});
    const { checkeds } = this.state;

    setFilter({
      filterType: filterSetting.stateKey,
      values: checkeds.map((item, index) => ({ item, index }))
        .filter(({item, index}) => item === true)
        .map(({item, index}) => index + 1),
    });

    goBack();
  }

  handleItemClick = (index) => {
    const { checkeds } = this.state;
    this.setState({
      checkeds: checkeds.map((item, ind) => index === ind ? !checkeds[ind] : checkeds[ind]),
    });
  }

  selectAll = () => {
    const { checkeds } = this.state;
    const isAnyfalse = checkeds.find(item => item === false);

    const value = isAnyfalse === false ? true : false;

    this.setState({
      checkeds: checkeds.map(item => value)
    }); 
  }

  render() {
    const filterSetting = this.props.navigation.getParam('filterSetting', {});
    const key = filterSetting.key;
    const { checkeds } = this.state;
    const isAllSelected = checkeds.find(item => item === false);

    return (
      <Container style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              { I18n.t(`search_page.investor_filter.${key}.title`) }
            </Text>
          </View>
          <SubheaderWithSwitch
              selected={ isAllSelected }
              text={ I18n.t(`search_page.investor_filter.${key}.header`) }
              onToggle={ this.selectAll }
            />
          <View style={{ flex: 1 }}>
            {
              filterSetting.items.map((item, index) => (
                <FlowListItem
                  key={index}
                  text={I18n.t(`common.${key}.${item.slug}`)}
                  multiple={ true }
                  selected={ checkeds[index] }
                  onSelect={() => this.handleItemClick(index)}
                />
              ))
            }
          </View>
          <View style={styles.saveButtonContainer}>
            <FlowButton
              text={ I18n.t('common.next') }
              onPress={ this.handleSubmit }
            />
          </View>
        </ScrollView>
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_BACKGROUND_COLOR,
    padding: 5
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    width: 200,
    textAlign: 'center'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15
  },
  saveButtonContainer: {
    marginLeft: 8,
    marginRight: 8,
  }
});

const mapStateToProps = state => {
  return {
    filters: state.filter.investor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filters => dispatch(filterActions.setInvestorFilter(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage)