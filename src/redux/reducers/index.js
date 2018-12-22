import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import movieReducer from './movieReducer';
import trendingReducer from './trendingReducer';
import popularReducer from './popularReducer';
import featuredReducer from './featuredReducer';
import searchReducer from './searchReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
	categoryReducer,
	movieReducer,
	trendingReducer,
	popularReducer,
	featuredReducer,
	searchReducer,
	userReducer
});

export default reducers;
