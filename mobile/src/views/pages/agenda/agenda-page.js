import { Button, Icon, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Modal, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Gallery from 'react-native-image-gallery'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import FirstFloor from '../../../assets/images/maps/first-floor.jpg'
import Rooftop from '../../../assets/images/maps/rooftop.jpg'
import SecondFloor from '../../../assets/images/maps/second-floor.png'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { MapHeader } from '../../components/header/header'
import LunaSpinner from '../../components/luna-spinner/luna-spinner'
import { ImagePageContainer } from '../../design/image-page-container'
import { ConferenceEvent } from './components/conference-event'
import { DateTab } from './components/date-tab'

const secondImagesConfig = [
  {
    caption: I18n.t('agenda_page.maps.first_floor'),
    source: FirstFloor,
    dimensions: { width: 842, height: 595 }
  },
  {
    caption: I18n.t('agenda_page.maps.second_floor'),
    source: SecondFloor,
    dimensions: { width: 1045, height: 596 }
  },
  {
    caption: I18n.t('agenda_page.maps.rooftop'),
    source: Rooftop,
    dimensions: { width: 960, height: 720 }
  }
]

class AgendaPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showingImages: false,
      currentImageIndex: 0,
      selected: 0
    }
  }

  hideModal = () => {
    this.setState({ showingImages: false })
  }

  onShowImagesCallback = () => {
    this.setState({ showingImages: true })
  }

  onChangeImage = (index) => {
    this.setState({ currentImageIndex: index })
  }

  imageCaption = () => {
    const { currentImageIndex } = this.state
    return (
      <View style={ {
        bottom: 0,
        height: 65,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center'
      } }>
        <Text style={ {
          textAlign: 'center',
          color: 'white',
          fontSize: 24
        } }>{ (secondImagesConfig[ currentImageIndex ] && secondImagesConfig[ currentImageIndex ].caption) || '' } </Text>
      </View>
    )
  }

  imageHeader = () => {
    const { currentImageIndex } = this.state
    return (
      <View style={ styles.imageHeaderContainer }>
        <Button
          transparent
          onPress={ this.hideModal }
          style={ styles.imageCloseButton }>
          <Icon type="Entypo" style={ styles.imageCloseIcon } name='cross'/>
        </Button>
        <Text style={ styles.imageHeaderCounter }>{ currentImageIndex + 1 } / { secondImagesConfig.length }</Text>
      </View>
    )
  }

  render () {
    const { isLoading, error, agenda } = this.props
    const { showingImages } = this.state
    let days = []

    if (isLoading) {
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

    if (!error) {
      const [ talks = { days: [] } ] = agenda
      days = talks.days
    }

    return (
      <ImagePageContainer>
        <Modal visible={ showingImages } transparent onRequestClose={ this.hideModal }>
          <View style={ { flex: 1 } }>
            <Gallery
              style={ { flex: 1, backgroundColor: 'black' } }
              images={ secondImagesConfig }
              initialPage={ 0 }
              onPageSelected={ this.onChangeImage }/>
            { this.imageHeader() }
            { this.imageCaption() }
          </View>
        </Modal>
        <View style={ { flex: 1 } }>
          <View style={ styles.content }>
            <View style={ { backgroundColor: 'transparent' } }>
              <MapHeader
                onMapClick={ this.onShowImagesCallback }
                title={ I18n.t('agenda_page.title') }
                rightIconSource={ WhiteLogo }/>
            </View>
            <View style={ styles.tabContainer }>
              { days.map((day, index) => (
                <DateTab selected={ index === this.state.selected } date={ day.date }
                         onClick={ () => this.setState({ selected: index }) } key={ index }/>
              )) }
            </View>
            <ScrollView>
              {
                days.length !== 0 && days[ this.state.selected ].events.map((event, index) => (
                  <ConferenceEvent key={ `${this.state.selected}:${index}`} event={ event }/>
                ))
              }
              {
                days.length === 0 && (
                  <Text style={ { color: 'white', textAlign: 'center' } }>{ I18n.t('agenda_page.no_agenda') }</Text>
                )
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
    justifyContent: 'center',
    paddingBottom: 8
  },
  imageHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 16,
    top: 0,
    height: 65,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    alignItems: 'center'
  },
  imageCloseButton: {
    alignSelf: 'center',
    marginTop: 10
  },
  imageHeaderCounter: {
    marginLeft: 'auto',
    marginRight: 12,
    marginTop: 12,
    color: 'white',
    fontSize: 24
  },
  imageCloseIcon: {
    fontSize: 24,
    color: 'white'
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
