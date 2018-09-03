import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureApi from './src/config/config'
import { ConnectedAppStackNavigator } from './src/navigation'
import configureStore from './src/store'
import AppStartUp from './src/views/components/app-start-up/app-start-up'

configureApi()
const { store, persistor } = configureStore()

EStyleSheet.build({
  $buttonBackground: '#603695'
})

export default class App extends React.Component {
  render () {
    return (
      <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
          <AppStartUp>
            <ConnectedAppStackNavigator/>
          </AppStartUp>
        </PersistGate>
      </Provider>
    )
  }
}
