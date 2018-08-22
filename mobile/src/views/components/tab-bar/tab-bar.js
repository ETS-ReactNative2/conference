import { Content, Icon, List, Text, View } from 'native-base'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import { notificationsActions } from '../../../notifications'

const routes = [
  {
    name: 'agenda',
    navigation_page: 'AGENDA_PAGE',
    iconType: 'FontAwesome',
    iconName: 'calendar'
  },
  {
    name: 'notifications',
    navigation_page: 'NOTIFICATIONS_PAGE',
    iconType: 'FontAwesome',
    iconName: 'search',
    badge: true,
    badgeValueProps: 'unread'
  },
  {
    name: 'flows',
    navigation_page: 'PROFILE_ONBOARDING_PAGE',
    iconType: 'FontAwesome',
    iconName: 'search',
  },
  {
    name: 'search',
    navigation_page: 'SEARCH_PAGE',
    iconType: 'FontAwesome',
    iconName: 'search'
  }
]

class TabBar extends Component {

  componentDidMount () {
    this.props.fetchNotifications()
  }

  render () {
    return (
      <View style={ { flexDirection: 'row' } }>
        <Content>
          <List>
            { routes.map(data =>
              <View
                key={ data.name }
                button
                onPress={ () => this.props.navigation.navigate(data.navigation_page) }>
                <Icon active type={ data.iconType } name={ data.iconName }/>
                <Text>
                  { I18n.t(`drawer.${data.name}`) }
                </Text>
              </View>
            ) }
          </List>
        </Content>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.list,
    unread: state.notifications.list.filter(not => !not.isRead).length
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotifications: () => dispatch(notificationsActions.fetchNotifications())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar)
