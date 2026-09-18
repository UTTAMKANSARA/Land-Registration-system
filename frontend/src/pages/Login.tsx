import React from 'react';

export const Login: React.FC = () => {
  return (
    <div className="card" style={{ maxWidth: '480px', margin: '2rem auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Sign In</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Authentication workflow and JWT architecture will be implemented in the next phase.
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              marginBottom: '0.3rem',
              color: 'var(--text-muted)',
            }}
          >
            Email Address / Aadhaar ID
          </label>
          <input
            type="text"
            disabled
            placeholder="User auth coming in Phase 2..."
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: '#0f172a',
              color: 'var(--text-muted)',
            }}
          />
        </div>

        <button
          type="button"
          disabled
          className="btn"
          style={{ opacity: 0.6, cursor: 'not-allowed', width: '100%' }}
        >
          Login Disabled (Setup Phase Only)
        </button>
      </form>
    </div>
  );
};
