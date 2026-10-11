import React, { useState } from 'react';
import './ProfileSettings.css';

type ToggleProps = {
  enabled: boolean;
  onChange: () => void;
  label: string;
};

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={enabled}
    aria-label={label}
    className={`ps-toggle ${enabled ? 'is-on' : ''}`}
    onClick={onChange}
  >
    <span />
  </button>
);

const Icon: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <span className={`ps-icon ${className}`} aria-hidden="true">
    {children}
  </span>
);

export const ProfileSettings: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoLogout, setAutoLogout] = useState('30 minutes');
  const [language, setLanguage] = useState('English (EN)');
  const [district, setDistrict] = useState('Bihar District Central Registry');
  const [taluka, setTaluka] = useState('Haveli Sub-Registry Office 04');
  const [email, setEmail] = useState('rajesh.sharma@landrecords.gov.in');
  const [mobile, setMobile] = useState('+91 98201 44521');
  const [saved, setSaved] = useState(false);

  const resetForm = () => {
    setTwoFactor(true);
    setDarkMode(false);
    setAutoLogout('30 minutes');
    setLanguage('English (EN)');
    setDistrict('Bihar District Central Registry');
    setTaluka('Haveli Sub-Registry Office 04');
    setEmail('rajesh.sharma@landrecords.gov.in');
    setMobile('+91 98201 44521');
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={`ps-app ${darkMode ? 'ps-dark' : ''}`}>
      <aside className="ps-sidebar">
        <div className="ps-brand">
          <span className="ps-brand-mark">eL</span>
          <span>
            <strong>eLand Registration</strong>
            <small>Portal</small>
          </span>
        </div>

        <div className="ps-sidebar-caption">MAIN MENU</div>
        <nav className="ps-navigation" aria-label="Settings navigation">
          <a href="/dashboard" className="ps-nav-item">
            <Icon>▦</Icon><span>Dashboard</span>
          </a>
          <a href="/dashboard" className="ps-nav-item">
            <Icon>＋</Icon><span>Register Land</span>
          </a>
          <a href="/dashboard" className="ps-nav-item">
            <Icon>▤</Icon><span>My Properties</span>
          </a>
          <a href="/dashboard" className="ps-nav-item">
            <Icon>⇄</Icon><span>Transfer Requests</span>
          </a>
          <a href="/dashboard" className="ps-nav-item">
            <Icon>◷</Icon><span>Transaction History</span>
          </a>
          <a href="/dashboard" className="ps-nav-item">
            <Icon>▧</Icon><span>Documents</span>
          </a>
          <a href="/settings" className="ps-nav-item active" aria-current="page">
            <Icon>⚙</Icon><span>Profile &amp; Settings</span>
          </a>
        </nav>

        <div className="ps-sidebar-bottom">
          <a href="mailto:support@landrecords.gov.in" className="ps-nav-item">
            <Icon>?</Icon><span>Help</span>
          </a>
          <a href="/login" className="ps-nav-item ps-logout">
            <Icon>↪</Icon><span>Logout</span>
          </a>
          <div className="ps-sidebar-footer">
            <span className="ps-footer-emblem">🏛</span>
            <span>Government of India<small>Digital India Initiative</small></span>
          </div>
        </div>
      </aside>

      <main className="ps-main">
        <div className="ps-topline">
          <div className="ps-identity">
            <span className="ps-top-emblem">🏛</span>
            <span>
              <strong>eLand Registration Portal</strong>
              <small>Department of Land Resources &amp; Registration, Govt of India</small>
            </span>
          </div>
        </div>

        <div className="ps-content">
          <div className="ps-breadcrumb">
            <span>Portal</span><span>›</span><span>Dashboard</span><span>›</span>
            <strong>Settings</strong>
          </div>

          <header className="ps-page-heading">
            <div>
              <h1>Profile &amp; Settings</h1>
              <p>Manage your citizen profile, multi-tier authentication, and blockchain ledger credentials.</p>
            </div>
            <span className="ps-secure-label"><span>✓</span> Secure Session</span>
          </header>

          <section className="ps-action-bar">
            <div className="ps-audit-note">
              <span className="ps-shield">♢</span>
              <p>All setting modifications are cryptographically signed with your UIDAI credential and logged on the audit ledger.</p>
            </div>
            <div className="ps-actions">
              <button type="button" className="ps-btn ps-btn-cancel" onClick={resetForm}>Cancel</button>
              <button type="button" className="ps-btn ps-btn-save" onClick={handleSave}>
                <span>✓</span> Save Changes
              </button>
            </div>
          </section>

          {saved && (
            <div className="ps-save-message" role="status">
              ✓ Settings updated in this session.
            </div>
          )}

          <div className="ps-cards">
            <section className="ps-card ps-profile-card">
              <div className="ps-card-heading">
                <span className="ps-heading-icon">♙</span>
                <h2>Officer &amp; Citizen Profile</h2>
                <span className="ps-verified-badge"><span>✓</span> UIDAI / NIC Verified</span>
              </div>

              <div className="ps-profile-banner">
                <div className="ps-portrait" aria-label="Profile photo placeholder">
                  <svg viewBox="0 0 80 80" role="img" aria-label="Profile illustration">
                    <rect width="80" height="80" rx="40" fill="#dce9f4" />
                    <path d="M13 80c2-19 12-29 27-29s25 10 27 29" fill="#355d7e" />
                    <path d="M28 51l12 15 12-15" fill="#f5f7fa" />
                    <ellipse cx="40" cy="34" rx="17" ry="20" fill="#c98f6c" />
                    <path d="M22 33c-2-20 10-26 22-24 12 2 17 11 14 25l-5-12c-10 3-17-1-25-5z" fill="#34333a" />
                    <path d="M32 42q8 5 16 0" stroke="#8d5644" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>
                <div className="ps-profile-intro">
                  <h3>Rajesh Kumar Sharma</h3>
                  <p>Citizen / Officer Portal Account · Ministry of Land Revenue</p>
                  <button type="button" className="ps-photo-link" onClick={() => window.alert('Connect your photo upload flow here.')}>
                    <span>▧</span> Change / Upload Photo
                  </button>
                </div>
                <span className="ps-profile-check">✓</span>
              </div>

              <div className="ps-fields">
                <label className="ps-field">
                  <span>Officer Name</span>
                  <div className="ps-input-wrap">
                    <span className="ps-field-icon">♙</span>
                    <input value="Rajesh Kumar Sharma" readOnly />
                  </div>
                </label>

                <label className="ps-field">
                  <span>Employee ID</span>
                  <div className="ps-input-wrap">
                    <span className="ps-field-icon">▤</span>
                    <input value="OFF-MH-2023-94821" readOnly />
                    <span className="ps-locked">▣ Locked</span>
                  </div>
                </label>

                <label className="ps-field">
                  <span>Officer Email</span>
                  <div className="ps-input-wrap">
                    <span className="ps-field-icon">✉</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className="ps-field-verified">✓</span>
                  </div>
                </label>

                <label className="ps-field">
                  <span>Mobile Number</span>
                  <div className="ps-input-wrap">
                    <span className="ps-field-icon">♧</span>
                    <input value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    <span className="ps-mobile-verified">✓ Verified</span>
                  </div>
                </label>

                <label className="ps-field">
                  <span>District Office</span>
                  <div className="ps-input-wrap">
                    <span className="ps-field-icon">⌖</span>
                    <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                      <option>Bihar District Central Registry</option>
                      <option>Patna District Registry</option>
                      <option>Pune District Registry</option>
                      <option>Mumbai District Registry</option>
                    </select>
                  </div>
                </label>

                <label className="ps-field">
                  <span>Taluka Office</span>
                  <div className="ps-input-wrap">
                    <span className="ps-field-icon">⌖</span>
                    <select value={taluka} onChange={(e) => setTaluka(e.target.value)}>
                      <option>Haveli Sub-Registry Office 04</option>
                      <option>Central Sub-Registry Office 01</option>
                      <option>North Sub-Registry Office 02</option>
                      <option>South Sub-Registry Office 03</option>
                    </select>
                  </div>
                </label>

                <label className="ps-field ps-field-full">
                  <span>Language Preference</span>
                  <div className="ps-input-wrap">
                    <span className="ps-field-icon">文</span>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <option>English (EN)</option>
                      <option>हिन्दी (HI)</option>
                      <option>मराठी (MR)</option>
                    </select>
                  </div>
                </label>
              </div>

              <div className="ps-profile-footnote">
                <span>♢</span> Identity details are verified against government records.
              </div>
            </section>

            <section className="ps-card ps-security-card">
              <div className="ps-card-heading">
                <span className="ps-heading-icon ps-security-icon">♢</span>
                <h2>Security &amp; Session Preferences</h2>
              </div>

              <div className="ps-security-item">
                <div className="ps-security-copy">
                  <div className="ps-security-title">Two-Factor Authentication <span>(2FA)</span></div>
                  <p>Aadhaar / Mobile OTP on every officer sign-in</p>
                  <span className="ps-mandatory">Mandatory</span>
                </div>
                <Toggle enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} label="Two-factor authentication" />
              </div>

              <div className="ps-security-item">
                <div className="ps-security-copy">
                  <div className="ps-security-title">Auto Logout</div>
                  <p>Inactivity session termination</p>
                  <div className="ps-select-wrap">
                    <select value={autoLogout} onChange={(e) => setAutoLogout(e.target.value)} aria-label="Auto logout timeout">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                    <span>⌄</span>
                  </div>
                </div>
              </div>

              <div className="ps-security-item ps-dark-item">
                <div className="ps-security-copy">
                  <div className="ps-security-title">Dark Mode</div>
                  <p>Toggle dark theme appearance</p>
                </div>
                <Toggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} label="Dark mode" />
              </div>

              <div className="ps-security-note">
                <span>♢</span>
                <p><strong>Security Tip</strong> Never share your OTP or login credentials. All sensitive actions are recorded on the blockchain audit ledger.</p>
              </div>

              <div className="ps-ledger-status">
                <span className="ps-ledger-dot" />
                <span><strong>Ledger Integrity</strong><small>Blockchain node connection status is managed by the portal.</small></span>
                <span className="ps-ledger-lock">♢</span>
              </div>
            </section>
          </div>

          <footer className="ps-bottom-footer">
            <span>© 2026 eLand Registration Portal</span>
            <span>Government of India <b>·</b> Digital India Initiative</span>
            <span><span className="ps-footer-dot" /> All systems secure</span>
          </footer>
        </div>
      </main>
    </div>
  );
};
