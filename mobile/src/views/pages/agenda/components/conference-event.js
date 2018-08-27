import moment from 'moment'
import React from 'react'
import { Subheader } from '../../../design/subheader'
import { ConferenceClass } from './conference-class'

export function ConferenceEvent ({ event }) {
  const { startDate, classes } = event

  return (
    <React.Fragment>
      <Subheader text={ formatTime(startDate) }/>
      {
        classes.map((cl, index) => (
          <ConferenceClass startDate={ startDate } clazz={ cl } key={ index }/>
        ))
      }
    </React.Fragment>
  )
}

function formatTime (date) {
  return moment(date, 'HH:mm:ss').format('h:mm A')
}
