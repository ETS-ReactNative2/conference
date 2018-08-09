import { Text } from 'native-base'
import React from 'react'
import PropTypes from "prop-types"
import { Image, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'

export class Header extends React.Component {
  render () {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, this.props.titleStyle]} adjustsFontSizeToFit>{ this.props.title }</Text>
            <Image style={styles.logo} source={this.props.rightIconSource} />
        </View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    flexDirection: 'row'
  },
  logo: {
    position: 'absolute',
    right: 0,
    top: 10,
    marginRight: 10
  },
  title: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#4A4A4A',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold'
  }
})

Header.propTypes = {
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.any,
    rightIconSource: PropTypes.node.isRequired
}

export default Header
