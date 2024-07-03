// src/pages/admin/EditUser.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, updateUser } from '../../store/actions/userActions';
import { useParams, useHistory } from 'react-router-dom';

const EditUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'User'
  });

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      });
    }
  }, [user]);

  const { firstName, lastName, email, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, formData));
    history.push('/admin/users');
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="First Name" required />
      <input type="text" name="lastName" value={lastName} onChange={onChange} placeholder="Last Name" required />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
      <select name="role" value={role} onChange={onChange}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Update User</button>
    </form>
  );
};

export default EditUser;
