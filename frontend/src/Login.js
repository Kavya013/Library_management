import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Login({ isAdmin }) {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    const err = Validation(values);
    setErrors(err);

    if (isAdmin && values.email === 'admin@gmail.com' && values.password === 'adminA123') {
      navigate('/admin-page');
    } else if (err.email === '' && err.password === '') {
      axios
        .post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data === 'Success') {
            navigate('/home');
          } else {
            alert('No record existed');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to left, #00d2ff, #3a7bd5)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='bg-light p-5 rounded w-50'>
        <h2 style={{ color: '#3a7bd5', marginBottom: '30px' }}>{isAdmin ? 'Admin Login' : 'Sign in'}</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              type='email'
              placeholder='Enter Your Email'
              name='email'
              onChange={handleInput}
              className='form-control rounded-pill'
            />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <input
              type='password'
              placeholder='Enter Your Password'
              name='password'
              onChange={handleInput}
              className='form-control rounded-pill'
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-primary w-100 rounded-pill'>
            {isAdmin ? 'Log in as Admin' : 'Log in'}
          </button>
          {!isAdmin && (
            <>
              
              <p style={{ marginTop: '20px', textAlign: 'center' }}>
                Don't have an account? <Link to='/signup'>Sign up</Link>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;

