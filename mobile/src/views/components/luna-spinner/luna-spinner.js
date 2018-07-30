import { Container, Spinner } from 'native-base'
import React from 'react'

function LunaSpinner () {
  return (
    <Container style={ { flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' } }>
      <Spinner color={'#603695'}/>
    </Container>
  )
}

LunaSpinner.propsTypes = {}

export default LunaSpinner
