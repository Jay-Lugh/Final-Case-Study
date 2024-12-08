import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Page/Login';
import Register from './Page/Register';
import Dashboard from './Page/Dashboard';
import Selection from './Page/Selection';
import UserRegistration from './Page/UserRegistration';
import UserLogin from './Page/UserLogin';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Selection />} />
        <Route path="/login/:role" element={<Login />} /> {/* Admin or User login */}
        <Route path="/login/user" element={<UserLogin />} /> {/* User Login */}
        <Route path="/register/admin" element={<Register />} /> {/* Admin Registration */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Admin Dashboard */}
        <Route path="/register/user" element={<UserRegistration />} />

        <Route path="/user-dashboard" element={<checkout />} /> {/* User Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
