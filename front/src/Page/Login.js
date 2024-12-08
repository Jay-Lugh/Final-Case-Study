import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { role } = useParams(); // Get the role from the URL

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/login`, { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Save the token
        navigate(role === 'admin' ? '/dashboard' : '/user-dashboard'); // Redirect based on role
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      alert('Error logging in: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRegisterRedirect = () => {
    // Redirect to the registration page based on the role
    if (role === 'admin') {
      navigate('/register/admin'); // Admin registration
    } else {
      navigate('/register/user'); // User registration
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h1>{role === 'admin' ? 'Admin Login' : 'User Login'}</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </div>
      </form>

      {role === 'admin' && (
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={handleRegisterRedirect}
            style={{
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Register as Admin
          </button>
        </div>
      )}
      {role === 'user' && (
        <div style={{ marginTop: '15px' }}>
          <button
            onClick={handleRegisterRedirect}
            style={{
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Register as User
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
