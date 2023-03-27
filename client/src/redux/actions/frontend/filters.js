import { SET_ORDERING, SET_FILTER_ORIGEN, SET_FILTER_GENRES, SET_FILTER_SEARCH, SET_FILTER_RATING } from '../actionsTypes';
import { setPageAllGames } from './games';


export const restoreFilters = () => (dispatch, getState) => {
  dispatch({ type: SET_ORDERING, payload: 'Default', });
  dispatch({ type: SET_FILTER_ORIGEN, payload: 'Default', });
  dispatch({ type: SET_FILTER_GENRES, payload: 'Default', });
  dispatch({ type: SET_FILTER_SEARCH, payload: '', });
  dispatch({ type: SET_FILTER_RATING, payload: 'Default', });
  dispatch(setPageAllGames());
}


export const setOrdering = (value) => (dispatch) => {
  dispatch({ type: SET_ORDERING, payload: value, });
  dispatch(setPageSorting());
};


export const setFilterOrigen = (value) => (dispatch) => {
  dispatch({ type: SET_FILTER_ORIGEN, payload: value, });
  dispatch(setPageAllGames());
};


export const setFilterGenres = (value) => (dispatch) => {
  dispatch({ type: SET_FILTER_GENRES, payload: value, });
  dispatch(setPageAllGames());
};


export const setFilterSearch = (value) => (dispatch) => {
  dispatch({ type: SET_FILTER_SEARCH, payload: value, });
  dispatch(setPageAllGames());
}


export const setFilterRating = (value) => (dispatch) => {
  dispatch({ type: SET_FILTER_RATING, payload: value, });
  dispatch(setPageSorting());
}


export const setPageSorting = () => (dispatch, getState) => {

  const { filters, apiGames } = getState();
  const games = apiGames?.games;

  games.sort((a, b) => {
    return filters.ordering.active === 'A-Z' ? a.name.localeCompare(b.name)
      : filters.ordering.active === 'Z-A' ? b.name.localeCompare(a.name)
          : a.id - b.id;
  });

  games.sort((a, b) => {
    return filters.filtering.rating.active === '0-5' ? a.rating - b.rating
      : filters.filtering.rating.active === '5-0' ? b.rating - a.rating
        : null;
  })

  dispatch(setPageAllGames(games));
}