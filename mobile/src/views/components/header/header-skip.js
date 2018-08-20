import { Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'
import Header from './header'

export class HeaderSkip extends React.Component {
  render () {
    return (
      <Header { ...this.props } left={
        <Text style={ styles.skip }
              onPress={ () => this.props.onSkipClick() }>{ I18n.t('header.skip') }
        </Text>
      }>
      </Header>
    )
  }
}

const styles = EStyleSheet.create({
  skip: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#00FFC0',
    marginLeft: 10
  }
})

HeaderSkip.propTypes = {
  onSkipClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  rightIconSource: PropTypes.node.isRequired
}

export default HeaderSkip
