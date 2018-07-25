import React, { Component } from "react"
import { ScrollView, View } from "react-native"
import moment from "moment"
import PropTypes from "prop-types"
import { Text } from "native-base"
import EStyleSheet from "react-native-extended-stylesheet"
import I18n from "../../../../locales/i18n"
import ConferenceEventsBlock from "../conference-events-block/conference-events-block"

class ConferenceDay extends Component {
  renderDayHeader() {
    const momentDate = moment(this.props.day.date)
    const day = momentDate.date()
    const month = momentDate.month()
    const year = momentDate.year()
    return (
      <Text style={styles.dayHeader} adjustsFontSizeToFit>
        {I18n.t(`common.months.${month}`).toUpperCase()} {day}, {year}
      </Text>
    )
  }

  renderDayEvents() {
    const events = this.props.day.events
    return events.map(singleEvent => {
      return (
        <View key={`row-event-${singleEvent.startDate}`}>
          <ConferenceEventsBlock event={singleEvent} />
        </View>
      )
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.dayHeaderContainer}>{this.renderDayHeader()}</View>
        {this.renderDayEvents()}
      </ScrollView>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  dayHeaderContainer: {
    alignSelf: "center"
  },
  dayHeader: {
    marginTop: "1rem",
    fontSize: "1rem"
  }
})

ConferenceDay.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        classes: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
            speakers: PropTypes.arrayOf(PropTypes.string).isRequired,
            endDate: PropTypes.string.isRequired
          }).isRequired
        ).isRequired
      }).isRequired
    ).isRequired
  }).isRequired
}

export default ConferenceDay