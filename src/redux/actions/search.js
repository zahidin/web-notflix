import axios from 'axios';
import { ip } from '../../configip';

export function SAVE_KEYWORD(query, offset = 1) {
	return {
		type: 'SAVE_KEYWORD',
		payload: {
			query,
			offset
		}
	};
}

export const GET_SEARCH = (payload, off) => {
	return {
		type: 'GET_SEARCH',
		payload: axios.get(`${ip}movies/search?q=${payload}&o=${off}`)
	};
};
