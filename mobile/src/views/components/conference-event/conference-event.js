import React, { Component } from "react"
import { Linking, View } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { Card, CardItem, Text, Body } from "native-base"
import I18n from "../../../../locales/i18n"
import PropTypes from "prop-types"
import moment from "moment"

class ConferenceEvent extends Component {
  onPersonNameClick = () => {
    Linking.openURL("https://www.blockseoul.com/#Speakers")
  }

  onRoomClick = () => {
    this.props.showImages()
  }

  render() {
    return (
        <Card>
          <CardItem header bordered style={styles.eventHeader}>
            <View style={{flex: 1, alignItems: 'center'}}>
              {this.props.event.rooms.map(singleRoom => <Text onPress={this.onRoomClick} key={`room-${singleRoom}-event-${this.props.event.title}`}>{singleRoom}</Text>)}
            </View>
          </CardItem>
          <CardItem bordered style={styles.eventBodyWrapper}>
            <Body style={styles.eventBody}>
              <View style={styles.textContainer}>
                <Text style={styles.eventTitle}>
                  {this.props.event.title}
                </Text>
              </View>
              {this.props.event.speakers.map(singlePerson => <Text onPress={this.onPersonNameClick} style={styles.person} key={`presenter-${singlePerson}-event-${this.props.event.title}`}>{singlePerson}</Text>)}
            </Body>
          </CardItem>
          <CardItem footer bordered style={styles.eventFooter}>
            <Text style={styles.eventFooterText}>
              {I18n.t("agenda_event.until")} - {moment(this.props.event.endDate, "HH:mm:ss").format("hh:mm A")}
            </Text>
          </CardItem>
        </Card>
    )
  }
}

const styles = EStyleSheet.create({
  eventHeader: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f5f5f5"
  },
  eventFooterText: {
    alignSelf: "center",
    color: "#FFFFFF"
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#5d7eb1"
  },
  eventBodyWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "column"
  },
  eventBody: {
    alignItems: "center"
  },
  textContainer: {
    marginBottom: 20
  },
  eventTitle: {
    color: "#004b8d"
  },
  person: {
    textDecorationLine: 'underline'
  }
})

ConferenceEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
    speakers: PropTypes.arrayOf(PropTypes.string).isRequired,
    endDate: PropTypes.string.isRequired
  }).isRequired,
  showImages: PropTypes.func.isRequired
}

export default ConferenceEvent
