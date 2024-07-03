// src/store/actions.js
import axios from 'axios';
import {login, logout} from "../services/api"



export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await login(user);
    localStorage.setItem("token", res.data)
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    return res?.data?.role
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    return false
  }
};

export const logoutUser = () => async (dispatch) => {
  
  try {
    const res = await logout();
    localStorage.removeItem('token');
    dispatch({ type: "LOGOUT" });
    return true
  } catch (error) {
    dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data.message });
    return false
  }
  
 
};

// src/store/reducers.js
const initialState = {
    user: null,
    error: null,
    token: null,
    isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, error: null };
    case 'LOGIN_FAIL':
      return { ...state, error: action.payload };
    case 'LOGOUT':
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
    case 'LOGIN_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};



// import { LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from './types';



// export const logout = () => (dispatch) => {
//   localStorage.removeItem('token');
//   dispatch({ type: LOGOUT });
// };
