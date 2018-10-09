import { Container } from 'native-base'
import React from 'react'
import { ScrollView, View, FlatList } from 'react-native'
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

                <FlatList
                  style={ { minWidth: '100%', paddingBottom: 8, marginTop: 8 } }
                  horizontal={true}
                  data={ investors
                    .filter(investor => !investor.hide) }
                  keyExtractor={ item => item.id }
                  renderItem={ ({item}) => (
                    <Investor.Small
                      key={ item.id }
                      investor={ item }
                      onClick={ () => this.handleInvestorClick(item) }
                    />
                  ) }
                />
              </View>
              <View>
                <Subheader text={ I18n.t('common.projects') }/>
                <FlatList
                  style={ { minWidth: '100%', paddingBottom: 8, marginTop: 8 } }
                  horizontal={true}
                  data={ projects }
                  keyExtractor={ item => item.id }
                  renderItem={ ({item}) => (
                    <Project.Small
                      key={ item.id }
                      project={ item }
                      onClick={ () => this.handleProjectClick(item) }
                    />
                  ) }
                />
              </View>
              <View>
                <Subheader text={ I18n.t('common.attendees') }/>
                <FlatList
                  style={ { minWidth: '100%', paddingBottom: 8, marginTop: 8 } }
                  horizontal={true}
                  data={ professionals
                    .filter(prof => !prof.hide) }
                  keyExtractor={ item => item.id }
                  renderItem={ ({item}) => (
                    <Professional.Small
                      key={ item.id }
                      professional={ item }
                      onClick={ () => this.handleProfessionalClick(item) }
                    />
                  ) }
                />
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
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
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
