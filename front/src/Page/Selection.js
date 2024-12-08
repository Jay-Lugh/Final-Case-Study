import React from 'react';
import { useNavigate } from 'react-router-dom';

function Selection() {
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate('/login/admin'); // Redirect to the Admin login page
  };

  const handleUser = () => {
    navigate('/login/user'); // Redirect to the User login page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Select Role</h1>
      <button onClick={handleAdmin} style={{ margin: '10px', padding: '10px 20px' }}>
        Admin
      </button>
      <button onClick={handleUser} style={{ margin: '10px', padding: '10px 20px' }}>
        User
      </button>
    </div>
  );
}

export default Selection;
