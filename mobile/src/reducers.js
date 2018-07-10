import { combineReducers } from 'redux'
import { signUpReducer } from './signup'

export default combineReducers({
  signUp: signUpReducer
})
