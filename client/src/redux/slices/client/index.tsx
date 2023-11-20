import { combineReducers } from '@reduxjs/toolkit'
import games from './games'
import filters from './filters'
import genres from './genres'
import platforms from './platforms'

const rootReducer = combineReducers({
  games,
  filters,
  genres,
  platforms
})

export default rootReducer
