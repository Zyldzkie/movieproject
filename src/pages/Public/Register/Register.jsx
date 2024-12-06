import React, { useCallback, useRef, useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const fNameRef = useRef();
  const mNameRef = useRef();
  const lNameRef = useRef();
  const CNoRef = useRef();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

  const toggleShowPassword = useCallback(() => {
    setIsShowPassword((prev) => !prev);
  }, []);

  const handleOnChange = (event, type) => {
    const value = event.target.value;

    switch (type) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'middleName':
        setMiddleName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'contactNo':
        setContactNo(value);
        break;
      default:
        break;
    }
  };

  const checkFields = () => {
    if (email && password && firstName && lastName && contactNo) {
      handleRegister();
    } else {
      if (!email) emailRef.current.focus();
      else if (!password) passwordRef.current.focus();
      else if (!firstName) fNameRef.current.focus();
      else if (!lastName) lNameRef.current.focus();
      else if (!contactNo) CNoRef.current.focus();
    }
  };

  const resetInputs = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setContactNo('');
  };

  const handleRegister = async () => {
    const data = { email, password, firstName, middleName, lastName, contactNo };
    setStatus('loading');

    try {
      const res = await axios.post('/admin/register', data, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log(res);
      alert('Registration successful!');
      resetInputs();
      setStatus('idle');

      const shouldRedirect = window.confirm('Do you want to be directed to the login page?');
      if (shouldRedirect) {
        navigate('/');
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e.response?.data?.message || 'An error occurred';
      alert('Registration failed: ' + errorMessage);
      setStatus('idle');
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <form className="register-form">
          <h2 className="register-title">Register</h2>

          <div className="register-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              ref={emailRef}
              onChange={(e) => handleOnChange(e, 'email')}
              required
            />
          </div>

          <div className="register-group">
            <label>Password:</label>
            <div className="register-password-container">
              <input
                type={isShowPassword ? 'text' : 'password'}
                value={password}
                ref={passwordRef}
                onChange={(e) => handleOnChange(e, 'password')}
                required
              />
              <button
                type="button"
                className="register-show-password"
                onClick={toggleShowPassword}
              >
                {isShowPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="register-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              ref={fNameRef}
              onChange={(e) => handleOnChange(e, 'firstName')}
              required
            />
          </div>

          <div className="register-group">
            <label>Middle Name:</label>
            <input
              type="text"
              value={middleName}
              ref={mNameRef}
              onChange={(e) => handleOnChange(e, 'middleName')}
            />
          </div>

          <div className="register-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              ref={lNameRef}
              onChange={(e) => handleOnChange(e, 'lastName')}
              required
            />
          </div>

          <div className="register-group">
            <label>Contact No:</label>
            <input
              type="text"
              value={contactNo}
              ref={CNoRef}
              onChange={(e) => handleOnChange(e, 'contactNo')}
              required
            />
          </div>

          <div className="register-submit-container">
            <button
              type="button"
              className="register-submit-btn"
              disabled={status === 'loading'}
              onClick={checkFields}
            >
              {status === 'loading' ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
