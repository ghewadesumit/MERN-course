import * as actionTypes from './types';
import { setAlert } from './alert';
import axios from 'axios';

// Get all Posts
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

// Get a Post by Id
export const getPost = (id) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/post/${id}`);
		dispatch({ type: actionTypes.GET_POST, payload: res.data });
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

// add a comment
export const addComment = (postId, formData) => async (dispatch) => {
	try {
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		const body = JSON.stringify(formData);
		const res = await axios.post(`/api/post/comment/${postId}`, body, config);
		dispatch({
			type: actionTypes.ADD_COMMENT,
			payload: { response: res.data, postId },
		});
		dispatch(setAlert('Comment Added', 'success'));
	} catch (err) {
		dispatch({
			type: actionTypes.POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// delete a comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);
		dispatch({
			type: actionTypes.DELETE_COMMENT,
			payload: { response: res.data, postId },
		});
		dispatch(setAlert('Comment deleted', 'danger'));
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
