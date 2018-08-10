import { Icon, Left, ListItem, Right, Text, View } from 'native-base'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SECONDARY_COLOR } from './constants'

function SingleChoiceListItem ({ selected = true, onSelect, text }) {
  return (
    <View style={ styles.container }>
      <ListItem noIndent style={ [ styles.listItem, selected ? styles.listItemSelected : '' ] }
                onPress={ () => onSelect() }>
        <Left>
          <Text style={ [ styles.text, selected ? '' : styles.notSelectedText ] }>{ text.toUpperCase() }</Text>
        </Left>
        <Right>
          <Icon
            style={ {
              color: selected ? SECONDARY_COLOR : '#FFF',
              lineHeight: 40,
              height: 40,
              fontSize: 32
            } }
            name={ selected ? 'md-radio-button-on' : 'md-radio-button-off' }
          />
        </Right>
      </ListItem>
    </View>
  )
}

function MultichoiceListItem ({ selected = true, onSelect, text }) {
  return (
    <View style={ styles.container }>
      <ListItem noIndent style={ [ styles.listItem ] } onPress={ () => onSelect() }>
        <Left>
          <Text style={ [ styles.text, selected ? styles.selectedText : '' ] }>{ text.toUpperCase() }</Text>
        </Left>
        <Right>
          <Icon
            style={ {
              color: selected ? SECONDARY_COLOR : '#FFF',
              lineHeight: 40,
              height: 40,
              fontSize: 32
            } }
            name={ selected ? 'md-checkbox' : 'md-square-outline' }
          />
        </Right>
      </ListItem>
    </View>
  )
}

export function FlowListItem ({ selected = false, onSelect, text, multiple = true }) {
  return multiple
    ? <MultichoiceListItem onSelect={ () => onSelect() } text={ text } selected={ selected }/>
    : <SingleChoiceListItem onSelect={ () => onSelect() } text={ text } selected={ selected }/>
}

const styles = EStyleSheet.create({
  container: {
    marginLeft: 8,
    marginRight: 8
  },
  listItem: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 24,
    paddingTop: 24,
  },
  listItemSelected: {
    borderBottomColor: SECONDARY_COLOR,
  },
  text: {
    fontSize: 16,
    color: '#fff'
  },
  selectedText: {
    fontWeight: 'bold'
  },
  notSelectedText: {
    color: '#ccc'
  }
})
