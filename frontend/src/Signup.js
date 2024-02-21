import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    const err = Validation(values);
    setErrors(err);

    if (err.name === '' && err.email === '' && err.password === '') {
      axios
        .post('http://localhost:8081/signup', values)
        .then((res) => {
          navigate('/login');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #2980B9, #6DD5FA, #ffffff)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className='bg-light p-5 rounded w-50'>
        <h2 style={{ color: '#2980B9', marginBottom: '30px' }}>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              type='name'
              placeholder='Enter Your Name'
              name='name'
              onChange={handleInput}
              className='form-control rounded-pill'
            />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>
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
            Sign up
          </button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

