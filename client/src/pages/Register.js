// src/pages/Register.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const history = useHistory();

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      history.push('/login');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
