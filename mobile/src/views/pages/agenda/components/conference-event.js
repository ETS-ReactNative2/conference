import moment from 'moment'
import React from 'react'
import { SmallSubheader } from '../../../design/subheader'
import { ConferenceClass } from './conference-class'

export function ConferenceEvent ({ event }) {
  const { startDate, classes } = event

  return (
    <React.Fragment>
      <SmallSubheader text={ formatTime(startDate) }/>
      {
        classes.map((cl, index) => (
          <ConferenceClass startDate={ startDate } clazz={ cl } key={ `${startDate}:${index}` }/>
        ))
      }
    </React.Fragment>
  )
}

function formatTime (date) {
  return moment(date, 'HH:mm:ss').format('h:mm A')
}
