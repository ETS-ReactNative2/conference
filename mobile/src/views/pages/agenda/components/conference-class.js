import moment from 'moment'
import { Button, Icon } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { AGENDA_EXPANDED_COLOR, BAR_COLOR, BLUE_BACKGROUND_COLOR } from '../../../design/constants'

export class ConferenceClass extends React.Component {

  state = {
    expanded: false
  }

  render () {
    const { clazz, startDate } = this.props
    const { endDate, rooms, speakers, title, label, description } = clazz

    return (
      <React.Fragment>
        <View style={ styles.classContainer }>
          <View style={ this.state.expanded ? styles.generalInfoExpanded: styles.generalInfo }>
            <View style={ styles.leftInfo }>
              <View style={ styles.firstLine }>
                <Text style={ styles.dateText }>{ `${formatTime(startDate)} - ${formatTime(endDate)}` }</Text>
                <Text ellipsizeMode={ 'tail' } numberOfLines={ 1 }
                      style={ styles.roomText }>{ rooms.length !== 0 ? rooms[ 0 ] : 'None' }</Text>
              </View>
              <Text style={ styles.title }>{ title }</Text>
              { label !== title &&
                <Text style={ styles.labelText }>{ label }</Text>
              }
            </View>
            { description && (
              <Button transparent={true} onPress={ () => this.setState({ expanded: !this.state.expanded }) }>
                <Icon style={{ color: 'white'}} name={this.state.expanded ? 'arrow-up' : 'arrow-down'}/>
              </Button>
            ) }
          </View>
          { description && this.state.expanded && (
            <View style={ styles.descriptionContainer }>
              <Text style={ { color: 'white' } }>{ description }</Text>
            </View>
          ) }
        </View>
      </React.Fragment>
    )
  }
}

function formatTime (date) {
  return moment(date, 'HH:mm:ss').format('h:mm A')
}

const styles = EStyleSheet.create({
  classContainer: {
    marginLeft: 8,
    marginRight: 8,
  },
  generalInfo: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    borderBottomColor: 'rgba(255,255,255,.5)',
    borderBottomWidth: 1
  },
  generalInfoExpanded: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: AGENDA_EXPANDED_COLOR,
    flexDirection: 'row',
    borderBottomColor: 'rgba(255,255,255,.5)',
    borderBottomWidth: 1
  },
  leftInfo: {
    flex: 1
  },
  descriptionContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: AGENDA_EXPANDED_COLOR
  },
  firstLine: {
    flexDirection: 'row'
  },
  dateText: {
    fontWeight: 'bold',
    color: BAR_COLOR,
    fontSize: 16,
  },
  roomText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    color: 'rgba(255,255,255,.5)'
  },
  labelText: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(255,255,255,.5)'
  },
  title: {
    fontSize: 14,
    marginTop: 8,
    color: 'white'
  }
})
