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
      case "LOGOUT":
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      default:
        return state;
    }
  };