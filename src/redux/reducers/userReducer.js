const initialState = {
	user: {},
	login: {},
	regist: {},
	isLoading: false,
	isError: false
};

export default function trendingReducer(state = initialState, action) {
	switch (action.type) {
		case 'USER_REGISTER_PENDING':
			return { ...state, isLoading: true, isError: false };
		case 'USER_REGISTER_FULFILLED':
			return { ...state, isLoading: false, regist: action.payload.data, isError: false };
		case 'USER_REGISTER_REJECTED':
			return { ...state, isLoading: false, isError: true };
		case 'USER_LOGIN_PENDING':
			return { ...state, isLoading: true, isError: false };
		case 'USER_LOGIN_FULFILLED':
			return { ...state, isLoading: false, login: action.payload.data, isError: false };
		case 'USER_LOGIN_REJECTED':
			return { ...state, isLoading: false, isError: true };
		case 'GET_USER_PENDING':
			return { ...state, isLoading: true, isError: false };
		case 'GET_USER_FULFILLED':
			return { ...state, isLoading: false, user: action.payload.data, isError: false };
		case 'GET_USER_REJECTED':
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
