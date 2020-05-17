import * as actionTypes from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('api/post');
		dispatch({ type: actionTypes.GET_POSTS, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
