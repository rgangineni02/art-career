import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import loginImage from '../assets/login-illustration.png'; // make sure image is placed here
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (validate()) {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', res.data.token);
      setLoginSuccess(true);
      navigate('/dashboard'); // Redirect after login
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  }
};


  return (
    <div className="login-container">
      <div className="login-left">
        <img src={loginImage} alt="Login Visual" className="login-img" />
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Sign In</h2>

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="error">{errors.email}</small>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="error">{errors.password}</small>}

          <button type="submit">Continue</button>

          {loginSuccess && <p className="success">Login successful!</p>}

          <p className="signup-link">
            Don't have an account? <Link to="/signup"><strong>Sign up</strong></Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
