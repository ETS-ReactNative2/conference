import { Container } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { AppState, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import { PAGES_NAMES } from '../../../navigation'
import { profileActions } from '../../../profile'
import { signUpActions } from '../../../signup'
import Header from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { OutlineWhiteButton, ProfileWhiteButton } from '../../design/buttons'
import { Subheader } from '../../design/subheader'

class ProfilePage extends React.Component {

  state = {
    appState: AppState.currentState
  }

  componentDidMount () {
    this.props.fetchProfiles()
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.fetchProfiles()
    }
    this.setState({ appState: nextAppState })
  }

  openLink (url) {
    // Linking.canOpenURL(url)
    //   .then(supported => {
    //     if (supported) {
    //       Linking.openURL(url)
    //     } else {
    //       console.log('Don\'t know how to open URI: ' + url)
    //     }
    //   })
    this.props.navigation.navigate(PAGES_NAMES.WEBVIEW_PAGE, { uri: url })
  }

  handleProfessionalCreate = () => {
    this.props.openEdit('professional', false)
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleProjectCreate = () => {
    // this.openLink('https://www.blockseoul.com/projects')
    this.props.openEdit('project', false)
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleInvestorCreate = () => {
    this.openLink('https://www.blockseoul.com/investors')
  }

  handleOpenProfessionalDetails = () => {
    this.props.navigation.navigate(PAGES_NAMES.PROFESSIONAL_PAGE, {
      professional: this.props.professional,
      single: true
    })
  }

  handleOpenProjectDetails = () => {
    this.props.navigation.navigate(PAGES_NAMES.PROJECT_PAGE, {
      project: this.props.project,
      single: true
    })
  }

  handleOpenInvestorDetails = () => {
    this.props.navigation.navigate(PAGES_NAMES.INVESTOR_PAGE, {
      investor: this.props.investor,
      single: true
    })
  }

  handleEditProfessional = () => {
    this.props.openEdit('professional')
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleEditProject = () => {
    this.props.openEdit('project')
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleEditInvestor = () => {
    this.props.openEdit('investor')
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  render () {

    const {isLoading} = this.props

    if (isLoading) {
      return <LunaSpinner/>
    }

    return (
      <SafeAreaView style={ { flex: 1, backgroundColor: '#2C65E2' } } forceInset={ { top: 'always' } }>
        <Container style={ { backgroundColor: '#2C65E2' } }>
          <View style={ styles.content }>
            <ScrollView>
              <View style={ { backgroundColor: '#2C65E2' } }>
                <Header title={ I18n.t('profile_page.title') }
                        titleStyle={ { color: 'white', marginTop: 8 } }
                        rightIconSource={ WhiteLogo }/>
              </View>
              <Subheader text={ I18n.t('profile_page.personal') }/>
              <View style={ { flexDirection: 'row', margin: 8 } }>
                <ProfileWhiteButton onPress={ () => this.props.navigation.navigate(PAGES_NAMES.EDIT_BASIC_PROFILE) }
                                    text={ I18n.t('common.edit') }/>
              </View>
              <Subheader text={ I18n.t('profile_page.job_profile') }/>
              <View style={ { flexDirection: 'row', margin: 8 } }>
                { this.props.professional && (
                  <React.Fragment>
                    <ProfileWhiteButton onPress={ this.handleOpenProfessionalDetails } text={ I18n.t('common.view') }/>
                    <ProfileWhiteButton onPress={ this.handleEditProfessional }
                                        text={ I18n.t('common.edit') }/>
                    {
                      this.props.professional.isActive && (
                        <ProfileWhiteButton onPress={ this.props.deactivateProfile }
                                            text={ I18n.t('common.deactivate') }/>
                      )
                    }
                    {
                      !this.props.professional.isActive && (
                        <ProfileWhiteButton onPress={ this.props.reactivateProfile }
                                            text={ I18n.t('common.reactivate') }/>
                      )
                    }
                  </React.Fragment>
                ) }
                { !this.props.professional && (
                  <ProfileWhiteButton onPress={ this.handleProfessionalCreate } text={ I18n.t('common.create') }/>

                ) }
              </View>
              <Subheader text={ I18n.t('profile_page.project') }/>
              <View style={ { flexDirection: 'row', margin: 8 } }>
                { this.props.project && (
                  <React.Fragment>
                    <ProfileWhiteButton onPress={ this.handleOpenProjectDetails } text={ I18n.t('common.view') }/>
                    <ProfileWhiteButton onPress={ this.handleEditProject } text={ I18n.t('common.edit') }/>
                    <ProfileWhiteButton onPress={ this.props.leaveProject } text={ I18n.t('common.leave') }/>
                  </React.Fragment>
                ) }
                { !this.props.project && (
                  <ProfileWhiteButton onPress={ this.handleProjectCreate } text={ I18n.t('common.create') }/>
                ) }
              </View>
              <Subheader text={ I18n.t('profile_page.investor') }/>
              <View style={ { flexDirection: 'row', margin: 8 } }>
                { this.props.investor && (
                  <React.Fragment>
                    <ProfileWhiteButton onPress={ this.handleOpenInvestorDetails } text={ I18n.t('common.view') }/>
                    <ProfileWhiteButton onPress={ this.handleEditInvestor } text={ I18n.t('common.edit') }/>
                    {
                      this.props.investor.isActive && (
                        <ProfileWhiteButton onPress={ this.props.deactivateInvestor }
                                            text={ I18n.t('common.deactivate') }/>
                      )
                    }
                    {
                      !this.props.investor.isActive && (
                        <ProfileWhiteButton onPress={ this.props.reactivateInvestor }
                                            text={ I18n.t('common.reactivate') }/>
                      )
                    }
                  </React.Fragment>
                ) }
                { !this.props.investor && (
                  <ProfileWhiteButton onPress={ this.handleInvestorCreate } text={ I18n.t('common.create') }/>
                ) }
              </View>
              <Subheader text={ I18n.t('common.logout') }/>
              <OutlineWhiteButton
                text={ I18n.t('common.logout') }
                onPress={ () => this.props.logout() }
              />

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
    backgroundColor: '#2C65E2'
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

ProfilePage.propTypes = {
  logout: PropTypes.func.isRequired,
  fetchProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investor: state.profile.investor,
    project: state.profile.project,
    professional: state.profile.professional,
    isLoading: state.profile.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(signUpActions.logout()),
    fetchProfiles: () => dispatch(profileActions.fetchProfiles()),
    deactivateProfile: () => dispatch(profileActions.deactivateProfile()),
    deactivateInvestor: () => dispatch(profileActions.deactivateInvestor()),
    leaveProject: () => dispatch(profileActions.leaveProject()),
    reactivateProfile: () => dispatch(profileActions.activateProfile()),
    reactivateInvestor: () => dispatch(profileActions.activateInvestor()),
    openEdit: (type, prefill = true) => dispatch(profileActions.openEdit(type, prefill))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

