import { Container } from 'native-base'
import React from 'react'
import { ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { PAGES_NAMES } from '../../../navigation'
import * as searchActions from '../../../search/actions'
import Header from '../../components/header/header'
import Investor from '../../components/investor/investor-cards'
import Professional from '../../components/professional/professional-cards'
import Project from '../../components/project/project-cards'
import { ImagePageContainer } from '../../design/image-page-container'
import { Subheader } from '../../design/subheader'

class HomePage extends React.Component {

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

  render () {
    const {
      projects, professionals, investors
    } = this.props

    return (
      <ImagePageContainer>
        <Container style={ { backgroundColor: 'transparent' } }>
          <View style={ styles.content }>
            <ScrollView>
              <Header title={ I18n.t('home_page.title') }
                      rightIconSource={ WhiteLogo }/>
              <View>
                <Subheader text={ I18n.t('common.investors') }/>
                <ScrollView style={ { minWidth: '100%', paddingBottom: 8, marginTop: 8 } } horizontal>
                  {
                    investors
                      .filter(investor => !investor.hide)
                      .map(investor => (
                        <Investor.Small
                          key={ investor.id }
                          investor={ investor }
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
                      <Project.Small
                        key={ project.id }
                        project={ project }
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
                    professionals
                      .filter(prof => !prof.hide)
                      .map((professional, index) => (
                        <Professional.Small
                          key={ index }
                          professional={ professional }
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
