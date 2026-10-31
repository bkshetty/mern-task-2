import React, { useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import './App.css';

function App() {
  const [authMode, setAuthMode] = useState('signin');

  return (
    <div className="apple-app-root">
      {/* Clean Apple Auth Header (Replaced navigation bar) */}
      <header className="apple-auth-header" role="banner">
        <a
          href="#"
          className="apple-brand-mark"
          aria-label="Apple Account"
          onClick={(e) => {
            e.preventDefault();
            setAuthMode('signin');
          }}
        >
          <svg width="18" height="22" viewBox="0 0 17 44" fill="currentColor">
            <path d="m15.26 23.94c0-3.9 3.18-5.78 3.32-5.88-1.81-2.65-4.63-3.01-5.63-3.05-2.39-.24-4.68 1.41-5.9 1.41-1.21 0-3.1-1.37-5.08-1.34-2.62.04-5.03 1.53-6.38 3.88-2.73 4.73-.7 11.73 1.96 15.57 1.3 1.88 2.85 3.98 4.88 3.9 1.95-.08 2.69-1.26 5.05-1.26 2.36 0 3.03 1.26 5.08 1.22 2.08-.04 3.4-1.92 4.67-3.8 1.48-2.15 2.08-4.24 2.12-4.35-.05-.02-4.09-1.57-4.09-6.33z" />
            <path d="m11.95 12.87c1.07-1.3 1.8-3.1 1.6-4.9-1.55.06-3.43 1.03-4.54 2.33-.97 1.12-1.82 2.94-1.59 4.7 1.73.13 3.46-.83 4.53-2.13z" />
          </svg>
          <span className="apple-brand-title">Apple Account</span>
        </a>

        {/* Apple Segmented Switch Pill */}
        <div className="apple-auth-switch" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            role="tab"
            aria-selected={authMode === 'signin'}
            className={`apple-switch-tab ${authMode === 'signin' ? 'active' : ''}`}
            onClick={() => setAuthMode('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={authMode === 'signup'}
            className={`apple-switch-tab ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => setAuthMode('signup')}
          >
            Create Account
          </button>
        </div>
      </header>

      {/* Main Focus Area */}
      <main className="apple-main">
        {authMode === 'signin' ? (
          <SignIn onSwitchToSignUp={() => setAuthMode('signup')} />
        ) : (
          <SignUp onSwitchToSignIn={() => setAuthMode('signin')} />
        )}
      </main>

      {/* Apple Retail System Global Footer */}
      <footer className="apple-footer">
        <div className="apple-footer-inner">
          <p className="apple-footer-legal-text">
            An Apple Account gives you access to Apple services. Data encryption and secure tokenization protect your credentials across all sessions.
          </p>
          <div className="apple-footer-bottom">
            <span>Copyright © 2026 Apple Inc. All rights reserved.</span>
            <div className="apple-footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Sales and Refunds</a>
              <a href="#">Legal</a>
              <a href="#">Site Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
