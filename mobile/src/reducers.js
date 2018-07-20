import { combineReducers } from 'redux'
import { searchReducer } from './search'
import { signUpReducer } from './signup'

export default combineReducers({
  signUp: signUpReducer,
  search: searchReducer
})
