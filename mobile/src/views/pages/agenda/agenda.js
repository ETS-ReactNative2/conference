import React, { Component } from 'react'
import ConferenceAgenda from '../../components/conference-agenda/conference-agenda'

const exampleConferenceAgenda = [{
    title: 'Luna Conference',
    date: '2018-07-17',
    events: [{
      startDate: '2018-07-17T08:00:05.909Z',
      endDate: '2018-07-17T09:00:05.909Z',
      classes: [{
        title: 'Some Long testtttttttttt string to check, well some more also also',
        location: 'Class A4',
        person: 'Mr Somebody'
      }]
    }, {
      startDate: '2018-07-17T09:05:05.909Z',
      endDate: '2018-07-17T10:15:05.909Z',
      classes: [{
        title: 'This is some crytpocurrency talk, you should join it now before it is too late',
        location: 'Class A1',
        person: 'Ms Somebody'
      }, {
        title: 'Nice classes v2',
        location: 'Class A3',
        person: 'Ms Somebody'
      }]
    }, {
        startDate: '2018-07-17T15:05:05.909Z',
        endDate: '2018-07-17T16:15:05.909Z',
        classes: [{
          title: 'Later 1 hahaha shshs wewe sjsjsj asdad',
          location: 'Class A1',
          person: 'Ms Somebody'
        }, {
          title: 'Later 2',
          location: 'Class A3',
          person: 'Ms Somebody'
        }, {
            title: 'Later 3',
            location: 'Class A1',
            person: 'Ms Somebody'
          }, {
            title: 'Later 4',
            location: 'Class A3',
            person: 'Ms Somebody'
          }]
      }]
  }]

class Agenda extends Component {
    render() {
        return (
            <ConferenceAgenda days={exampleConferenceAgenda} />
        )
    }
}

export default Agenda