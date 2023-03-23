import { SET_CURRENT_PAGE, SET_PAGE_ALL_GAMES } from '../../actions/actionsTypes';

const initialState = {
    pageGames: {
        currentGames: [],
        allGames: []
    },
    currentPage: 1,
    gamesPerPage: 15,
    isLoading: false,
    games: [],
    error: null
};


const frontReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }

        case SET_PAGE_ALL_GAMES: {
            return {
                ...state,
                pageGames: {
                    ...state.pageGames,
                    allGames: action.payload
                }
            }
        }

        default:
            return state;
    }
};

export default frontReducer;