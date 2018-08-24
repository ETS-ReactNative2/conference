import { Button, Container, Left, Body, Right, ListItem, Text, View } from 'native-base';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Flag from 'react-native-flags';
import PropTypes from 'prop-types';
import { BLUE_BACKGROUND_COLOR } from '../../design/constants';
import EStyleSheet from 'react-native-extended-stylesheet';

class LocationPage extends Component {
  render () {
    const type = this.props.navigation.getParam('type', {});

    const countryArray = [
      { code: 'KR', text: 'KOREA' },
      { code: 'CN', text: 'CHINA' },
      { code: 'ES', text: 'SPAIN' },
      { code: 'NL', text: 'NETHERLAND' },
      { code: 'IT', text: 'ITALY' }
    ];
    const headerText = type === 'company' 
      ? 'Where is your company located?'
      : 'What is your nationality?';
    
    return (
      <Container style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{ headerText }</Text>
          </View>
          <View style={styles.countryList}>
            {
              countryArray.map((item, index) => 
                <LocationItem keys={index} countryCode={item.code} countryName={item.text} />
              )
            }
          </View>
          <Button style={styles.saveButton}>
            <Text style={styles.captionButton}>SAVE</Text>
          </Button>
        </ScrollView>
      </Container>
    )
  }
}

LocationItem = ({ countryCode, countryName, value }) => {
  return(
    <ListItem style={styles.countryItem}>
      <View style={styles.flagContainer}>
        <Flag code={countryCode} style={styles.flag} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.countryLabel}>{countryName}</Text>
      </View>
      <View>
      </View>
    </ListItem>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE_BACKGROUND_COLOR,
    padding: 5
  },
  scrollView: {
    flex: 1,
    textAlign: 'center'
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    width: 200,
    textAlign: 'center'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15
  },
  flag: {
    width: 28,
    height: 28
  },
  countryLabel: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 14,
    marginLeft: 10
  },
  countryItem: {
    height: 90,
    paddingLeft: 16,
    paddingRight: 26,
    marginLeft: 0,
    marginRight: 0
  },
  flagContainer: {
    width: 28
  },
  saveButton: {
    flex: 1,
    width: '100%',
    height: 72,
    backgroundColor: '#fff',
    borderRadius: 0
  },
  captionButton: {
    width: '100%',
    color: '#000',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default LocationPage
