const {FETCH_API_PLATFORMS_FAILURE, FETCH_API_PLATFORMS_REQUEST, FETCH_API_PLATFORMS_SUCCESS} = require("../../actions/actionsTypes");

const initialState = {
    platforms: [{ name: "Default", id: 0 }],
    active: "Default",
    isLoading: false,
    error: null,
    title: "Plataformas"
};


const apiPlatformsReducer = (state = initialState, action) => {

    switch (action.type) {

        case FETCH_API_PLATFORMS_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case FETCH_API_PLATFORMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                platforms: [{ name: "Default" }, ...action.payload]
            };

        case FETCH_API_PLATFORMS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;

    }
}


export default apiPlatformsReducer;