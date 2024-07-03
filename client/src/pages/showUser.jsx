import React, { useEffect, useState } from 'react';
import { fetchUsers, updateUser, deleteUser, createUser } from '../services/api';

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  
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
     
      <table className="mt-8 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
           
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-4 py-2">{user.firstName}</td>
              <td className="px-4 py-2">{user.lastName}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
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

export default ShowUser;
