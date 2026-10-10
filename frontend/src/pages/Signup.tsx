import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  aadhaarId: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  aadhaarId?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

function getPasswordStrength(password: string): 0 | 1 | 2 | 3 {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;
  return score as 0 | 1 | 2 | 3;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Required';
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = 'Must be at least 3 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email';
  }

  if (data.phone && !/^[6-9]\d{9}$/.test(data.phone)) {
    errors.phone = 'Invalid 10-digit number';
  }

  if (data.aadhaarId && !/^\d{12}$/.test(data.aadhaarId)) {
    errors.aadhaarId = 'Must be exactly 12 digits';
  }

  if (!data.password) {
    errors.password = 'Required';
  } else if (data.password.length < 8) {
    errors.password = 'Min 8 chars';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords mismatch';
  }

  if (!data.agreeTerms) {
    errors.agreeTerms = 'Required';
  }

  return errors;
}

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    aadhaarId: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = useMemo(() => getPasswordStrength(form.password), [form.password]);
  const strengthLabel = ['', 'Weak', 'Fair', 'Strong'][passwordStrength];
  const strengthColor = ['', '#ef4444', '#f59e0b', '#10b981'][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const success = await signup({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      role: 'CITIZEN',
      phone: form.phone || undefined,
      aadhaarId: form.aadhaarId || undefined,
    });

    if (success) navigate('/dashboard');
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

        <div className="auth-form-container" style={{ margin: 'auto' }}>
          <h2 className="auth-form-title">Create your account</h2>
          <p className="auth-form-subtitle">Join the secure, blockchain-powered land registration platform.</p>

          <div className="auth-role-toggle">
            <button type="button" className="active">👤 Citizen Registration</button>
            <button type="button" style={{ cursor: 'not-allowed', opacity: 0.6 }}>🏢 Government (LRC)</button>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Full Name</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">👤</span>
                <input
                  type="text"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Ramesh Kumar Singh"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              {errors.fullName && <span className="form-error">⚠ {errors.fullName}</span>}
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Email Address</label>
              <div className="form-input-wrapper">
                <span className="form-input-icon">✉️</span>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
              {errors.email && <span className="form-error">⚠ {errors.email}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="form-input-wrapper">
                  <span className="form-input-icon">📱</span>
                  <input
                    type="tel"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{ paddingLeft: '2.5rem' }}
                    maxLength={10}
                  />
                </div>
                {errors.phone && <span className="form-error" style={{ fontSize: '0.72rem' }}>⚠ {errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Aadhaar Number</label>
                <div className="form-input-wrapper">
                  <span className="form-input-icon">🪪</span>
                  <input
                    type="text"
                    className={`form-input ${errors.aadhaarId ? 'error' : ''}`}
                    placeholder="XXXX XXXX XXXX"
                    value={form.aadhaarId}
                    onChange={(e) => setForm({ ...form, aadhaarId: e.target.value })}
                    style={{ paddingLeft: '2.5rem' }}
                    maxLength={12}
                  />
                </div>
                {errors.aadhaarId && <span className="form-error" style={{ fontSize: '0.72rem' }}>⚠ {errors.aadhaarId}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="form-input-wrapper">
                  <span className="form-input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Min 8 chars"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  />
                  <button type="button" className="form-input-action" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <span className="form-error" style={{ fontSize: '0.72rem' }}>⚠ {errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="form-input-wrapper">
                  <span className="form-input-icon">🔒</span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Re-enter"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  />
                  <button type="button" className="form-input-action" onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && <span className="form-error" style={{ fontSize: '0.72rem' }}>⚠ {errors.confirmPassword}</span>}
              </div>
            </div>

            {form.password && (
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.25rem', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '4px', background: passwordStrength >= 1 ? strengthColor : '#e2e8f0', borderRadius: '2px' }} />
                <div style={{ flex: 1, height: '4px', background: passwordStrength >= 2 ? strengthColor : '#e2e8f0', borderRadius: '2px' }} />
                <div style={{ flex: 1, height: '4px', background: passwordStrength >= 3 ? strengthColor : '#e2e8f0', borderRadius: '2px' }} />
                <span style={{ fontSize: '0.7rem', color: strengthColor, marginLeft: '0.5rem', fontWeight: 600 }}>{strengthLabel}</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ accentColor: '#059669', width: '16px', height: '16px' }}
                  checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                />
                <span>I agree to the <a href="/terms" style={{ color: '#059669' }}>Terms</a> and <a href="/privacy" style={{ color: '#059669' }}>Privacy Policy</a>.</span>
              </label>
              {errors.agreeTerms && <span style={{ color: '#ef4444', marginLeft: 'auto' }}>⚠</span>}
            </div>

            <button type="submit" className="auth-btn-primary" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
            Already have an account? <Link to="/login" style={{ color: '#059669', fontWeight: 600 }}>Sign in here</Link>
          </div>

        </div>

        <div className="auth-bottom-links">
          <div><span style={{ color: '#a7f3d0' }}>🛡️</span> MeitY & Dept. of Land Resources Compliant</div>
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
