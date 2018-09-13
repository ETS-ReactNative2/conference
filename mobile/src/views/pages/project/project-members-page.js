import { Left, List, ListItem, Right, Text } from 'native-base'
import React, { Component } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import * as profileActions from '../../../profile/actions'
import { NavigationHeader } from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { ProfileWhiteButton } from '../../design/buttons'
import FlowInputValidated from '../../design/flow-input-validated'
import { ImagePageContainer } from '../../design/image-page-container'

const errorStyleOverride = {
  border: {
    borderColor: '#f2b9cb',
    borderBottomColor: '#f2b9cb'
  }
}

class ProjectMembersPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      isChanging: true
    }
  }

  componentWillMount () {
    this.props.loadProjectMembers()
  }

  handleRemoveMember = memberId => {
    this.setState({ isChanging: false })
    this.props.removeProjectMember(memberId)
  }

  handleAddMember = email => {
    if (email && email !== '') this.props.addProjectMember(email)
    this.setState({ email: '', isChanging: false })
  }

  render () {
    const { projectMembers, memberRequests, error } = this.props
    const { email, isChanging } = this.state

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
        <View style={ { flex: 1, justifyContent: 'flex-start' } }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <NavigationHeader
              onBack={ () => this.props.navigation.goBack() }
              title={ I18n.t('project_members_page.title') }
              rightIconSource={ WhiteLogo }/>
            <List style={ styles.membersList }>
              {
                memberRequests.map((member, index) => (
                  <ListItem thumbnail key={ `project-member-${index}` } style={ styles.memberItem }>
                    <Left>
                      <Text style={ styles.Text }>{ member.firstName } { member.lastName }</Text>
                    </Left>
                  </ListItem>
                ))
              }
              {
                projectMembers.map((member, index) => (
                  <ListItem thumbnail key={ `project-member-${index}` } style={ styles.memberItem }>
                    <Left>
                      <Text style={ styles.Text }>{ member.firstName } { member.lastName }</Text>
                    </Left>
                    <Right>
                      <ProfileWhiteButton onPress={ () => this.handleRemoveMember(member.id) } icon={ 'trash' }/>
                    </Right>
                  </ListItem>
                ))
              }
            </List>
          </ScrollView>
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={ 64 } enabled={ Platform.OS === 'ios' }>
          <View style={ styles.addView }>
            <View style={ styles.inputView }>
              <FlowInputValidated
                floatingLabel={ true }
                placeholder={ I18n.t('common.email_placeholder') }
                labelText={ I18n.t('common.email') }
                value={ email }
                status='regular'
                isError={ error && !isChanging }
                errorMessage={ I18n.t('project_members_page.emailError') }
                errorStyleOverride={ errorStyleOverride }
                onChangeText={ text => this.setState({ email: text, isChanging: true }) }/>
            </View>
            <View>
              <ProfileWhiteButton onPress={ () => this.handleAddMember(email) } text={ I18n.t('common.add') }/>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20
  },
  container: {
    flex: 1
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
  },
  addView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    margin: 8
  },
  inputView: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 4
  },
})

const mapStateToProps = state => {
  return {
    projectMembers: state.profile.projectMembers.members,
    memberRequests: state.profile.projectMembers.memberRequests,
    error: state.profile.projectMembers.error,
    isLoading: state.profile.projectMembers.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProjectMembers: () => dispatch(profileActions.loadProjectMembers()),
    addProjectMember: email => dispatch(profileActions.addProjectMember(email)),
    removeProjectMember: memberId => dispatch(profileActions.removeProjectMember(memberId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMembersPage)
