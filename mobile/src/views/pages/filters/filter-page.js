import { Text, View } from 'native-base'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import * as filterActions from '../../../filters/actions'
import { NavigationHeader } from '../../components/header/header'
import { FlowButton } from '../../design/buttons'
import { BLUE_BACKGROUND_COLOR } from '../../design/constants'
import { ImagePageContainer } from '../../design/image-page-container'
import { FlowListItem } from '../../design/list-items'
import { SubheaderWithSwitch } from '../../design/subheader'

class FilterPage extends Component {
  constructor (props) {
    super(props)

    const { investorFilters, projectFilters, jobFilters, professionalFilters } = props

    const filterSetting = this.props.navigation.getParam('filterSetting', {})
    const filterField = this.props.navigation.getParam('filterField', {})

    // const filters = filterField === 'investor' ? investorFilters : projectFilters
    let filters
    switch (filterField) {
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

    this.filterSetting = filterSetting
  }

  handleSubmit = (event, values) => {
    const { navigation: { goBack }, setInvestorFilter, setProjectFilter, setJobFilter, setProfessionalFilter } = this.props
    const filterField = this.props.navigation.getParam('filterField', {})
    const { checkeds } = this.state
    // const setFilter = filterField === 'investor' ? setInvestorFilter : setProjectFilter
    let setFilter
    switch (filterField) {
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
      filterType: this.filterSetting.stateKey,
      values: checkeds.map((item, index) => ({ item, index }))
        .filter(({ item, index }) => item === true)
        .map(({ item, index }) => index + 1),
    })

    goBack()
  }

  handleItemClick = index => {
    const { checkeds } = this.state
    this.setState({
      checkeds: this.filterSetting.stateKey === 'region'
        ? checkeds.map((item, ind) => index === ind ? true : false)
        : checkeds.map((item, ind) => index === ind ? !checkeds[ ind ] : checkeds[ ind ]),
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
    const filterField = this.props.navigation.getParam('filterField', {})
    const gradient = this.props.navigation.getParam('gradient', {
      colors: [ 'rgba(0, 0, 0, 1)', 'rgba(20,25,46, .83)', 'rgba(44, 101, 226, .83)' ],
      levels: [ 0, 0.4, 0.8 ]
    })
    const key = this.filterSetting.key
    const { checkeds } = this.state
    const isAllSelected = checkeds.find(item => item === false)

    return (
      <ImagePageContainer
        customGradient={ gradient }>
        <NavigationHeader
          onBack={ () => this.props.navigation.goBack() }
          title={ I18n.t(`search_page.${filterField}_filter.${key}.header`) }
          rightIconSource={ WhiteLogo }/>
        <ScrollView>
          <View style={ styles.headerContainer }>
            <Text style={ styles.headerText }>
              { I18n.t(`search_page.${filterField}_filter.${key}.title`) }
            </Text>
          </View>
          { this.filterSetting.stateKey !== 'region' ? <SubheaderWithSwitch
            selected={ isAllSelected }
            text={ I18n.t(`search_page.${filterField}_filter.${key}.header`) }
            onToggle={ this.selectAll }
          /> : null }
          <View style={ { flex: 1 } }>
            {
              this.filterSetting.items.map((item, index) => (
                <FlowListItem
                  key={ index }
                  text={ I18n.t(`common.${key}.${item.slug}`) }
                  multiple={ this.filterSetting.stateKey !== 'region' }
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
      </ImagePageContainer>
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
