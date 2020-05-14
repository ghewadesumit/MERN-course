import axios from 'axios';
// import setAlert from './alert';
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

//Clear Profile
export const clearProfile = () => (dispatch) => {
	dispatch({ type: actionTypes.CLEAR_PROFILE });
};
