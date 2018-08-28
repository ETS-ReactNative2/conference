import { Text, Thumbnail, View } from 'native-base'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import { getUrl } from '../../../../common/fake-randomizer'

export const ProjectItem = ({ project, onMark, onClick }) => {
  const portraitPlaceholderUri = getUrl()
  const firstName = project.name
  const moneyRange = project.fundraisingAmount

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
      <View style={ styles.listItem }>
        <View style={ { flex: 1, justifyContent: 'center', alignContent: 'center' } }>
          <Thumbnail square large style={ styles.portrait } source={ { uri: portraitPlaceholderUri } }/>
          { /*<Flag style={ styles.countryFlag } code={ project.nationality }/>*/ }
        </View>
        <View style={ { flex: 2, justifyContent: 'center' } }>
          <Text style={ styles.largeText }>{ `${firstName}` }</Text>
          <Text style={ styles.normalText }>{ `\$${moneyRange}` }</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = EStyleSheet.create({
  listItem: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: 80,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  portrait: {
    width: 50,
    height: 50,
    margin: 15,
    borderRadius: 4
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 11,
    marginLeft: 16,
    marginRight: 18
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 11,
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginRight: 18,
    marginBottom: 11
  },
  normalText: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    textAlign: 'left'
  },
  largeText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textAlign: 'left',
    marginBottom: 4
  },
  underline: {
    textDecorationLine: 'underline'
  },
  comment: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Helvetica',
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center'
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
