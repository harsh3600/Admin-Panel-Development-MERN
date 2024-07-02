// src/pages/UserManagement.js
import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetchUsers();
      setUsers(res.data);
    };
    getUsers();
  }, []);

  const handleUpdate = async (id, user) => {
    await updateUser(id, user);
    setUsers(users.map((u) => (u._id === id ? { ...u, ...user } : u)));
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleUpdate(user._id, { ...user, role: 'Admin' })}>Make Admin</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
