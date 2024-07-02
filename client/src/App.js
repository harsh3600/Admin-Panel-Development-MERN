// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/user-management" component={UserManagement} />
    </Switch>
  </Router>
);

export default App;
