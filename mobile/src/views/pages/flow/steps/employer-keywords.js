import { Button, Card, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Chip, Selectize } from 'react-native-material-selectize'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { EmployerJob } from './index'

const items = [
  { id: 1, text: 'React' },
  { id: 2, text: 'Ad Words' },
  { id: 3, text: 'Blockchain' },
  { id: 4, text: 'Shrimps' }
]

class EmployerKeywords extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedItems: this.props.employer.keywords
    }
    this.state.isFormValid = this.isFormValid()
  }

  onChipAdded = (chipToAdd, callBack) => {
    const itemsCopy = [ ...this.state.selectedItems ]
    itemsCopy.push(chipToAdd)
    this.setState({ selectedItems: itemsCopy })
    // passing true to callback let's library add item to list of selected items
    callBack(true)
  }

  onChipRemoved = (chipToRemove, callBack) => {
    const itemsCopy = [ ...this.state.selectedItems ]
    const idOfChipToRemove = chipToRemove.id
    const filteredChips = itemsCopy.filter(singleChip => singleChip.id !== idOfChipToRemove)
    this.setState({ selectedItems: filteredChips })
    // passing true to callback allows library to remove items from list of selected items
    callBack(true)
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.employer.keyword.title') }</Text>
        <Selectize
          selectedItems={ this.state.selectedItems }
          items={ items }
          label={ I18n.t('flow_page.employer.keyword.title') }
          textInputProps={ {
            placeholder: I18n.t('flow_page.employer.keyword.placeholder')
          } }
          renderRow={ (id, onPress, item) => (
            <ListItem style={ styles.listRow } key={ id } onPress={ () => this.onChipAdded(item, onPress) }>
              <Text>{ item.text }</Text>
            </ListItem>
          ) }
          renderChip={ (id, onClose, item, style, iconStyle) => (
            <Chip
              key={ id }
              iconStyle={ iconStyle }
              onClose={ () => this.onChipRemoved(item, onClose) }
              text={ item.text }
              style={ style }
            />
          ) }
        />
        <Button success
                rounded
                block
                disabled={ !this.state.isFormValid }
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  isFormValid = () => {
    return true
  }

  handleSubmit = () => {
    this.props.save({
      keywords: this.state.selectedItems
    })
    this.props.onFill({
      nextStep: EmployerJob
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

EmployerKeywords.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    employer: state.signUp.employer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: employerInfo => dispatch(signUpActions.saveProfileEmployer(employerInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerKeywords)
