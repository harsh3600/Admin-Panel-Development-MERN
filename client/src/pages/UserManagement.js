import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser, createUser } from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'User',
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetchUsers({ page, search });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    };
    getUsers();
  }, [page, search]);

  const handleCreate = async () => {
    await createUser(formData);
    setUsers([...users, formData]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'User',
    });
  };

  const handleUpdate = async (id, user) => {
    await updateUser(id, user);
    setUsers(users.map((u) => (u._id === id ? { ...u, ...user } : u)));
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u._id !== id));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePagination = (direction) => {
    if (direction === 'next' && page < totalPages) setPage(page + 1);
    if (direction === 'prev' && page > 1) setPage(page - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search users"
        className="w-full px-3 py-2 rounded border"
      />
      <form onSubmit={handleCreate} className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="First Name"
            required
            className="w-full px-3 py-2 rounded border"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Last Name"
            required
            className="w-full px-3 py-2 rounded border"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
            className="w-full px-3 py-2 rounded border"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            required
            className="w-full px-3 py-2 rounded border"
          />
          <select
            name="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 rounded border"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Add User
        </button>
      </form>
      <table className="mt-8 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() =>{user.role=="User"? handleUpdate(user._id, { ...user, role: 'Admin' }):handleUpdate(user._id, { ...user, role: 'User' })}}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                >
                  Make {user.role=="User"?"Admin":"User"}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => handlePagination('prev')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination('next')}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
