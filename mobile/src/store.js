import { applyMiddleware, createStore, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { batchStoreEnhancer, batchMiddleware } from 'redux-batch-enhancer'
import thunk from 'redux-thunk'
import reducers from './reducers'

const logger = createLogger({
  // ...options
})

const middlewares = [batchMiddleware, thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export default (initialState = {}) => {
  const middleware = applyMiddleware(...middlewares)
  const store = createStore(reducers, initialState, compose(middleware, batchStoreEnhancer))
  return store
}
