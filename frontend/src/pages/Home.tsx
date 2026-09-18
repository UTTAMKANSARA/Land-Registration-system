import React, { useEffect, useState } from 'react';
import { fetchHealthCheck } from '../services/api';
import { HealthResponse } from '../types';

export const Home: React.FC = () => {
  const [health, setHealth] = useState<HealthResponse['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealthCheck()
      .then((res) => {
        setHealth(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to reach backend healthcheck endpoint');
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="card">
        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: '#fff' }}>
          Securing Land Registration Using Blockchain
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Permissioned Blockchain (Hyperledger Fabric) platform for Bihar Land Records & Mutation.
        </p>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="/login" className="btn">
            Get Started
          </a>
          <a href="/dashboard" className="btn" style={{ background: '#334155' }}>
            View Dashboard
          </a>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>
          🔌 Backend Health Check Verification
        </h2>

        {loading && (
          <p style={{ color: 'var(--text-muted)' }}>Checking system services status...</p>
        )}

        {error && (
          <div className="status-badge error">
            ⚠️ Backend Connection Status: Disconnected ({error})
          </div>
        )}

        {health && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>REST API</div>
              <div
                className={`status-badge ${health.api === 'ok' ? 'ok' : 'error'}`}
                style={{ marginTop: '0.5rem' }}
              >
                {health.api.toUpperCase()}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                PostgreSQL Database
              </div>
              <div
                className={`status-badge ${health.database === 'ok' ? 'ok' : 'error'}`}
                style={{ marginTop: '0.5rem' }}
              >
                {health.database.toUpperCase()}
              </div>
            </div>

            <div
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Hyperledger Fabric
              </div>
              <div className="status-badge warning" style={{ marginTop: '0.5rem' }}>
                {health.blockchain.toUpperCase()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
