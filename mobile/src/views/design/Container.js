import { Container } from 'native-base'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Header } from 'react-navigation'

export function FlowContainer ({ children }) {
  return (
    <Container style={ styles.container }>
      {children}
    </Container>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: `100% - ${Header.HEIGHT}`
  }
})
