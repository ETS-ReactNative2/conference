import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'

import { scheduleActions } from '../../../schedule'
import ConferenceAgenda from '../../components/conference-agenda/conference-agenda'
import ErrorMessage from '../../components/error-message/error-message'
import Header from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { ImagePageContainer } from '../../design/image-page-container'
import { ConferenceEvent } from './components/conference-event'
import { DateTab } from './components/date-tab'

class AgendaPage extends Component {

  state = {
    selected: 0
  }

  componentDidMount () {
    this.props.fetchConferenceAgenda()
  }

  render () {
    const { isLoading, error, agenda, fetchAgenda } = this.props

    if (isLoading || agenda.length === 0) {
      return (
        <ImagePageContainer>
          <View style={ { flex: 1 } }>
            <View style={ styles.content }>
              <LunaSpinner/>
            </View>
          </View>
        </ImagePageContainer>
      )
    }
    if (error) {
      return (
        <ErrorMessage
          message={ 'Something went wrong' }
          onRetry={ fetchAgenda }/>
      )
    }

    const [ talks ] = agenda
    const { days } = talks

    return (
      <ImagePageContainer>
        <View style={ { flex: 1 } }>
          <View style={ styles.content }>
            <ScrollView>
              <View style={ { backgroundColor: 'transparent' } }>
                <Header title={ I18n.t('agenda_page.title') }
                        titleStyle={ { color: 'white', marginTop: 8 } }
                        rightIconSource={ WhiteLogo }/>
              </View>
              <View style={styles.tabContainer}>
              {days.map((day, index) => (
                <DateTab selected={index === this.state.selected} date={day.date} onClick={() => this.setState({selected: index})} key={index}/>
              ))}
              </View>
              {
                days[this.state.selected].events.map((event,  index) => (
                  <ConferenceEvent key={index} event={event}/>
                ))
              }
            </ScrollView>
          </View>
        </View>
      </ImagePageContainer>
    )
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1,
  paddingBottom: 49
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

AgendaPage.propTypes = {
  fetchConferenceAgenda: PropTypes.func.isRequired,
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
