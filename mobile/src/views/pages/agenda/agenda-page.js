import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { scheduleActions } from '../../../schedule'
import ConferenceAgenda from '../../components/conference-agenda/conference-agenda'
import ErrorMessage from '../../components/error-message/error-message'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'

class AgendaPage extends Component {
  componentDidMount () {
    this.props.fetchConferenceAgenda()
  }

  render () {
    const { isLoading, error, agenda, fetchAgenda } = this.props

    if (isLoading) {
      return <LunaSpinner/>
    }
    if (error) {
      return (
        <ErrorMessage
          message={ 'Something went wrong' }
          onRetry={ fetchAgenda }/>
      )
    }
    return <ConferenceAgenda sections={ agenda }/>
  }
}

AgendaPage.propTypes = {
  fetchAgenda: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    agenda: state.schedule.schedule,
    isLoading: state.schedule.isLoading,
    error: state.schedule.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchConferenceAgenda: () => dispatch(scheduleActions.fetchConferenceSchedule())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaPage)
