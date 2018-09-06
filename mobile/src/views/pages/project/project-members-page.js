import { Container, Text, List, ListItem, Right, Left, Body } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SafeAreaView } from 'react-navigation'
import FlowInputValidated from '../../design/flow-input-validated'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import { NavigationHeader } from '../../components/header/header'
import { ProfileWhiteButton } from '../../design/buttons'
import * as profileActions from '../../../profile/actions';

const errorStyleOverride = {
  border: {
    borderColor: '#f2b9cb',
    borderBottomColor: '#f2b9cb'
  }
}

class ProjectMembersPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      isChanging: true
    }
  }

  componentWillMount () {
    const { loadProjectMemebers } = this.props
    loadProjectMemebers()
  }

  handleRemoveMember = memberId => {
    this.setState({ isChanging: false })
    this.props.removeProjectMember(memberId)
  }

  handleAddMemeber = email => {
    if (email && email !== '') this.props.addProjectMember(email)
    this.setState({ email: '', isChanging: false })
  }

  render () {
    const { projectMembers, memberRequests, error } = this.props
    const { email, isChanging } = this.state

    return (
      <SafeAreaView style={ styles.container } forceInset={ { top: 'always' } }>
        <Container style={ styles.container }>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
              <NavigationHeader
                onBack={ () => this.props.navigation.goBack() }
                title={ I18n.t('project_members_page.title') }
                titleStyle={ styles.navigationStyle }
                rightIconSource={ WhiteLogo }/>
              <List style={ styles.membersList }>
              {
                memberRequests.map((member, index) => (
                  <ListItem thumbnail key={ `project-member-${index}` } style={ styles.memberItem }>
                    <Left>
                      <Text style={ styles.Text }>{ member.firstName } { member.lastName }</Text>
                    </Left>
                    <Body style={ styles.nonBorder }>
                    </Body>
                  </ListItem>
                ))
              }
              {
                projectMembers.map((member, index) => (
                  <ListItem thumbnail key={ `project-member-${index}` } style={ styles.memberItem }>
                    <Left>
                      <Text style={ styles.Text }>{ member.firstName } { member.lastName }</Text>
                    </Left>
                    <Body style={ styles.nonBorder }>
                    </Body>
                    <Right>
                      <ProfileWhiteButton onPress={ () => this.handleRemoveMember(member.id) } text={ I18n.t('common.remove') }/>
                    </Right>
                  </ListItem>
                ))
              }
              </List>
            </ScrollView>
          </View>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64} enabled={Platform.OS === 'ios'}>
            <View style={styles.addView}>
              <View style={styles.inputView}>
                <FlowInputValidated
                  floatingLabel={ true }
                  placeholder={ I18n.t('common.email_placeholder') }
                  labelText={ I18n.t('common.email') }
                  value={ email }
                  status='regular'
                  isError={error && !isChanging}
                  errorMessage={ I18n.t('project_members_page.emailError') }
                  errorStyleOverride={ errorStyleOverride }
                  onChangeText={ text => this.setState({ email: text, isChanging: true })} />
              </View>
              <View>
                <ProfileWhiteButton onPress={ () => this.handleAddMemeber(email) } text={ I18n.t('common.add') } />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Container>
      </SafeAreaView>
    )
  }
}

const styles = EStyleSheet.create({
  navigationStyle: {
    color: '#fff',
    marginTop: 12
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#172D5C'
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
    backgroundColor: '#172D5C',
    marginLeft: 0,
    paddingLeft: 15,
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
    backgroundColor: '#172D5C',
    margin: 8
  },
  inputView: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8
  },
  nonBorder: {
    borderBottomWidth: 0
  }
})

const mapStateToProps = state => {
  return {
    projectMembers: state.profile.projectMembers.members,
    memberRequests: state.profile.projectMembers.memberRequests,
    error: state.profile.projectMembers.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProjectMemebers: () => dispatch(profileActions.loadProjectMemebers()),
    addProjectMember: email => dispatch(profileActions.addProjetMember(email)),
    removeProjectMember: memberId => dispatch(profileActions.removeProjectMember(memberId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMembersPage)
