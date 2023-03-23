import { FETCH_API_GENRES_REQUEST, FETCH_API_GENRES_SUCCESS, FETCH_API_GENRES_FAILURE, SUCCESS_STATUS_API_GENRES } from '../../actions/actionsTypes';


const initialState = {
    genres: [{ name: "Default", id: 0 }],
    active: "Todos",
    isLoading: false,
    error: null,
    title: "Generos"
};


const apiGenresReducer = (state = initialState, action) => {

    switch (action.type) {

        case FETCH_API_GENRES_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case FETCH_API_GENRES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                genres: [{ name: "Default" }, ...action.payload]
            };

        case FETCH_API_GENRES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case SUCCESS_STATUS_API_GENRES:
            return {
                ...state,
                genres: [{ name: "Default" }, ...action.payload]
            }

        default:
            return state;

    }
}

export default apiGenresReducer;