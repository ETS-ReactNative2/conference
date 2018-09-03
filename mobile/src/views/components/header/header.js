import { Text, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, View, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

console.log(Platform.OS)

export class Header extends React.Component {
  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.leftContainer }>
          { this.props.left }
        </View>
        <Text style={ [ styles.title, this.props.titleStyle ] }
              adjustsFontSizeToFit>{ this.props.title.toUpperCase() }</Text>
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
        {...this.props}
        left={
          <Button transparent onPress={ this.props.onMapClick}>
            <Text style={{color: 'white', textDecorationLine: 'underline'}}>Map</Text>
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
        {...this.props}
        left={
          <Button transparent onPress={ this.props.onBack}>
            <Icon style={this.props.iconStyle ? this.props.iconStyle : {color: 'white'}} name='arrow-back' />
          </Button>
        }
      />
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 8,
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftContainer: {
    flex: 1
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  logo: {
    marginRight: 10,
    marginTop:  Platform.OS === 'Android' ? 16 : 0,
    width: 24,
    height: 30
  },
  title: {
    flex: 3,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#4A4A4A',
    fontSize: 16,
    marginTop: 8,
    fontFamily: 'Montserrat-SemiBold'
  }
})

Header.propTypes = {
  left: PropTypes.node,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  rightIconSource: PropTypes.node
}

export default Header
