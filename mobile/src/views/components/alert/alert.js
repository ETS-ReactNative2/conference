import { Button, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Platform, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../locales/i18n'

export class Alert extends React.Component {

  getContainerStyle (type) {
    const stylesMapping = {
      'success': styles.success,
      'error': styles.error
    }
    const stylesArray = [ styles.container ]
    if (stylesMapping[ type ]) {
      stylesArray.push(stylesMapping[ type ])
    }
    return stylesArray
  }

  render () {
    return (
      <View style={ this.getContainerStyle(this.props.type) }>
        <View style={ styles.textWrapper }>
          { this.props.type === 'error' && (
            <Text style={ [ styles.prefix, styles.errorPrefix ] }>
              { I18n.t('alert.error_prefix') }
            </Text>
          ) }
          { this.props.type === 'success' && (
            <Text style={ [ styles.prefix, styles.text ] }>
              { I18n.t('alert.success_prefix') }
            </Text>
          ) }
          <Text style={ styles.text }>
            { this.props.message }
          </Text>
        </View>
        <Button bordered onPress={ this.props.onButtonClick } style={ styles.button }>
          <Text>OK</Text>
        </Button>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: Platform.OS === 'ios' ? 24 : 8,
    paddingBottom: 8,
    width: '100%'
  },
  success: {
    backgroundColor: '#0D9570'
  },
  error: {
    backgroundColor: '#CE2860'
  },
  text: {
    fontFamily: 'Montserrat-ExtraLight',
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
    flex: 1
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  prefix: {
    marginRight: 5,
    fontSize: 14
  },
  errorPrefix: {
    fontWeight: 'bold',
    color: 'white'
  },
  button: {
    marginTop: 20,
    alignSelf: 'center',
    borderColor: 'white',
    height: 50
  }
})

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([ 'error', 'success' ]).isRequired,
  onButtonClick: PropTypes.func.isRequired
}

export default Alert
