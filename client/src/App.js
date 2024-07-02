import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';
import Login from './components/Login';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user-management" element={<UserManagement />} />
    </Routes>
  </Router>
);

export default App;
