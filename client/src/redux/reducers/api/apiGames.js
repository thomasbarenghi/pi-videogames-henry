import { FETCH_API_GAMES_REQUEST, FETCH_API_GAMES_SUCCESS, FETCH_API_GAMES_FAILURE, GET_GAME_BY_ID, SUCCESS_STATUS_API_GAMES, ADD_GAME_FAILURE, ADD_GAME_SUCCESS, ADD_GAME_REQUEST, DELETE_GAME_SUCCESS } from '../../actions/actionsTypes';

const initialState = {
    isLoading: false,
    games: [],
    currentGame: {},
    error: null,
    errorOnAdd: null,
    isLoadingOnAdd: false
};

const apiGamesReducer = (state = initialState, action) => {

    switch (action.type) {

        case FETCH_API_GAMES_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case FETCH_API_GAMES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                games: action.payload,
                error: null
            };

        case SUCCESS_STATUS_API_GAMES:
            return {
                ...state,
                isLoading: false,
                error: null,
                errorOnAdd: null
            };

        case FETCH_API_GAMES_FAILURE:
            return {
                ...state,
                isLoading: false,
                games: [],
                error: action.payload
            };

        case ADD_GAME_REQUEST:
            return {
                ...state,
                isLoadingOnAdd: true
            };

        case ADD_GAME_FAILURE:
            return {
                ...state,
                isLoadingOnAdd: false,
                errorOnAdd: action.payload
            };

        case ADD_GAME_SUCCESS:
            return {
                ...state,
                isLoadingOnAdd: false,
                errorOnAdd: null,
                games: [action.payload, ...state.games]
            };

            case DELETE_GAME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                games: state.games.filter(game => game.id !== action.payload),
                error: null
            };

        case GET_GAME_BY_ID:
            return {
                ...state,
                isLoading: false,
                currentGame: action.payload,
                error: null
            };

        default:
            return state;
    }
};

export default apiGamesReducer;
