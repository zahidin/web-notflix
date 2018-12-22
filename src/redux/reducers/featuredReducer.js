const initialState = {
	results: [],
	data: {},
	isLoading: false,
	isError: false
};

export default function featuredReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_FEATURED_PENDING':
			return { ...state, isLoading: true };
		case 'GET_FEATURED_FULFILLED':
			return { ...state, isLoading: false, data: action.payload.data };
		case 'GET_FEATURED_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
