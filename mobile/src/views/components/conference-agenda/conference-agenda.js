import React, { Component } from "react"
import PropTypes from "prop-types"
import {ScrollView } from 'react-native'
import ConferenceDay from "../../components/conference-day/conference-day"

class ConferenceAgenda extends Component {
  render() {
    return (
      <ScrollView>
        {this.props.days.map(singleConferenceDay => {
          return (
            <ConferenceDay
              key={`confernece-day-${singleConferenceDay.date}`}
              day={singleConferenceDay}
            />
          )
        })}
      </ScrollView>
    )
  }
}

ConferenceAgenda.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          startDate: PropTypes.string.isRequired,
          endDate: PropTypes.string.isRequired,
          classes: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              location: PropTypes.string.isRequired,
              persons: PropTypes.arrayOf(PropTypes.string).isRequired
            })
          )
        })
      )
    })
  ).isRequired
}

export default ConferenceAgenda
