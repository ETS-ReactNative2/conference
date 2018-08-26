import { Container, Spinner } from 'native-base'
import React from 'react'

function LunaSpinner () {
  return (
    <Container style={ { flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' } }>
      <Spinner color={'white'}/>
    </Container>
  )
}

LunaSpinner.propsTypes = {}

export default LunaSpinner
