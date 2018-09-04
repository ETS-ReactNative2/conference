import { ScrollableTab, Tab, Tabs } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import { PAGES_NAMES } from '../../../navigation'
import { searchActions } from '../../../search'
import ErrorMessage from '../../components/error-message/error-message'
import Header from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { ImagePageContainer } from '../../design/image-page-container'
import InvestorsList from './components/investors-list'
import JobList from './components/job-list'
import ProfessionalsList from './components/professionals-list'
import ProjectsList from './components/projects-list'

class SearchPage extends React.Component {

  componentDidMount () {
    this.props.fetchMatches()
  }

  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0,
      investorModal: false,
      projectModal: false
    }
  }

  handleInvestorClick = investor => {
    this.props.navigation.navigate(PAGES_NAMES.INVESTOR_PAGE, {
      investor
    })
  }

  handleProfessionalClick = professional => {
    this.props.navigation.navigate(PAGES_NAMES.PROFESSIONAL_PAGE, {
      professional
    })
  }

  handleProjectClick = project => {
    this.props.navigation.navigate(PAGES_NAMES.PROJECT_PAGE, {
      project
    })
  }

  handleJobClick = job => {
    // this.props.navigation.navigate(PAGES_NAMES.JOB_PAGE)
  }

  onTabChange = ({ from, i }) => {
    this.setState({
      currentTab: i
    })
  }

  render () {
    const {
      isLoading, error, fetchMatches
    } = this.props

    if (isLoading) {
      return (
        <ImagePageContainer>
          <View style={ { flex: 1 } }>
            <View style={ styles.content }>
              <LunaSpinner/>
            </View>
          </View>
        </ImagePageContainer>
      )
    }

    if (error) {
      return (
        <ErrorMessage
          message={ 'Something went wrong' }
          onRetry={ fetchMatches }/>
      )
    }
    return (
      <ImagePageContainer>
        <View style={ { flex: 1 } }>
          <View style={ styles.content }>
            <View style={ { backgroundColor: 'transparent' } }>
              <Header title={ I18n.t('search_page.title') }
                      titleStyle={ { color: '#fff', marginTop: 8 } }
                      rightIconSource={ WhiteLogo }/>
            </View>
            <Tabs
              renderTabBar={ () => <ScrollableTab
                style={ { backgroundColor: 'transparent', borderBottomWidth: 0 } }/> }
              tabBarUnderlineStyle={ { height: 0 } }
              onChangeTab={ this.onTabChange }>
              <Tab
                style={ { backgroundColor: 'transparent' } }
                textStyle={ { color: 'white' } }
                activeTextStyle={ { color: 'black' } }
                activeTabStyle={styles.activeTabStyle}
                tabStyle={styles.tabStyle}
                heading={ I18n.t('search_page.tab_label_investor') }>
                <InvestorsList onClick={ this.handleInvestorClick } navigation={ this.props.navigation }/>
              </Tab>
              <Tab
                style={ { backgroundColor: 'transparent' } }
                textStyle={ { color: 'white' } }
                activeTextStyle={ { color: 'black' } }
                activeTabStyle={styles.activeTabStyle}
                tabStyle={styles.tabStyle}
                heading={ I18n.t('search_page.tab_label_professional') }>
                <ProfessionalsList style={ { marginTop: 8 } } onClick={ this.handleProfessionalClick }
                                    navigation={ this.props.navigation }/>
              </Tab>
              <Tab
                style={ { backgroundColor: 'transparent' } }
                textStyle={ { color: 'white' } }
                activeTextStyle={ { color: 'black' } }
                activeTabStyle={styles.activeTabStyle}
                tabStyle={styles.tabStyle}
                heading={ I18n.t('search_page.tab_label_projects') }>
                <ProjectsList style={ { marginTop: 8 } } onClick={ this.handleProjectClick }
                              navigation={ this.props.navigation }/>
              </Tab>
              <Tab
                style={ { backgroundColor: 'transparent' } }
                textStyle={ { color: 'white' } }
                activeTextStyle={ { color: 'black' } }
                activeTabStyle={styles.activeTabStyle}
                tabStyle={styles.tabStyle}
                heading={ I18n.t('search_page.tab_label_job') }>
                <JobList style={ { marginTop: 8 } }
                          onClick={ this.handleJobClick }
                          navigation={ this.props.navigation }/>
              </Tab>
            </Tabs>
          </View>
        </View>
      </ImagePageContainer>
    )
  }
}

const styles = EStyleSheet.create({
  activeTabStyle: {
    backgroundColor: '#fff',
    paddingLeft: 0,
    paddingRight: 0
  },
  tabStyle: {
    backgroundColor: 'transparent',
    paddingLeft: 0,
    paddingRight: 0
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  content: {
    flex: 1,
    paddingBottom: 49
  },
  pageTitleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  },
  headerTitle: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  }
})

SearchPage.propTypes = {
  fetchMatches: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    projects: state.search.projects,
    professionals: state.search.professionals,
    investors: state.search.investors,
    isLoading: state.search.isLoading,
    error: state.search.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMatches: () => dispatch(searchActions.fetchMatches()),
    // TODO
    updateInvestors: () => dispatch(searchActions.fetchMatches()),
    updateProfessionals: () => dispatch(searchActions.fetchMatches()),
    updateProjects: () => dispatch(searchActions.fetchMatches())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
