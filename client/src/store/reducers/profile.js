import * as actionTypes from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.CREATE_PROFILE_SUCCESS:
		case actionTypes.GET_PROFILE:
			return { ...state, profile: payload, loading: false };

		case actionTypes.CREATE_PROFILE_FAIL:
		case actionTypes.PROFILE_ERROR:
			return { ...state, error: payload, loading: false };

		case actionTypes.CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				profiles: [],
				repos: [],
				loading: true,
				error: {},
			};

		default:
			return state;
	}
}