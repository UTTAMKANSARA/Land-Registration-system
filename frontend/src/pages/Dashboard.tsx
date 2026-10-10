import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ROLE_CONFIG: Record<
  string,
  { label: string; icon: string; color: string; actions: string[] }
> = {
  CITIZEN: {
    label: 'Citizen / Property Owner',
    icon: '👤',
    color: 'var(--success)',
    actions: [
      'View my land records',
      'Initiate property transfer',
      'Track mutation status',
      'Download ownership certificate',
    ],
  },
  LRO: {
    label: 'Land Registration Officer',
    icon: '⚖️',
    color: 'var(--warning)',
    actions: [
      'Review pending applications',
      'Validate uploaded documents',
      'Approve or reject mutations',
      'Generate digital stamps',
    ],
  },
  ADMIN: {
    label: 'Government Administrator',
    icon: '🛡️',
    color: '#a78bfa',
    actions: [
      'Monitor blockchain nodes',
      'View audit logs',
      'Manage user accounts',
      'System health & metrics',
    ],
  },
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
        <h2 style={{ marginBottom: '0.5rem' }}>Authentication Required</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Please sign in to access your dashboard.
        </p>
        <Link to="/login" className="btn">Sign In to Continue</Link>
      </div>
    );
  }

  const roleConfig = ROLE_CONFIG[user.role] || ROLE_CONFIG.CITIZEN;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(14,165,233,0.08) 100%)',
          borderColor: 'rgba(37,99,235,0.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{roleConfig.icon}</span>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.7rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255,255,255,0.1)',
                  color: roleConfig.color,
                  border: `1px solid ${roleConfig.color}33`,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {roleConfig.label}
              </span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>
              Welcome, {user.fullName.split(' ')[0]}! 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {user.email} · Joined {new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}
            </p>
          </div>
          <button className="btn btn-secondary" onClick={handleLogout} id="dashboard-logout">
            Sign Out
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Quick Actions
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {roleConfig.actions.map((action, i) => (
            <button
              key={i}
              className="card"
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease',
                background: 'rgba(30, 41, 59, 0.5)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(37, 99, 235, 0.07)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(30, 41, 59, 0.5)';
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {['📋', '🔄', '📊', '📄'][i]}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {action}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Coming in next phase →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Platform Status */}
      <div className="card">
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Platform Status
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'REST API', status: 'ok', icon: '🔌' },
            { label: 'PostgreSQL DB', status: 'ok', icon: '🗄️' },
            { label: 'Blockchain (HLF)', status: 'warning', icon: '⛓️' },
            { label: 'IPFS Storage', status: 'warning', icon: '📦' },
          ].map(({ label, status, icon }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{icon}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{label}</span>
              <span className={`status-badge ${status}`} style={{ fontSize: '0.72rem' }}>
                {status === 'ok' ? '● Online' : '● Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
