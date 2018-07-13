import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const logger = createLogger({
  // ...options
})

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export default (initialState = {}) => {
  const middleware = applyMiddleware(...middlewares)
  const store = createStore(reducers, initialState, middleware)
  return store
}
