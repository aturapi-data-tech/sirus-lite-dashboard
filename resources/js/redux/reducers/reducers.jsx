const initialState = {
    filters: {
        category: ''
    },
    page: 1,
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTERS':
            return { ...state, filters: action.payload };
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        default:
            return state;
    }
};
