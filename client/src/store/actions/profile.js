import axios from 'axios';
import { setAlert } from '../actions/alert';
import * as actionTypes from './types';

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');
		dispatch({ type: actionTypes.GET_PROFILE, payload: res.data });
	} catch (err) {
		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Post logined user Profile
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		// Stating the data type to be sent
		const config = { headers: { 'Content-Type': 'application/json' } };

		// Preparing the data to be sent
		const res = await axios.post('api/profile', formData, config);

		dispatch({ type: actionTypes.CREATE_PROFILE_SUCCESS, payload: res.data });
		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
		if (!edit) history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
	try {
		// Stating the data type to be sent
		const config = { headers: { 'Content-Type': 'application/json' } };

		// Preparing the data to be sent
		const res = await axios.put('api/profile/experience', formData, config);

		dispatch({ type: actionTypes.UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert('Experience Added ', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Add Education
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		// Stating the data type to be sent
		const config = { headers: { 'Content-Type': 'application/json' } };

		// Preparing the data to be sent

		const res = await axios.put('api/profile/education', formData, config);

		dispatch({ type: actionTypes.UPDATE_PROFILE, payload: res.data });
		dispatch(setAlert('Education Added ', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: actionTypes.PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Clear Profile
export const clearProfile = () => (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_PROFILE });
};
