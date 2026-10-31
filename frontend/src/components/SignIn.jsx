import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({ onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successUser, setSuccessUser] = useState(null);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials. Please try again.');
      }

      setSuccessUser(data.user);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setSuccessUser(null);
    setFormData({ email: '', password: '' });
  };

  // If user is successfully logged in, display the Apple Account overview
  if (successUser) {
    return (
      <div className="apple-signin-wrapper">
        <div className="apple-signin-header">
          <div className="apple-account-avatar">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
            </svg>
          </div>
          <h1 className="apple-signin-title">Welcome back</h1>
          <p className="apple-signin-subtitle">{successUser.email}</p>
        </div>

        <div className="apple-card apple-profile-card">
          <div className="apple-profile-badge">
            <span className="apple-badge-dot"></span>
            Authenticated Session Active
          </div>

          <div className="apple-profile-info-list">
            <div className="apple-profile-item">
              <span className="apple-profile-label">Email</span>
              <span className="apple-profile-val">{successUser.email}</span>
            </div>
            <div className="apple-profile-item">
              <span className="apple-profile-label">Account ID</span>
              <span className="apple-profile-val apple-mono">{successUser.id}</span>
            </div>
            <div className="apple-profile-item">
              <span className="apple-profile-label">Member Since</span>
              <span className="apple-profile-val">
                {new Date(successUser.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="apple-btn-secondary"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="apple-signin-wrapper">
      {/* Top Apple Icon & Header */}
      <div className="apple-signin-header">
        <div className="apple-logo-badge" aria-hidden="true">
          <svg width="28" height="34" viewBox="0 0 17 44" fill="currentColor">
            <path d="m15.26 23.94c0-3.9 3.18-5.78 3.32-5.88-1.81-2.65-4.63-3.01-5.63-3.05-2.39-.24-4.68 1.41-5.9 1.41-1.21 0-3.1-1.37-5.08-1.34-2.62.04-5.03 1.53-6.38 3.88-2.73 4.73-.7 11.73 1.96 15.57 1.3 1.88 2.85 3.98 4.88 3.9 1.95-.08 2.69-1.26 5.05-1.26 2.36 0 3.03 1.26 5.08 1.22 2.08-.04 3.4-1.92 4.67-3.8 1.48-2.15 2.08-4.24 2.12-4.35-.05-.02-4.09-1.57-4.09-6.33z" />
            <path d="m11.95 12.87c1.07-1.3 1.8-3.1 1.6-4.9-1.55.06-3.43 1.03-4.54 2.33-.97 1.12-1.82 2.94-1.59 4.7 1.73.13 3.46-.83 4.53-2.13z" />
          </svg>
        </div>
        <h1 className="apple-signin-title">Sign in to your account.</h1>
        <p className="apple-signin-subtitle">
          Enter your email and password to manage your services.
        </p>
      </div>

      {/* Main Elevated Apple Card */}
      <div className="apple-card">
        {errorMessage && (
          <div className="apple-alert apple-alert-error" role="alert">
            <svg
              className="apple-alert-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="apple-form" onSubmit={handleSubmit} noValidate>
          {/* Email Address Field */}
          <div className="apple-field-group">
            <label htmlFor="signin-email" className="apple-field-label">
              Email Address
            </label>
            <div className="apple-input-wrapper">
              <input
                type="email"
                id="signin-email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="apple-input"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field with Toggle */}
          <div className="apple-field-group">
            <label htmlFor="signin-password" className="apple-field-label">
              Password
            </label>
            <div className="apple-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="signin-password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="apple-input has-toggle"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="apple-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password row */}
          <div className="apple-signin-options">
            <label className="apple-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="apple-checkbox"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#forgot"
              className="apple-link apple-forgot-link"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset link has been dispatched to your email.');
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="apple-btn-primary"
            disabled={loading}
          >
            {loading ? 'Signing In…' : 'Sign In'}
          </button>

          {/* Switch to Sign Up */}
          <div className="apple-form-footer">
            <span>Don't have an account?</span>
            <button
              type="button"
              className="apple-text-action-link"
              onClick={onSwitchToSignUp}
            >
              Create yours now &#x203A;
            </button>
          </div>
        </form>
      </div>

      {/* Apple Data & Privacy Strip */}
      <div className="apple-privacy-strip">
        <svg
          className="apple-privacy-icon"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <div className="apple-privacy-text">
          Your account information is protected by industry-standard encryption.{' '}
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('Apple Data & Privacy information.');
            }}
          >
            See how your data is managed…
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

