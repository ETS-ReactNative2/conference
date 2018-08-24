import { Container, Tab, Tabs } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import BlackLogo from '../../../assets/logos/logo-black.png'
import { PAGES_NAMES } from '../../../navigation'
import { searchActions } from '../../../search'
import ErrorMessage from '../../components/error-message/error-message'
import Header from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import InvestorsList from './components/investors-list'
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

  onTabChange = ({ from, i }) => {
    this.setState({
      currentTab: i
    })
  }

  render () {
    const {
      projects, professionals, investors, isLoading, error, fetchMatches, updateInvestors, updateProfessionals, updateProjects
    } = this.props

    if (isLoading) {
      return <LunaSpinner/>
    }

    if (error) {
      return (
        <ErrorMessage
          message={ 'Something went wrong' }
          onRetry={ fetchMatches }/>
      )
    }
    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: '#fff' } } forceInset={ { top: 'always' } }>
          <Container style={ { backgroundColor: '#fff' } }>
            <View style={ styles.content }>
              <ScrollView>
                <View style={ { backgroundColor: '#fff' } }>
                  <Header title={ I18n.t('search_page.title') }
                          titleStyle={ { color: '#868686', marginTop: 8 } }
                          rightIconSource={ BlackLogo }/>
                </View>
                <Tabs
                  tabContainerStyle={{ borderBottomWidth: 0 }}
                  style={ { borderColor: '#e8e8e8' } }
                  tabBarUnderlineStyle={ { backgroundColor: 'black', height: 1 } }
                  onChangeTab={ this.onTabChange }>
                  <Tab
                    activeTextStyle={ { color: 'black' } }
                    activeTabStyle={ { backgroundColor: '#fff' } }
                    tabStyle={ { backgroundColor: '#e8e8e8' } }
                    heading={ I18n.t('search_page.tab_label_investor') }>
                    <InvestorsList onClick={ this.handleInvestorClick } navigation={ this.props.navigation }/>
                  </Tab>
                  <Tab
                    activeTextStyle={ { color: 'black' } }
                    activeTabStyle={ { backgroundColor: '#fff' } }
                    tabStyle={ { backgroundColor: '#e8e8e8' } }
                    heading={ I18n.t('search_page.tab_label_professional') }>
                    <ProfessionalsList style={ { marginTop: 8 } } onClick={ this.handleProfessionalClick } navigation={ this.props.navigation }/>
                  </Tab>
                  <Tab
                    activeTextStyle={ { color: 'black' } }
                    activeTabStyle={ { backgroundColor: '#fff' } }
                    tabStyle={ { backgroundColor: '#e8e8e8' } }
                    heading={ I18n.t('search_page.tab_label_projects') }>
                    <ProjectsList style={ { marginTop: 8 } } onClick={ this.handleProjectClick } navigation={ this.props.navigation }/>
                  </Tab>
                </Tabs>
              </ScrollView>
            </View>
          </Container>
        </SafeAreaView>
    )
  }
}

const styles = EStyleSheet.create({
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  content: {
    flex: 1,
    backgroundColor: '#e8e8e8'
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
