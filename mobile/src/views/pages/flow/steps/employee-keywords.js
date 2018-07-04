import { Button, Card, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Chip, Selectize } from 'react-native-material-selectize'
import I18n from '../../../../../locales/i18n'

const items = [
  { id: 1, text: 'React' },
  { id: 2, text: 'Ad Words' },
  { id: 3, text: 'Blockchain' },
  { id: 4, text: 'Shrimps' }
]

class EmployeeKeywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: -1
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.employee.keyword.title') }</Text>
        <Selectize
          items={ items }
          label={ I18n.t('flow_page.employee.keyword.title') }
          textInputProps={{
            placeholder: I18n.t('flow_page.employee.keyword.placeholder')
          }}
          renderRow={ (id, onPress, item) => (
            <ListItem style={ styles.listRow } key={ id } onPress={ onPress }>
              <Text>{ item.text }</Text>
            </ListItem>
          ) }
          renderChip={ (id, onClose, item, style, iconStyle) => (
            <Chip
              key={ id }
              iconStyle={ iconStyle }
              onClose={ onClose }
              text={ item.text }
              style={ style }
            />
          ) }
        />
        <Button success
                rounded
                block
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleSubmit = () => {
    this.props.onFill(this.state)
  }
  handleChange = (index) => {
    this.setState({
      selected: index
    })
  }
}

const styles = StyleSheet.create({
  chip: {
    paddingRight: 2
  },
  chipIcon: {
    height: 24,
    width: 24
  },
  list: {
    backgroundColor: '#fff'
  },
  listRow: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  listWrapper: {
    flexDirection: 'row'
  },
  listIcon: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    height: 40,
    width: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  listInitials: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff'
  },
  listNameText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 21
  },
  listEmailText: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 14,
    lineHeight: 21
  }
})

EmployeeKeywords.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default EmployeeKeywords
