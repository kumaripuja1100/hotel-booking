import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      const { token, email, name, role, userId } = res.data;
      loginUser({ email, name, role, userId }, token);
      toast.success(`Welcome back, ${name}!`);
      navigate(role === 'ADMIN' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop"
          alt="Hotel"
        />
        <div className="auth-image-overlay">
          <div className="auth-quote">
            <span className="auth-logo">GRAND LUXE</span>
            <p>"Every stay is a story worth telling"</p>
          </div>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-form-inner">
          <p className="auth-pre">Welcome Back</p>
          <h2 className="auth-title">Sign In to Your Account</h2>
          <div className="auth-divider" />

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-demo-creds">
            <p><strong>Demo Admin:</strong> admin@grandluxe.com / admin123</p>
          </div>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
