import { combineReducers } from 'redux'
import { searchReducer } from './search'
import { signUpReducer } from './signup'
import { notificationsReducer} from './notifications'

export default combineReducers({
  signUp: signUpReducer,
  search: searchReducer,
  notifications: notificationsReducer
})
