import axios from 'axios';
import { setAlert } from './alert';
import * as actionTypes from './types';

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  // Stating the data type to be sent
  const config = { headers: { 'Content-Type': 'application/json' } };
  // Preparing the data to be sent
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: res.data });
    dispatch(setAlert('Registeration Successful', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: actionTypes.REGISTER_FAIL });
    // console.error(err.message);
  }
};
