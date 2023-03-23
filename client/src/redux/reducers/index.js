import { combineReducers } from 'redux';
import apiGames from './api/apiGames';
import filters from './frontend/filters';
import games from './frontend/games';
import apiGenres from './api/apiGenres';
import apiPlatforms from './api/apiPlatforms';

const rootReducer = combineReducers({
  apiGames: apiGames,
  filters: filters,
  frontGames: games,
  apiGenres: apiGenres,
  apiPlatforms: apiPlatforms
});

export default rootReducer;
