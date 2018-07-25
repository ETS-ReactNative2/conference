import { Container, Tab, Tabs } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import { PAGES_NAMES } from '../../../navigation'
import { searchActions } from '../../../search'
import ErrorMessage from '../../components/error-message/error-message'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import InvestorsList from './components/investors-list'
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

  onTabChange = ({ from, i }) => {
    this.setState({
      currentTab: i
    })
  }

  render () {
    const { projects, investors, isLoading, error, fetchMatches, updateInvestors, updateProjects } = this.props

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
      <Container>
        <Tabs
          onChangeTab={ this.onTabChange }>
          <Tab heading={ I18n.t('search_page.investor_header') }>
            <InvestorsList profiles={ this.props.investors } onClick={ this.handleInvestorClick } onMark={ () => {} }/>
          </Tab>
          <Tab heading={ I18n.t('search_page.projects_header') }>
            <ProjectsList profiles={ this.props.projects }/>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

SearchPage.propTypes = {
  fetchMatches: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    projects: state.search.projects,
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
    updateProjects: () => dispatch(searchActions.fetchMatches())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
