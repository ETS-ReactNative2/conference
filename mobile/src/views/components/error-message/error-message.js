import { Button, Container, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { Image } from 'react-native'
import ErrorIcon from './error.png'
import I18n from "../../../../locales/i18n"

function ErrorMessage ({ message, onRetry, retryMessage = I18n.t('message_page.try_again') }) {
  return (
    <Container style={ { height: '100%', flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
      <Image style={{ width: 128, height: 128, marginBottom: 16 }} source={ ErrorIcon }/>
      <Text style={{ marginBottom: 16, fontWeight: 'bold'}}>{ message }</Text>
      <Button bordered dark onPress={ onRetry } style={{ alignSelf: 'center'}}>
        <Text>{ retryMessage }</Text>
      </Button>
    </Container>
  )
}

ErrorMessage.propsTypes = {
  message: PropTypes.string.isRequired,
  retryButton: PropTypes.string,
  onRetry: PropTypes.func.isRequired
}

export default ErrorMessage
