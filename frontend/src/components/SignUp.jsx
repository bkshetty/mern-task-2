import React, { useState } from 'react';
import './SignUp.css';

const SignUp = ({ onSwitchToSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both an email and a password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      setSuccessMessage(data.message || 'Your account has been created successfully!');
      setFormData({ email: '', password: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apple-signup-wrapper">
      {/* Top Apple Logo Badge & Header */}
      <div className="apple-signup-header">
        <div className="apple-logo-badge" aria-hidden="true">
          <svg width="28" height="34" viewBox="0 0 17 44" fill="currentColor">
            <path d="m15.26 23.94c0-3.9 3.18-5.78 3.32-5.88-1.81-2.65-4.63-3.01-5.63-3.05-2.39-.24-4.68 1.41-5.9 1.41-1.21 0-3.1-1.37-5.08-1.34-2.62.04-5.03 1.53-6.38 3.88-2.73 4.73-.7 11.73 1.96 15.57 1.3 1.88 2.85 3.98 4.88 3.9 1.95-.08 2.69-1.26 5.05-1.26 2.36 0 3.03 1.26 5.08 1.22 2.08-.04 3.4-1.92 4.67-3.8 1.48-2.15 2.08-4.24 2.12-4.35-.05-.02-4.09-1.57-4.09-6.33z" />
            <path d="m11.95 12.87c1.07-1.3 1.8-3.1 1.6-4.9-1.55.06-3.43 1.03-4.54 2.33-.97 1.12-1.82 2.94-1.59 4.7 1.73.13 3.46-.83 4.53-2.13z" />
          </svg>
        </div>
        <h1 className="apple-signup-title">Create your account.</h1>
        <p className="apple-signup-subtitle">
          One account is all you need for everything.
        </p>
      </div>

      {/* Main Elevated Card Surface */}
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

        {successMessage && (
          <div className="apple-alert apple-alert-success" role="status">
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        <form className="apple-form" onSubmit={handleSubmit} noValidate>
          {/* Email Address */}
          <div className="apple-field-group">
            <label htmlFor="signup-email" className="apple-field-label">
              Email Address
            </label>
            <div className="apple-input-wrapper">
              <input
                type="email"
                id="signup-email"
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

          {/* Password with Toggle */}
          <div className="apple-field-group">
            <label htmlFor="signup-password" className="apple-field-label">
              Password
            </label>
            <div className="apple-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="signup-password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Required"
                className="apple-input has-toggle"
                required
                autoComplete="new-password"
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
            <span className="apple-input-hint">Must be at least 6 characters.</span>
          </div>

          {/* Primary Pill Button */}
          <button
            type="submit"
            className="apple-btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating Account…' : 'Continue'}
          </button>

          {/* Card Footer */}
          <div className="apple-form-footer">
            <span>Already have an account?</span>
            <button
              type="button"
              className="apple-text-action-link"
              onClick={onSwitchToSignIn}
            >
              Sign In &#x203A;
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
          Your account information is used to enable services, provide secure access, and prevent fraud.{' '}
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

export default SignUp;
