import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
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
