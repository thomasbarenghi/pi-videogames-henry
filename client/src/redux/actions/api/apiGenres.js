import {
    FETCH_API_GENRES_REQUEST,
    FETCH_API_GENRES_SUCCESS,
    FETCH_API_GENRES_FAILURE,
} from "../actionsTypes";
import axios from "axios";
import { SERVER_URL } from "../../../api/config";
const { headers } = require('../../../api/config');

export const getGenres = () => async (dispatch) => {
    dispatch({ type: FETCH_API_GENRES_REQUEST });

    try {
        const response = await axios.get(`${SERVER_URL}genre`, { headers });
        dispatch({ type: FETCH_API_GENRES_SUCCESS, payload: response.data.result });
    } catch (error) {
        dispatch({ type: FETCH_API_GENRES_FAILURE, payload: error.message });
        return alert("Error al cargar los géneros")
    }
    
};
