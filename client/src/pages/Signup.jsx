import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import signupImg from '../assets/signup-illustration.png'; // Make sure this image is placed in src/assets/
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
  
        console.log(res.data); // "User registered successfully"
        setSuccess(true);
        setFormData({ name: '', email: '', password: '' });
      } catch (err) {
        alert(err.response?.data?.message || 'Signup failed');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={signupImg} alt="Illustration" className="illustration" />
      </div>

      <div className="signup-right">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Create Account</h2>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <small className="error">{errors.name}</small>}

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="error">{errors.password}</small>}

          <button type="submit">Sign Up</button>

          {success && <p className="success">Signup successful! You can now log in.</p>}

          <p className="login-link">
            Already have an account? <Link to="/login"><strong>Log in</strong></Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
