import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-center space-x-4">
      <Link to="/login" className="text-white hover:underline">Login</Link>
      <Link to="/register" className="text-white hover:underline">Register</Link>
    </div>
  </nav>
);

export default Navbar;
