import { Button, Container, Icon, Spinner, Tab, Tabs, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import { searchActions } from '../../../search'
import InvestorFilterModal from './components/investor-filter-modal'
import InvestorsList from './components/investors-list'
import ProjectsFilterModal from './components/projects-filter-modal'
import ProjectsList from './components/projects-list'

class SearchPage extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          style={ { height: '100%' } }
          transparent
          onPress={ navigation.getParam('handleClick') }>
          <Icon active={ true } style={ { color: 'white' } } name='search'/>
        </Button>
      ),
    }
  }

  componentDidMount () {
    this.props.navigation.setParams({ handleClick: this.handleSearchOpen })
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

  onTabChange = ({ from, i }) => {
    this.setState({
      currentTab: i
    })
  }

  handleSearchOpen = () => {
    this.setState({
      investorModal: this.state.currentTab === 0,
      projectModal: this.state.currentTab === 1
    })
  }

  render () {
    console.log(this.props.isLoading)
    return (
      <Container>
        { this.props.isLoading &&
        <Spinner/>
        }
        { !this.props.isLoading &&
        <Container>
          <Tabs
            onChangeTab={ this.onTabChange }>
            <Tab heading={ I18n.t('search_page.investor_header') }>
              <InvestorsList profiles={ this.props.investors }/>
            </Tab>
            <Tab heading={ I18n.t('search_page.projects_header') }>
              <ProjectsList profiles={ this.props.projects }/>
            </Tab>
          </Tabs>
          <InvestorFilterModal
            onSearch={ () => {
              this.setState({ investorModal: false })
              this.props.updateInvestors
            } }
            onClose={ () => this.setState({
              investorModal: false
            }) }
            visible={ this.state.investorModal }/>
          <ProjectsFilterModal
            onSearch={ () => {
              this.setState({ projectModal: false })
              this.props.updateProjects
            } }
            onClose={ () => this.setState({
              projectModal: false
            }) }
            visible={ this.state.projectModal }/>
        </Container>
        }
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
    isLoading: state.search.isLoading
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
