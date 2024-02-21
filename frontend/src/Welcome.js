import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/signup');
  };

  const handleAdminClick = () => {
    navigate('/admin-login');
  };

  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #4caf50, #009688)', // Gradient background
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff', // Text color
        fontFamily: 'Arial, sans-serif', // Font family
      }}
    >
      <div
        className='bg-white p-5 rounded-lg shadow-lg text-center'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Set a semi-transparent white background for content
          maxWidth: '400px', // Limit content width
        }}
      >
        <h2 style={{ color: '#009688', marginBottom: '30px' }}>Welcome</h2> {/* Custom color for the heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className='btn btn-success btn-lg' style={{ flex: '1', marginRight: '10px' }} onClick={handleUserClick}>
            User
          </button>
          <button className='btn btn-primary btn-lg' style={{ flex: '1', marginLeft: '10px' }} onClick={handleAdminClick}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;





