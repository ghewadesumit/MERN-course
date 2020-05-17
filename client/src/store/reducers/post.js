import * as actionTypes from '../actions/types';
const inititalState = {
	posts: [],
	post: null,
	loading: true,
	error: {},
};

export default function (state = inititalState, action) {
	const { type, payload } = action;
	switch (type) {
		case actionTypes.GET_POSTS:
			return { ...state, posts: payload, loading: false };
		case actionTypes.POST_ERROR:
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
}
