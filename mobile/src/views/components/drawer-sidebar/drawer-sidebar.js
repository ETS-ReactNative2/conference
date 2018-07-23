import { Badge, Container, Content, Icon, Left, List, ListItem, Right, Text } from 'native-base'
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
  }
]

class DrawerSideBar extends Component {

  componentDidMount () {
    this.props.fetchNotifications()
  }

  render () {
    const dupa = this.props.unread.length
    console.log({ dupa })
    return (
      <Container>
        <Content>
          <List>
            { routes.map(data =>
              <ListItem
                key={ data.name }
                button
                onPress={ () => this.props.navigation.navigate(data.navigation_page) }>
                <Left>
                  <Icon active type={ data.iconType } name={ data.iconName }/>
                </Left>
                <Text>{ I18n.t(`drawer.${data.name}`) }</Text>
                <Right>
                  { data.badge && <Badge><Text>{ this.props[ data.badgeValueProps ] }</Text></Badge> }
                </Right>
              </ListItem>
            ) }
          </List>
        </Content>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerSideBar)
