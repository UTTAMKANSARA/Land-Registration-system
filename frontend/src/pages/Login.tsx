import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.email.trim()) {
    errors.email = 'Required';
  }
  if (!data.password) {
    errors.password = 'Required';
  }
  return errors;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const [form, setForm] = useState<FormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Hardcoded as CITIZEN as per requirements
    const success = await login({ email: form.email, password: form.password, role: 'CITIZEN' });
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-split-layout">
      
      {/* LEFT PANEL */}
      <div className="auth-split-left">
        <div className="auth-left-logo">
          <div className="auth-left-logo-icon">🏛️</div>
          <div className="auth-left-logo-text">eLand Registration Portal</div>
        </div>

        <div className="auth-left-content">
          <h1 className="auth-left-title">
            Digital Land Registration for a <span>Secure Future</span>
          </h1>
          <p className="auth-left-subtitle">
            Blockchain-powered land records ensuring end-to-end transparency, zero dispute latency, instant verification, and verifiable title transfers.
          </p>

          <div className="auth-left-stats">
            <div>
              <div className="auth-stat-val">4.2M+</div>
              <div className="auth-stat-label">Parcels Mapped</div>
            </div>
            <div>
              <div className="auth-stat-val">100%</div>
              <div className="auth-stat-label">Tamper Proof</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-split-right">
        <div className="auth-right-header">
          <div className="auth-right-header-left">
            <div>Official Portal</div>
            <div style={{ background: 'transparent', fontWeight: 500 }}>National Land Cadastre System</div>
          </div>
          <div className="auth-right-header-right">
            <div>🌐 English (EN)</div>
            <div>❓ Help Desk</div>
          </div>
        </div>

        <div className="auth-form-container">
          <h2 className="auth-form-title">Welcome Back</h2>
          <p className="auth-form-subtitle">Login to your account to manage land records & deeds</p>

          <div className="auth-role-toggle">
            <button type="button" className="active">👤 Citizen</button>
            <button type="button" style={{ cursor: 'not-allowed', opacity: 0.6 }}>🏢 Government (LRC)</button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Aadhaar Number / Registered Email</label>
                <div className="digilocker-badge">
                  <span>✅</span> DigiLocker Linked
                </div>
              </div>
              <div className="form-input-wrapper">
                <span className="form-input-icon">🪪</span>
                <input
                  type="text"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="1234 5678 9012"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              {errors.email && <span className="form-error">⚠ {errors.email}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="password123"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  className="form-input-action"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="form-error">⚠ {errors.password}</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#059669', width: '16px', height: '16px' }} defaultChecked />
                Remember me
              </label>
              <Link to="/forgot" style={{ color: '#059669', fontWeight: 600 }}>Forgot password?</Link>
            </div>

            <button type="submit" className="auth-btn-primary" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login to Portal'}
            </button>
          </form>

          <div className="auth-divider"><span>OR CONTINUE WITH</span></div>

          <button type="button" className="sso-btn">
            <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>ℹ️</span> MeriPehchaan (National SSO) / DigiLocker
          </button>
          <button type="button" className="sso-btn">
            <span>🌐</span> Continue with Google
          </button>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#059669', fontWeight: 600 }}>Register / Citizen Sign Up</Link>
          </div>

        </div>

        <div className="auth-bottom-links">
          <div><span style={{color:'#a7f3d0'}}>🛡️</span> MeitY & Dept. of Land Resources Compliant</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>256-bit SSL Encrypted</span>
            <span>•</span>
            <Link to="/privacy">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms">Terms</Link>
          </div>
        </div>

      </div>
    </div>
  );
};
