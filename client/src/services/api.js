// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const register = (user) => API.post('/auth/register', user);
export const login = (user) => API.post('/auth/login', user);
export const fetchUsers = () => API.get('/users');
export const updateUser = (id, user) => API.put(`/users/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/${id}`);
