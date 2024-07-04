// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')?.token;

  // Check if token exists and handle missing token scenarios gracefully
  if (!token) {
    console.warn('Authorization token not found in localStorage. Request sent without token.');
  } else {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const register = (user) => API.post('/auth/register', user);
export const login = (user) => API.post('/auth/login', user);
export const logout = (user) => API.post('/auth/logout', user);
export const fetchUsers = () => API.post('/users');
export const updateUser = (id, user) => API.post(`/users/update/${id}`, user);
export const deleteUser = (id) => API.post(`/users/delete/${id}`);
export const createUser = (user) => API.post('/users/create', user);

