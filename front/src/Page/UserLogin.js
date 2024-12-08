import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/login`, { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Save the token
        navigate('/user'); // Redirect to User Dashboard
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      alert('Error logging in: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register/user'); // Redirect to User Registration
  };

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleRegisterRedirect} style={{ marginTop: '10px' }}>
        Register
      </button>
    </div>
  );
}

export default UserLogin;
