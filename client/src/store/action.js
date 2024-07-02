// src/store/actions.js
import axios from 'axios';

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
  }
};
