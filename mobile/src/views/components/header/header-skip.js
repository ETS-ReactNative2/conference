import { Button, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import { BAR_COLOR } from '../../design/constants'
import Header from './header'

export class HeaderSkip extends React.Component {
  render () {
    return (
      <Header { ...this.props } left={
        <Button transparent onPress={ this.props.onSkipClick }>
          <Text style={ styles.skip }>{ I18n.t('header.skip') }</Text>
        </Button>
      } />
    )
  }
}

const styles = EStyleSheet.create({
  skip: {
    fontFamily: 'Montserrat-SemiBold',
    textDecorationLine: 'underline',
    color: BAR_COLOR
  }
})

HeaderSkip.propTypes = {
  onSkipClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  rightIconSource: PropTypes.node.isRequired
}

export default HeaderSkip
