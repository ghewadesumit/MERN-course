import * as actionTypes from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isRegistered: false,
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case actionTypes.USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };

    case actionTypes.REGISTER_SUCCESS:
      return { ...state, isRegistered: true };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: false, loading: false };

    case actionTypes.REGISTER_FAIL:
      return { ...state, isRegistered: false };
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false, loading: false };

    default:
      return state;
  }
}