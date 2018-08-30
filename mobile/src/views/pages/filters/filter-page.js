import { Container, Text, View } from 'native-base'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import * as filterActions from '../../../filters/actions'
import { FlowButton } from '../../design/buttons'
import { BLUE_BACKGROUND_COLOR } from '../../design/constants'
import { FlowListItem } from '../../design/list-items'
import { SubheaderWithSwitch } from '../../design/subheader'

class FilterPage extends Component {
  constructor (props) {
    super(props)

    const { investorFilters, projectFilters, jobFilters } = props

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
    }

    this.state = {
      checkeds: filterSetting.items.map((item, index) => filters[ filterSetting.stateKey ].includes(index + 1)),
    }
  }

  handleSubmit = (event, values) => {
    const { navigation: { goBack }, setInvestorFilter, setProjectFilter, setJobFilter } = this.props
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

  render () {
    const filterSetting = this.props.navigation.getParam('filterSetting', {})

    const key = filterSetting.key
    const { checkeds } = this.state
    const isAllSelected = checkeds.find(item => item === false)

    return (
      <Container style={ styles.container }>
        <ScrollView style={ { flex: 1 } }>
          <View style={ styles.headerContainer }>
            <Text style={ styles.headerText }>
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
})

const mapStateToProps = state => {
  return {
    investorFilters: state.filter.investor,
    projectFilters: state.filter.project,
    jobFilters: state.filter.job
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInvestorFilter: filters => dispatch(filterActions.setInvestorFilter(filters)),
    setProjectFilter: filters => dispatch(filterActions.setProjectFilter(filters)),
    setJobFilter: filters => dispatch(filterActions.setJobFilter(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPage)
