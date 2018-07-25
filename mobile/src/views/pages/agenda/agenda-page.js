import React, { Component } from 'react'
import { connect } from 'react-redux'
import { scheduleActions } from '../../../schedule'
import ConferenceAgenda from '../../components/conference-agenda/conference-agenda'

class AgendaPage extends Component {
  componentDidMount() {
    this.props.fetchConferenceAgenda()
  }
  render() {
    return (
      <React.Fragment>
        {!this.props.isLoading && !this.props.isError && (
          <ConferenceAgenda sections={this.props.agendaSchedule}/>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.schedule.isLoading,
    isError: state.schedule.isError,
    agendaSchedule: state.schedule.schedule,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchConferenceAgenda: () => dispatch(scheduleActions.fetchConferenceSchedule())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPage)