import { Button, Icon, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, Platform, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'


export class Header extends React.Component {
  render () {
    console.log(this.props.background)
    return (
      <View style={ [styles.container, this.props.background ? { backgroundColor: this.props.background } : null ] }>
        <View style={ styles.leftContainer }>
          { this.props.left }
        </View>
        <View style={ styles.titleContainer }>
          <Text style={ [ styles.title, this.props.titleStyle ] }
                adjustsFontSizeToFit>{ this.props.title.toUpperCase() }</Text>
        </View>
        <View style={ styles.logoContainer }>
          <Image style={ styles.logo } source={ this.props.rightIconSource }/>
        </View>
      </View>
    )
  }
}

export class MapHeader extends React.Component {
  render () {
    return (
      <Header
        { ...this.props }
        left={
          <Button transparent onPress={ this.props.onMapClick }>
            <Text style={ { color: 'white', textDecorationLine: 'underline' } }>Map</Text>
          </Button>
        }
      />
    )
  }
}

export class NavigationHeader extends React.Component {
  render () {
    return (
      <Header
        { ...this.props }
        left={
          <Button transparent onPress={ this.props.onBack }>
            <Icon style={ this.props.iconStyle ? this.props.iconStyle : { color: 'white' } } name='arrow-back'/>
          </Button>
        }
      />
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    height: 48,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: Platform.OS === 'android' ? 24 : 0
  },
  leftContainer: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  logo: {
    marginRight: 10,
    width: 24,
    height: 32
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    textAlign: 'center',
  }
})

Header.propTypes = {
  left: PropTypes.node,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  rightIconSource: PropTypes.node
}

export default Header
