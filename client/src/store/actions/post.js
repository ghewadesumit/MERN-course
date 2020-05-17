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
		dispatch(setAlert('Post Deleted', 'danger'));
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add a post Like
export const addPost = (formData) => async (dispatch) => {
	try {
		console.log('im getting called', formData);
		const config = { headers: { 'Content-Type': 'application/json' } };
		const body = JSON.stringify(formData);
		const res = await axios.post(`api/post`, body, config);
		dispatch({
			type: actionTypes.ADD_POST,
			payload: res.data,
		});
		dispatch(setAlert('Post Added', 'success'));
	} catch (err) {
		console.log(err);
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
