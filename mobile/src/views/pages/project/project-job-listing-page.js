import { Left, List, ListItem, Right, Text } from 'native-base'
import React, { Component } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { ROLES } from '../../../enums'
import { PAGES_NAMES } from '../../../navigation/pages'
import * as profileActions from '../../../profile/actions'
import { NavigationHeader } from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { OutlineWhiteButton, ProfileWhiteButton } from '../../design/buttons'
import { ImagePageContainer } from '../../design/image-page-container'

class ProjectJobListingPage extends Component {

  handleRemoveJob = id => {
    Alert.alert(
      I18n.t('profile_page.remove_job'),
      I18n.t('profile_page.remove_job_confirm'),
      [
        { text: I18n.t('common.cancel'), onPress: () => {} },
        { text: I18n.t('common.ok'), onPress: () => this.props.removeProjectJob(id) },
      ],
      { cancelable: false }
    )
  }

  handleAddJob = () => {
    this.props.openEdit('employer', false)
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleEditJob = id => {
    this.props.openEdit('employer', true, id)
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  render () {
    const { isLoading } = this.props
    const { jobListings } = this.props.project

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
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <NavigationHeader
              onBack={ () => this.props.navigation.goBack() }
              title={ I18n.t('project_job_page.title') }
              rightIconSource={ WhiteLogo }/>
            <List style={ styles.membersList }>
              {
                jobListings.map((job, index) => (
                  <ListItem thumbnail key={ `project-job-${index}` } style={ styles.memberItem }>
                    <Left>
                      <Text
                        style={ styles.Text }>{ I18n.t(`common.roles.${ROLES.find(role => role.index === job.role).slug}`) }</Text>
                    </Left>
                    <Right style={ { flexDirection: 'row' } }>
                      <ProfileWhiteButton onPress={ () => this.handleEditJob(job.id) } icon={ 'create' }/>
                      <ProfileWhiteButton onPress={ () => this.handleRemoveJob(job.id) } icon={ 'trash' }/>
                    </Right>
                  </ListItem>
                ))
              }
            </List>
          </ScrollView>
        </View>
        <OutlineWhiteButton onPress={ () => this.handleAddJob() } text={ I18n.t('common.add') }/>
      </ImagePageContainer>
    )
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 49
  },
  membersList: {
    width: '100%',
    flex: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  memberItem: {
    width: '100%',
    height: 90,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginLeft: 0,
    paddingLeft: 15,
    alignContent: 'space-between',
    justifyContent: 'space-between'
  },
  Text: {
    color: '#fff',
    fontSize: 14
  }
})

const mapStateToProps = state => {
  return {
    project: state.profile.project,
    isLoading: state.profile.isRemovingJob
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeProjectJob: jobId => dispatch(profileActions.removeProjectJob(jobId)),
    openEdit: (type, prefill = true, id) => dispatch(profileActions.openEdit(type, prefill, id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectJobListingPage)
