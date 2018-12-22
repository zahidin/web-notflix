const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false,
	keyword: null,
	offset: 0
};

export default function searchReducer(state = initialState, action) {
	switch (action.type) {
		case 'SAVE_KEYWORD':
			return { ...state, keyword: action.payload.query, offset: action.payload.offset };
		case 'GET_SEARCH_PENDING':
			return { ...state, isLoading: true };
		case 'GET_SEARCH_FULFILLED':
			return { ...state, isLoading: false, data: action.payload.data };
		case 'GET_SEARCH_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
