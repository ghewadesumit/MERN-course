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

// Update like
export const addLike = (postId) => async (dispatch) => {
	try {
		console.log(postId);
		const res = await axios.put(`api/post/like/${postId}`);
		dispatch({
			type: actionTypes.UPDATE_LIKES,
			payload: { response: res.data, postId },
		});
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Remove Like
export const removeLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`api/post/unlike/${postId}`);
		dispatch({
			type: actionTypes.UPDATE_LIKES,
			payload: { response: res.data, postId },
		});
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Like
export const deletePost = (id) => async (dispatch) => {
	try {
		await axios.delete(`api/post/${id}`);
		dispatch({
			type: actionTypes.DELETE_POST,
			payload: id,
		});
		dispatch(setAlert('Post Removed', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
