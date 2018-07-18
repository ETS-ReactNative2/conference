import React, { Component } from 'react'
import ConferenceAgenda from '../../components/conference-agenda/conference-agenda'

const exampleConferenceAgenda = [{
    title: 'Luna Conference',
    date: '2018-07-17',
    events: [{
      startDate: '2018-07-17T08:00:05.909Z',
      endDate: '2018-07-17T09:00:05.909Z',
      classes: [{
        title: 'Python course - variables, functions, exceptions, overflow, security',
        location: 'Slack',
        persons: ['Kai Rathmann', 'Some other dev']
      }]
    }, {
      startDate: '2018-07-17T09:05:05.909Z',
      endDate: '2018-07-17T10:15:05.909Z',
      classes: [{
        title: 'This is some crytpocurrency talk, you should join it now before it is too late',
        location: 'Room 432',
        persons: ['Mr Somebody', 'Mr Somebody2']
      }, {
        title: 'Nice classes v2',
        location: 'Room 876',
        persons: ['Ms Somebody']
      }]
    }, {
        startDate: '2018-07-17T10:30:05.909Z',
        endDate: '2018-07-17T12:30:05.909Z',
        classes: [{
          title: 'React Native - builiding cross platform on mobile apps with single framework',
          location: 'Rspective',
          persons: ['Dariusz Górak', 'Andrzej Szmajnta']
        }, {
          title: 'Cryptocurrency 1 on 1 - th easy way',
          location: 'Luna 1',
          persons: ['Mirela', 'Brian', 'Kai']
        }, {
            title: 'Some intresting topic, etc',
            location: 'Luna 2',
            persons: ['Ms Somebody']
          }]
      }, {
        startDate: '2018-07-17T13:00:05.909Z',
        endDate: '2018-07-17T16:30:05.909Z',
        classes: [{
          title: 'Luna - main part',
          location: 'Main room',
          persons: ['Dariusz Górak', 'Andrzej Szmajnta', 'Kai', 'Mirela', 'Brian']
        }]
      }]
  }, {
    title: 'Luna Conference',
    date: '2018-07-18',
    events: [{
      startDate: '2018-07-18T08:00:05.909Z',
      endDate: '2018-07-18T09:00:05.909Z',
      classes: [{
        title: 'Python course - variables, functions, exceptions, overflow, security',
        location: 'Slack',
        persons: ['Kai Rathmann', 'Some other dev']
      }]
    }, {
      startDate: '2018-07-18T09:05:05.909Z',
      endDate: '2018-07-18T10:15:05.909Z',
      classes: [{
        title: 'This is some crytpocurrency talk, you should join it now before it is too late',
        location: 'Room 432',
        persons: ['Mr Somebody', 'Mr Somebody2']
      }, {
        title: 'Nice classes v2',
        location: 'Room 876',
        persons: ['Ms Somebody']
      }]
    }, {
        startDate: '2018-07-18T10:30:05.909Z',
        endDate: '2018-07-18T12:30:05.909Z',
        classes: [{
          title: 'React Native - builiding cross platform on mobile apps with single framework',
          location: 'Rspective',
          persons: ['Dariusz Górak', 'Andrzej Szmajnta']
        }, {
          title: 'Cryptocurrency 1 on 1 - th easy way',
          location: 'Luna 1',
          persons: ['Mirela', 'Brian', 'Kai']
        }, {
            title: 'Some intresting topic, etc',
            location: 'Luna 2',
            persons: ['Ms Somebody']
          }]
      }, {
        startDate: '2018-07-18T13:00:05.909Z',
        endDate: '2018-07-18T16:30:05.909Z',
        classes: [{
          title: 'Luna - main part',
          location: 'Main room',
          persons: ['Dariusz Górak', 'Andrzej Szmajnta', 'Kai', 'Mirela', 'Brian']
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