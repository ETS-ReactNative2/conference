import { ScrollableTab, Tab, Tabs } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { PAGES_NAMES } from '../../../navigation'
import Header from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { ImagePageContainer } from '../../design/image-page-container'
import InvestorsList from './components/investors-list'
import JobList from './components/job-list'
import ProfessionalsList from './components/professionals-list'
import ProjectsList from './components/projects-list'
import * as searchActions from '../../../search/actions'

class SearchPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0,
      areProfessionalsLoaded: false,
      areProjectsLoaded: false,
      areJobsLoaded: false
    }
  }

  componentDidMount() {
    // first tab is always investors so load them when component is mounted
    this.props.updateInvestors(this.props.investorsSearchFilters)
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

  onTabChange = ({ i }) => {
    if (this.state.currentTab !== i) {
      if (i === 1 && !this.state.areProfessionalsLoaded) {
        this.props.updateProfessionals(this.props.professionalsSearchFilters)
        this.setState({ currentTab: i, areProfessionalsLoaded: true })
      }
      if (i === 2 && !this.state.areProjectsLoaded) {
        this.props.updateProjects(this.props.projectsSearchFilters)
        this.setState({ currentTab: i, areProjectsLoaded: true })
      }
      if (i === 3 && !this.state.areJobsLoaded) {
        this.props.updateJobs(this.props.jobsSearchFilters)
        this.setState({ currentTab: i, areJobsLoaded: true })
      }
    }
  }

  render () {
    const {
      isLoading
    } = this.props

    return (
      <ImagePageContainer>
        <View style={ { flex: 1 } }>
          <View style={ styles.content }>
            <View style={ { backgroundColor: 'transparent' } }>
              <Header title={ I18n.t('search_page.title') }
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
                { isLoading === true && <LunaSpinner /> }
                { isLoading === false && <InvestorsList profiles={ this.props.investors } onClick={ this.handleInvestorClick } navigation={ this.props.navigation }/> }
              </Tab>
              <Tab
                style={ { backgroundColor: 'transparent' } }
                textStyle={ { color: 'white' } }
                activeTextStyle={ { color: 'black' } }
                activeTabStyle={styles.activeTabStyle}
                tabStyle={styles.tabStyle}
                heading={ I18n.t('search_page.tab_label_professional') }>
                { isLoading === true && <LunaSpinner /> }
                { isLoading === false && <ProfessionalsList profiles={ this.props.professionals } style={ { marginTop: 8 } } onClick={ this.handleProfessionalClick }
                  navigation={ this.props.navigation }/> }
              </Tab>
              <Tab
                style={ { backgroundColor: 'transparent' } }
                textStyle={ { color: 'white' } }
                activeTextStyle={ { color: 'black' } }
                activeTabStyle={styles.activeTabStyle}
                tabStyle={styles.tabStyle}
                heading={ I18n.t('search_page.tab_label_projects') }>
                { isLoading === true && <LunaSpinner /> }
                { isLoading === false && <ProjectsList profiles={ this.props.projects } style={ { marginTop: 8 } } onClick={ this.handleProjectClick }
                  navigation={ this.props.navigation }/> }
              </Tab>
              <Tab
                style={ { backgroundColor: 'transparent' } }
                textStyle={ { color: 'white' } }
                activeTextStyle={ { color: 'black' } }
                activeTabStyle={styles.activeTabStyle}
                tabStyle={styles.tabStyle}
                heading={ I18n.t('search_page.tab_label_job') }>
                { isLoading === true && <LunaSpinner /> }
                { isLoading === false && <JobList jobs={ this.props.jobs } style={ { marginTop: 8 } }
                          onClick={ this.handleJobClick }
                          navigation={ this.props.navigation }/> }
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
  content: {
    flex: 1,
    paddingBottom: 49
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  }
})

const mapStateToProps = state => {
  return {
    investorsSearchFilters: state.filter.investor,
    professionalsSearchFilters: state.filter.professional,
    projectsSearchFilters: state.filter.project,
    jobsSearchFilters: state.filter.job,
    projects: state.search.projects,
    professionals: state.search.professionals,
    investors: state.search.investors,
    jobs: state.search.jobs,
    isLoading: state.search.isLoadingSearchQuery
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInvestors: filters => dispatch(searchActions.updateInvestors(filters)),
    updateProfessionals: filters => dispatch(searchActions.updateProfessionals(filters)),
    updateProjects: filters => dispatch(searchActions.updateProjects(filters)),
    updateJobs: filters => dispatch(searchActions.updateJobs(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
