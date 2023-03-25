import {
  FETCH_API_GAMES_FAILURE,
  FETCH_API_GAMES_REQUEST,
  FETCH_API_GAMES_SUCCESS,
  DELETE_GAME_SUCCESS,
  GET_GAME_BY_ID,
  ADD_GAME_FAILURE,
} from "../actionsTypes";
import axios from "axios";
import { SERVER_URL, headers } from "../../../api/config";
import { setPageAllGames } from "../frontend/games";

export const fetchApiGames= () => async (dispatch, getState) => {

  const { games } = getState().apiGames;
  if (games.results && games.results.length > 0) return;
  dispatch({ type: FETCH_API_GAMES_REQUEST });

  if (!headers.authorization || headers.authorization === undefined) { return Promise.reject(new Error('No hay token o userId en getPropios')); }

  try {
    const response = await axios.get(`${SERVER_URL}videogames`, { headers });
    dispatch({
      type: FETCH_API_GAMES_SUCCESS,
      payload: response.data.results,
    });
    dispatch(setPageAllGames(response.data.results));
  } catch (error) {
    dispatch({ type: FETCH_API_GAMES_FAILURE, payload: error.message });
  }
};


export const getGameById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_API_GAMES_REQUEST });

  try {
    const response = await axios.get(`${SERVER_URL}videogames/${id}`, { headers });
    dispatch({ type: GET_GAME_BY_ID, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_API_GAMES_FAILURE, payload: error.message });
  }
};


export const deleteGame = (id) => async (dispatch, getState) => {
  //dispatch({ type: DELETING_GAME });

  try {
    await axios.delete(`${SERVER_URL}videogames/${id}`, { headers });
    dispatch({ type: DELETE_GAME_SUCCESS, payload: id });
    dispatch(setPageAllGames(getState().apiGames.games));
  } catch (error) {
    dispatch({ type: FETCH_API_GAMES_FAILURE, payload: error.message });
    return alert("Error al eliminar el juego");
  }
};


export const addGame = (game) => async (dispatch) => {
  const gameToPost = {
    ...game,
    genres: game.genres.map((genre) => genre.value),
    platforms: game.platforms.map((platform) => platform.value),
  };

  try {
    console.log("gameToPost", gameToPost);
    const response = await axios.post(`${SERVER_URL}videogames`, gameToPost, { headers });
    dispatch(fetchApiGames());
    alert("Juego agregado con éxito!");
  } catch (error) {
    dispatch({ type: ADD_GAME_FAILURE, payload: error.message });
    return alert("Error al agregar el juego:", error.message);
  }
};
