import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createLogger } from 'redux-logger'
import { batchStoreEnhancer, batchMiddleware } from 'redux-batch-enhancer'
import thunk from 'redux-thunk'
import reducers from './reducers'

const logger = createLogger({
  // ...options
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filter', 'schedule', 'search', 'profile',]
}

const middlewares = [batchMiddleware, thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default (initialState = {}) => {
  const middleware = applyMiddleware(...middlewares)
  const store = createStore(persistedReducer, initialState, compose(middleware, batchStoreEnhancer))
  const persistor = persistStore(store)
  return { store, persistor }
}
