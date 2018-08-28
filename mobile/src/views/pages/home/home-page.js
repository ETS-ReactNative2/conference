import { Container } from 'native-base'
import React from 'react'
import { ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import { PAGES_NAMES } from '../../../navigation'
import * as searchActions from '../../../search/actions'
import ErrorMessage from '../../components/error-message/error-message'
import Header from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { ImagePageContainer } from '../../design/image-page-container'
import { Subheader } from '../../design/subheader'
import { InvestorItem } from './components/investor-item'
import { ProfessionalItem } from './components/professional-item'
import { ProjectItem } from './components/project-item'

class HomePage extends React.Component {

  componentDidMount () {
    this.props.fetchDefaults()
  }

  handleInvestorClick = investor => {
    this.props.navigation.navigate(PAGES_NAMES.INVESTOR_PAGE, {
      investor,
      defaults: true
    })
  }

  handleProfessionalClick = professional => {
    this.props.navigation.navigate(PAGES_NAMES.PROFESSIONAL_PAGE, {
      professional,
      defaults: true
    })
  }

  handleProjectClick = project => {
    this.props.navigation.navigate(PAGES_NAMES.PROJECT_PAGE, {
      project,
      defaults: true
    })
  }

  onTabChange = ({ from, i }) => {
    this.setState({
      currentTab: i
    })
  }

  render () {
    const {
      projects, professionals, investors, isLoading, error, fetchMatches
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
        <Container style={ { backgroundColor: 'transparent' } }>
          <View style={ styles.content }>
            <ScrollView>
              <Header title={ I18n.t('home_page.title') }
                      titleStyle={ { color: 'white', marginTop: 8 } }
                      rightIconSource={ WhiteLogo }/>
              <View style={ { marginTop: 16 } }>
                <Subheader text={ I18n.t('common.investors') }/>
                <ScrollView style={ { minWidth: '100%', paddingBottom: 8, marginTop: 8 } } horizontal>
                  {
                    investors.map(investor => (
                      <InvestorItem
                        key={ investor.id } investor={ investor } onMark={ () => {} }
                        onClick={ () => this.handleInvestorClick(investor) }
                      />
                    ))
                  }
                </ScrollView>
              </View>
              <View>
                <Subheader text={ I18n.t('common.projects') }/>
                <ScrollView style={ { minWidth: '100%', paddingBottom: 8, marginTop: 8 } } horizontal>
                  {
                    projects.map(project => (
                      <ProjectItem
                        key={ project.id } project={ project } onMark={ () => {} }
                        onClick={ () => this.handleProjectClick(project) }
                      />
                    ))
                  }
                </ScrollView>
              </View>
              <View>
                <Subheader text={ I18n.t('common.attendees') }/>
                <ScrollView style={ { minWidth: '100%', paddingBottom: 4, marginBottom: 4, marginTop: 8 } } horizontal>
                  {
                    professionals.map((professional, index) => (
                      <ProfessionalItem
                        key={ index } professional={ professional } onMark={ () => {} }
                        onClick={ () => this.handleProfessionalClick(professional) }
                      />
                    ))
                  }
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </Container>
      </ImagePageContainer>
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
    backgroundColor: 'transparent',
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

const mapStateToProps = state => {
  return {
    projects: state.search.defaults.projects,
    professionals: state.search.defaults.professionals,
    investors: state.search.defaults.investors,
    isLoading: state.search.defaults.isLoading,
    error: state.search.defaults.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDefaults: () => dispatch(searchActions.fetchDefaults())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
