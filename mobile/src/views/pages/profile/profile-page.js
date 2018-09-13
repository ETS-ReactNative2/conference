import { Container } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, Text, View, Alert } from 'react-native'
import Config from 'react-native-config'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { PAGES_NAMES } from '../../../navigation'
import { profileActions } from '../../../profile'
import { signUpActions } from '../../../signup'
import Header from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { OutlineWhiteButton, ProfileWhiteButton } from '../../design/buttons'
import { ImagePageContainer } from '../../design/image-page-container'
import { SmallSubheader } from '../../design/subheader'

class ProfilePage extends React.Component {

  openLink (url) {
    this.props.navigation.navigate(PAGES_NAMES.WEBVIEW_PAGE, { uri: url })
  }

  handleProfessionalCreate = () => {
    this.props.openEdit('professional', false)
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleProjectCreate = (devMode = false) => {
    if (devMode) {
      this.props.openEdit('project', false)
      this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
    }
    else {
      this.openLink('https://www.blockseoul.com/projects')
    }
  }

  handleProjectManage = () => {
    this.props.navigation.navigate(PAGES_NAMES.PROJECT_MEMBERS_PAGE)
  }

  handleInvestorCreate = (devMode = false) => {
    if (devMode) {
      this.props.openEdit('investor', false)
      this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
    }
    else {
      this.openLink('https://www.blockseoul.com/investors')
    }
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
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE, {title: I18n.t('flow_page.employee_title')})
  }

  handleEditProject = () => {
    this.props.openEdit('project')
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleEditInvestor = () => {
    this.props.openEdit('investor')
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleLeaveProject = () => {
    Alert.alert(
      I18n.t('profile_page.leave_project'),
      I18n.t('profile_page.leave_project_confirm'),
      [
        { text: I18n.t('common.cancel'), onPress: () => console.log('Cancel to leave the project') },
        { text: I18n.t('common.ok'), onPress: () => this.props.leaveProject() },
      ],
      { cancelable: false }
    )
  }

  render () {
    const { isLoading } = this.props

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

    return (
      <ImagePageContainer>
        <Container style={ { backgroundColor: 'transparent' } }>
          <View style={ styles.content }>
            <ScrollView>
              <View style={ { backgroundColor: 'transparent' } }>
                <Header title={ I18n.t('profile_page.title') }
                        rightIconSource={ WhiteLogo }/>
              </View>
              <SmallSubheader text={ I18n.t('profile_page.personal') }/>
              <View style={ styles.actionsContainer }>
                <View style={ styles.actions }>
                  <ProfileWhiteButton onPress={ () => this.props.navigation.navigate(PAGES_NAMES.EDIT_BASIC_PROFILE) }
                                      text={ I18n.t('common.edit') }/>
                </View>
              </View>
              <SmallSubheader text={ I18n.t('profile_page.job_profile') }/>
              <View style={ styles.actionsContainer }>
                <View style={ styles.actions }>
                  { this.props.professional && (
                    <React.Fragment>
                      <ProfileWhiteButton onPress={ this.handleOpenProfessionalDetails }
                                          text={ I18n.t('common.view') }/>
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
                {
                  this.props.professional && (
                    <Text style={ styles.warningText }>
                      { this.props.professional.isActive
                        ? I18n.t('profile_page.reactivate_warning')
                        : I18n.t('profile_page.deactivate_warning') }
                    </Text>
                  )
                }
              </View>
              <SmallSubheader text={ I18n.t('profile_page.project') }/>
              <View style={ styles.actionsContainer }>
                <View style={ styles.actions }>
                  { this.props.project && (
                    <React.Fragment>
                      <ProfileWhiteButton onPress={ this.handleOpenProjectDetails } text={ I18n.t('common.view') }/>
                      <ProfileWhiteButton onPress={ this.handleEditProject } text={ I18n.t('common.edit') }/>
                      <ProfileWhiteButton onPress={ this.handleProjectManage } text={ I18n.t('common.manage') }/>
                      <ProfileWhiteButton onPress={ this.handleLeaveProject } text={ I18n.t('common.leave') }/>
                    </React.Fragment>
                  ) }
                  { !this.props.project && (
                    <React.Fragment>
                      <ProfileWhiteButton onPress={ () => this.handleProjectCreate(false) }
                                          text={ I18n.t('common.create') }/>
                      { getBoolean(Config.APP_DEV_FLOW) && (
                        <ProfileWhiteButton onPress={ () => this.handleProjectCreate(true) } text={ 'DEV_CREATE' }/>
                      ) }
                    </React.Fragment>
                  ) }
                </View>
              </View>
              <SmallSubheader text={ I18n.t('profile_page.investor') }/>
              <View style={ styles.actionsContainer }>
                <View style={ styles.actions }>
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
                    <React.Fragment>
                      <ProfileWhiteButton onPress={ () => this.handleInvestorCreate(false) }
                                          text={ I18n.t('common.create') }/>
                      { getBoolean(Config.APP_DEV_FLOW) && (
                        <ProfileWhiteButton onPress={ () => this.handleInvestorCreate(true) } text={ 'DEV_CREATE' }/>
                      ) }
                    </React.Fragment>
                  ) }
                </View>
                {
                  this.props.investor && (
                    <Text style={ styles.warningText }>
                      { this.props.investor.isActive
                        ? I18n.t('profile_page.reactivate_warning')
                        : I18n.t('profile_page.deactivate_warning') }
                    </Text>
                  )
                }
              </View>
              <SmallSubheader text={ I18n.t('common.logout') }/>
              <View style={ { margin: 8 } }>
                <OutlineWhiteButton
                  text={ I18n.t('common.logout') }
                  onPress={ () => this.props.logout() }
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
  },
  warningText: {
    color: 'rgba(255, 255, 255, .5)',
    marginTop: 8
  },
  actionsContainer: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    marginBottom: 16
  },
  actions: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  }
})

ProfilePage.propTypes = {
  logout: PropTypes.func.isRequired,
  fetchProfiles: PropTypes.func.isRequired
}

function getBoolean(stringBool){
  return stringBool === 'true'
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

