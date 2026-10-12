import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon" aria-hidden="true">&#x1F3DB;&#xFE0F;</div>
        eLandRegistry
        <span className="brand-badge">Bihar</span>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
        </li>

        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/register-land" className={({ isActive }) => (isActive ? 'active' : '')}>
                Register Land
              </NavLink>
            </li>
          </>
        )}

        {isAuthenticated && user ? (
          <>
            <li>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  padding: '0.45rem 0.5rem',
                  display: 'inline-block',
                }}
              >
                &#x1F464; {user.fullName.split(' ')[0]}
              </span>
            </li>
            <li>
              <button
                id="navbar-signout"
                className="btn btn-secondary"
                onClick={handleLogout}
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.83rem' }}
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <span
                  style={{
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  Get Started
                </span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};