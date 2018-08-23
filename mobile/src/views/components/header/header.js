import { Text, Button, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

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

export class NavigationHeader extends React.Component {
  render () {
    return (
      <Header
        {...this.props}
        left={
          <Button transparent onPress={ this.props.onBack}>
            <Icon style={{color: 'white'}} name='arrow-back' />
          </Button>
        }
      />
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftContainer: {
    flex: 1
  },
  logoContainer: {
    flex: 1, alignItems: 'flex-end'
  },
  logo: {
    marginRight: 10
  },
  title: {
    flex: 2,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#4A4A4A',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold'
  }
})

Header.propTypes = {
  left: PropTypes.node,
  title: PropTypes.string.isRequired,
  titleStyle: PropTypes.any,
  rightIconSource: PropTypes.node.isRequired
}

export default Header
