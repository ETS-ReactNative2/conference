import React, { Component } from "react"
import PropTypes from "prop-types"
import { ScrollView, View } from 'react-native'
import { Text } from 'native-base'
import EStyleSheet from "react-native-extended-stylesheet"
import ConferenceDay from "../../components/conference-day/conference-day"

class ConferenceAgenda extends Component {

  renderSectionHeader(sectionTitle) {
    return (
      <Text style={styles.sectionHeader} adjustsFontSizeToFit>
        {sectionTitle}
      </Text>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.props.sections.map(singleSection => {
          return (
            <React.Fragment key={`section-${singleSection.title}`}>
              <View style={styles.sectionHeaderContainer}>{this.renderSectionHeader(singleSection.title)}</View>
              {singleSection.days.map(singleDayInSection => {
                return (
                  <ConferenceDay key={`section-${singleSection.title}-date-${singleDayInSection.date}`} day={singleDayInSection} showImages={this.props.showImages} />
                )
              })}
            </React.Fragment>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  sectionHeaderContainer: {
    alignSelf: "center"
  },
  sectionHeader: {
    marginTop: "1rem",
    fontSize: "1rem"
  }
})

ConferenceAgenda.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      days: PropTypes.arrayOf(
        PropTypes.shape({
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
      ).isRequired
    }).isRequired
  ).isRequired,
  showImages: PropTypes.func.isRequired
}

export default ConferenceAgenda
