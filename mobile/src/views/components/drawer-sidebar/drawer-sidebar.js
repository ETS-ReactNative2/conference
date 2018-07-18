import React, { Component } from "react"
import { Text, Container, Left, List, ListItem, Content, Icon } from "native-base"
import I18n from "../../../../locales/i18n"

const routes = [
  {
    name: "agenda",
    navigation_page: 'AGENDA_PAGE',
    iconType: 'FontAwesome',
    iconName: 'calendar'
  }
];

class DrawerSideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.navigation_page)}
                >
                  <Left>
                    <Icon active type={data.iconType} name={data.iconName}/>
                  </Left>
                  <Text>{I18n.t(`drawer.${data.name}`)}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default DrawerSideBar;
