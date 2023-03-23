const initialState = {
    search: '',
    ordering: {
        title: 'Ordering',
        values: [
            'Default',
            'A-Z',
            'Z-A'
        ],
        active: 'Default',
    },
    filtering: {
        origen: {
            title: 'Origen',
            values: [
                'Default',
                'own',
                'public'
            ],
            active: 'Default',
        },
        genres: {
            title: 'Genres',
            active: 'Default'
        },
        search: {
            title: 'Search',
            active: ''
        },
        rating: {
            title: 'Rating',
            active: 'Default',
            values: [
                'Default',
                '0-5',
                '5-0',
            ]
        }
    },
    created_by_me: false
};


const filtersReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case 'SET_SEARCH':
            return {
                ...state,
                search: action.payload,
            };

        case 'SET_ORDERING':
            return {
                ...state,
                ordering: {
                    ...state.ordering,
                    active: action.payload
                }
            };

        case 'SET_FILTER_ORIGEN':
            return {
                ...state,
                filtering: {
                    ...state.filtering,
                    origen: {
                        ...state.filtering.origen,
                        active: action.payload
                    }
                }
            };

        case 'SET_FILTER_GENRES':
            return {
                ...state,
                filtering: {
                    ...state.filtering,
                    genres: {
                        ...state.filtering.genres,
                        active: action.payload
                    }
                }
            };

        case 'SET_FILTER_SEARCH':
            return {
                ...state,
                filtering: {
                    ...state.filtering,
                    search: {
                        ...state.filtering.search,
                        active: action.payload
                    }
                }
            };

        case 'SET_FILTER_RATING':
            return {
                ...state,
                filtering: {
                    ...state.filtering,
                    rating: {
                        ...state.filtering.rating,
                        active: action.payload
                    }
                }
            };

        default:
            return state;
    }
};

export default filtersReducer;
