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
		case actionTypes.GET_POST:
			return { ...state, post: payload, loading: false };

		case actionTypes.GET_POSTS:
			return { ...state, posts: payload, loading: false };

		case actionTypes.ADD_POST:
			return { ...state, posts: [payload, ...state.posts], loading: false };

		case actionTypes.UPDATE_LIKES:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === payload.postId
						? { ...post, likes: payload.response }
						: post
				),
				loading: false,
			};

		case actionTypes.ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: payload.response },
				loading: false,
			};

		case actionTypes.DELETE_COMMENT:
			return {
				...state,
				loading: false,
				post: { ...state.post, comments: payload.response },
			};

		case actionTypes.POST_ERROR:
			return { ...state, error: payload, loading: false };

		case actionTypes.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
			};
		default:
			return state;
	}
}
