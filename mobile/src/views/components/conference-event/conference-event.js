import React, { Component } from 'react'
import { View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Content, Card, CardItem, Text, Body } from 'native-base'
import I18n from '../../../../locales/i18n'
import PropTypes from 'prop-types'

class ConferenceEvent extends Component {
  render() {
    return (
      <View>
        <Content>
          <Card>
            <CardItem header bordered style={styles.eventHeader}>
              <Text>{this.props.event.location}</Text>
            </CardItem>
            <CardItem bordered>
              <Body style={styles.eventBody}>
                <View style={styles.textContainer}>
                    <Text style={styles.eventTitle}>
                        {this.props.event.title.toUpperCase()}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text>
                        {this.props.event.person}
                    </Text>
                </View>
              </Body>
            </CardItem>
            <CardItem footer bordered style={styles.eventFooter}>
              <Text style={styles.eventFooterText}>{I18n.t('agenda_event.until')} - {this.props.event.endDate}</Text>
            </CardItem>
          </Card>
        </Content>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
    eventHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5' 
    },
    eventFooterText: {
        alignSelf: 'center',
        color: '#FFFFFF'
    },
    eventFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#5d7eb1'
    },
    eventBody: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    textContainer: {
        marginBottom: 20
    },
    eventTitle: {
        color: '#004b8d'
    }
});

ConferenceEvent.propTypes = {
    event: PropTypes.shape({
        endDate: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        person: PropTypes.string.isRequired
    }).isRequired
}

export default ConferenceEvent