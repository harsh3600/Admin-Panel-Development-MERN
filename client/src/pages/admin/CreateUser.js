// src/pages/admin/CreateUser.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/actions/userActions';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'User'
  });
  const dispatch = useDispatch();

  const { firstName, lastName, email, password, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
      <select name="role" value={role} onChange={onChange}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
