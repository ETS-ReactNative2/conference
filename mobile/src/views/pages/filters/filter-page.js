import { Button, Container, Left, Body, Right, ListItem, Text, View } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { BLUE_BACKGROUND_COLOR, 
         PROJECT_FILTER_BACKGROUND_COLOR,
         INVESTOR_FILTER_BACKGROUND_COLOR
       } from '../../design/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import I18n from '../../../../locales/i18n';
import { FlowButton } from '../../design/buttons';
import { FlowContainer } from '../../design/container';
import { FlowListItem } from '../../design/list-items';
import { StepTitle } from '../../design/step-title';
import { SubheaderWithSwitch } from '../../design/subheader';
import * as filterActions from '../../../filters/actions';
import { FlatList } from 'react-native';
import { NavigationHeader } from '../../components/header/header';
import WhiteLogo from '../../../assets/logos/logo-white.png'

class FilterPage extends Component {
  constructor (props) {
    super(props)

    const { investorFilters, projectFilters, jobFilters, professionalFilters } = props

    const filterSetting = this.props.navigation.getParam('filterSetting', {})
    const filterField = this.props.navigation.getParam('filterField', {})

    // const filters = filterField === 'investor' ? investorFilters : projectFilters
    let filters
    switch(filterField){
      case 'investor':
        filters = investorFilters
        break
      case 'project':
        filters = projectFilters
        break
      case 'job':
        filters = jobFilters
        break
      case 'professional':
        filters = professionalFilters
        break
    }

    this.state = {
      checkeds: filterSetting.items.map((item, index) => filters[ filterSetting.stateKey ].includes(index + 1)),
    }
  }

  handleSubmit = (event, values) => {
    const { navigation: { goBack }, setInvestorFilter, setProjectFilter, setJobFilter, setProfessionalFilter } = this.props
    const filterSetting = this.props.navigation.getParam('filterSetting', {})
    const filterField = this.props.navigation.getParam('filterField', {})
    const { checkeds } = this.state
    // const setFilter = filterField === 'investor' ? setInvestorFilter : setProjectFilter
    let setFilter
    switch(filterField){
      case 'investor':
        setFilter = setInvestorFilter
        break
      case 'project':
        setFilter = setProjectFilter
        break
      case 'job':
        setFilter = setJobFilter
        break
      case 'professional':
        setFilter = setProfessionalFilter
        break
    }

    setFilter({
      filterType: filterSetting.stateKey,
      values: checkeds.map((item, index) => ({ item, index }))
        .filter(({ item, index }) => item === true)
        .map(({ item, index }) => index + 1),
    })

    goBack()
  }

  handleItemClick = (index) => {
    const { checkeds } = this.state
    this.setState({
      checkeds: checkeds.map((item, ind) => index === ind ? !checkeds[ ind ] : checkeds[ ind ]),
    })
  }

  selectAll = () => {
    const { checkeds } = this.state
    const isAnyfalse = checkeds.find(item => item === false)

    const value = isAnyfalse === false ? true : false

    this.setState({
      checkeds: checkeds.map(item => value)
    })
  }

  render() {
    const filterSetting = this.props.navigation.getParam('filterSetting', {});
    const filterField =  this.props.navigation.getParam('filterField', {});
    const color = filterField === 'investor' ? INVESTOR_FILTER_BACKGROUND_COLOR : PROJECT_FILTER_BACKGROUND_COLOR;
    const key = filterSetting.key;
    const { checkeds } = this.state;
    const isAllSelected = checkeds.find(item => item === false);
    

    return (
      <Container style={[styles.container, {backgroundColor: color}]}>
        <ScrollView style={{ flex: 1 }}>
          <NavigationHeader
            onBack={ () => this.props.navigation.goBack() }
            title={ I18n.t(`search_page.investor_filter.${key}.header`) }
            titleStyle={ { color: '#fff', marginTop: 12 } }
            rightIconSource={ WhiteLogo }/>
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
          <View style={ { flex: 1 } }>
            {
              filterSetting.items.map((item, index) => (
                <FlowListItem
                  key={ index }
                  text={ I18n.t(`common.${key}.${item.slug}`) }
                  multiple={ true }
                  selected={ checkeds[ index ] }
                  onSelect={ () => this.handleItemClick(index) }
                />
              ))
            }
          </View>
          <View style={ styles.saveButtonContainer }>
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
    paddingTop: 20
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
})

const mapStateToProps = state => {
  return {
    investorFilters: state.filter.investor,
    projectFilters: state.filter.project,
    jobFilters: state.filter.job,
    professionalFilters: state.filter.professional
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInvestorFilter: filters => dispatch(filterActions.setInvestorFilter(filters)),
    setProjectFilter: filters => dispatch(filterActions.setProjectFilter(filters)),
    setJobFilter: filters => dispatch(filterActions.setJobFilter(filters)),
    setProfessionalFilter: filters => dispatch(filterActions.setProfessionalFilter(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage)
