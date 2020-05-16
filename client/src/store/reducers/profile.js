import * as actionTypes from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
	isModal: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.DELETE_EXPERIENCE:
		case actionTypes.DELETE_EDUCATION:
		case actionTypes.UPDATE_PROFILE:
		case actionTypes.CREATE_PROFILE_SUCCESS:
		case actionTypes.GET_PROFILE:
			return { ...state, profile: payload, loading: false };

		case actionTypes.GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			};

		case actionTypes.GET_REPOS:
			return { ...state, repos: payload, loading: false };

		case actionTypes.CREATE_PROFILE_FAIL:
		case actionTypes.PROFILE_ERROR:
			return { ...state, error: payload, profile: null, loading: false };

		case actionTypes.CLEAR_PROFILE:
		case actionTypes.DELETE_PROFILE:
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
