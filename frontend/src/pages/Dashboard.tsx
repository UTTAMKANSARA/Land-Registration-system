import React from 'react';

export const Dashboard: React.FC = () => {
  return (
    <div className="card">
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Role Dashboard</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Role-based dashboards (Citizen, Registration Officer, Government Admin) will be developed in
        future feature releases.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>👤 Citizen Portal</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Property registration, mutation status tracking, and digital ownership certificates.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            ⚖️ Registration Officer (LRO)
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Land record verification, document validation, and mutation approval workflows.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>🛡️ Government Admin</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Blockchain peer node monitoring, audit logging, system metrics, and dispute resolution.
          </p>
        </div>
      </div>
    </div>
  );
};
