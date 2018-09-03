import { Icon, Left, ListItem, Right, Switch, Text, View } from 'native-base'
import React from 'react'
import { Image } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import RadioEmpty from '../../assets/icons/radio-empty.png'
import RadioFilled from '../../assets/icons/radio-filled.png'
import CheckboxEmpty from '../../assets/icons/checkbox-empty.png'
import CheckboxFilled from '../../assets/icons/checkbox-filled.png'
import { SECONDARY_COLOR } from './constants'

class SingleChoiceListItem extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.selected !== this.props.selected
  }

  render () {
    const { selected = true, onSelect, text } = this.props
    return (
      <View style={ styles.container }>
        <ListItem noIndent style={ [ styles.listItem, selected ? styles.listItemSelected : '' ] }
                  onPress={ () => onSelect() }>
          <Left>
            <Text style={ [ styles.text, selected ? '' : styles.notSelectedText ] }>{ text.toUpperCase() }</Text>
          </Left>
          <Right>
            <Image style={{width: 20, height: 20}} source={ selected ? RadioFilled : RadioEmpty }/>
          </Right>
        </ListItem>
      </View>
    )
  }
}

class MultichoiceListItem extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.selected !== this.props.selected
  }

  render () {
    const { selected = true, onSelect, text } = this.props
    return (
      <View style={ styles.container }>
        <ListItem noIndent style={ [ styles.listItem ] } onPress={ () => onSelect() }>
          <Left>
            <Text style={ [ styles.text, selected ? styles.selectedText : '' ] }>{ text.toUpperCase() }</Text>
          </Left>
          <Right>
            <Image style={{width: 20, height: 20}} source={ selected ? CheckboxFilled : CheckboxEmpty }/>
          </Right>
        </ListItem>
      </View>
    )
  }
}

export class FlowListItem extends React.Component {

  shouldComponentUpdate = (nextProps) => {
    return nextProps.selected !== this.props.selected
  }

  render () {
    const { selected = false, onSelect, text, multiple = true } = this.props
    return multiple
      ? <MultichoiceListItem onSelect={ () => onSelect() } text={ text } selected={ selected }/>
      : <SingleChoiceListItem onSelect={ () => onSelect() } text={ text } selected={ selected }/>
  }
}

export class FlowListSwitch extends React.Component {

  render () {
    const { selected = false, onToggle, text = '', switchText = '' } = this.props
    return (
      <View style={ styles.container }>
        <ListItem noIndent style={ [ styles.switchListItem ] } onPress={ () => onToggle() }>
          <Left style={ { flex: 1 } }>
            <Text style={ [ styles.text, { fontWeight: 'bold' } ] }>{ text.toUpperCase() }</Text>
          </Left>
          <Right style={ { flex: 1, flexDirection: 'row', alignContent: 'flex-end', justifyContent: 'flex-end' } }>
            <Text style={ styles.switchTextStyle }>{ switchText.toUpperCase() }</Text>
            <Switch
              onValueChange={ () => onToggle() } onTintColor={ SECONDARY_COLOR } style={ styles.switch }
              value={ selected }/>
          </Right>
        </ListItem>
      </View>
    )
  }
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
  switchListItem: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 16,
    paddingTop: 16,
  },
  switch: {
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 8
  },
  switchTextStyle: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
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
