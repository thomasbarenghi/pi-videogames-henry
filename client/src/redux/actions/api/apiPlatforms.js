import {
    FETCH_API_PLATFORMS_REQUEST,
    FETCH_API_PLATFORMS_SUCCESS,
    FETCH_API_PLATFORMS_FAILURE,
} from "../actionsTypes";
import axios from "axios";
import { SERVER_URL } from "../../../api/config";
const { headers } = require('../../../api/config');

export const getPlatforms = () => async (dispatch) => {
    dispatch({ type: FETCH_API_PLATFORMS_REQUEST });

    try {
        const response = await axios.get(`${SERVER_URL}platforms`, { headers });
        dispatch({ type: FETCH_API_PLATFORMS_SUCCESS, payload: response.data.result });
    } catch (error) {
        dispatch({ type: FETCH_API_PLATFORMS_FAILURE, payload: error.message });
        alert("Error al cargar las plataformas")
    }
};
