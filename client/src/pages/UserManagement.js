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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Last Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="even:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.firstName}</td>
                <td className="px-4 py-2 border-b">{user.lastName}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">{user.role}</td>
                <td className="px-4 py-2 border-b space-x-2">
                  <button
                    onClick={() => handleUpdate(user._id, { ...user, role: 'Admin' })}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
