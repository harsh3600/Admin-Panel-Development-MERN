import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';
import Login from './components/Login';
import ShowUser from './pages/showUser';

function PrivateRoute({ children }) {
  const auth = localStorage.getItem("token");
  console.log("isauthenticated", auth)
  return auth ? children : <Navigate to="/login" />
}



const App = () => (

  
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userlist" element={<PrivateRoute><ShowUser/></PrivateRoute>}/>
      <Route path="/admin-panel/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default App;
