
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="brand">
        <div className="brand-icon" aria-hidden="true">
          🏛️
        </div>
        eLandRegistry
        <span className="brand-badge">Bihar</span>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>

        {isAuthenticated && (
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Dashboard
            </NavLink>
          </li>
        )}



        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
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
      </ul>
    </nav>
  );
};
