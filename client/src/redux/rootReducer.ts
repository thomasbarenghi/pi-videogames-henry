import { combineReducers } from '@reduxjs/toolkit'
import client from './slices/client'

const rootReducer = combineReducers({
  client
})

export default rootReducer
