import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import '../Login/Login.css';
import './Register.css';

const Register = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      const { token, email, name, role, userId } = res.data;
      loginUser({ email, name, role, userId }, token);
      toast.success(`Welcome, ${name}! Your account has been created.`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop"
          alt="Hotel Room"
        />
        <div className="auth-image-overlay">
          <div className="auth-quote">
            <span className="auth-logo">GRAND LUXE</span>
            <p>"Your journey to extraordinary begins here"</p>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-inner">
          <p className="auth-pre">Join Us</p>
          <h2 className="auth-title">Create Your Account</h2>
          <div className="auth-divider" />

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 555 000 0000"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Your address"
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
