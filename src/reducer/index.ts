import { combineReducers } from 'redux'

import dataReducer from './dataReducer'
import appReducer from './appReducer'

export default combineReducers({
  app: appReducer,
  data: dataReducer,
})