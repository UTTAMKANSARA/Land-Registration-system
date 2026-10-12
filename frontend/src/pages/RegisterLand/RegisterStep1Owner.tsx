import React from 'react';
import { OwnerDetails } from '../../types/landRegistration';

interface Props {
  owner: OwnerDetails;
}

interface LockedFieldProps {
  label: string;
  value: string;
  badge?: string;
  badgeVariant?: 'verified' | 'locked' | 'immutable';
  hint: string;
  icon: string;
}

const LockedField: React.FC<LockedFieldProps> = ({ label, value, badge, badgeVariant = 'verified', hint, icon }) => {
  const badgeColor =
    badgeVariant === 'verified' ? 'var(--success-light)' :
    badgeVariant === 'locked' ? 'var(--text-muted)' :
    'var(--primary-light)';
  const badgeBg =
    badgeVariant === 'verified' ? 'var(--success-bg)' :
    badgeVariant === 'locked' ? 'rgba(51,65,85,0.4)' :
    'rgba(37,99,235,0.12)';
  const badgeBorder =
    badgeVariant === 'verified' ? 'var(--success-border)' :
    badgeVariant === 'locked' ? 'var(--border-default)' :
    'rgba(37,99,235,0.25)';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      padding: '1rem',
      background: 'var(--bg-elevated)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-subtle)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
          {label}
        </label>
        {badge && (
          <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.12rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px', color: badgeColor, background: badgeBg, border: `1px solid ${badgeBorder}`, whiteSpace: 'nowrap' as const }}>
            {icon} {badge}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span style={{ fontFamily: label.includes('Aadhaar') || label.includes('CID') || label.includes('Citizen') ? 'monospace' : 'inherit', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: label.includes('Aadhaar') || label.includes('Citizen') ? '0.05em' : 'normal' }}>
          {value || '—'}
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', flexShrink: 0 }}>🔒</span>
      </div>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{hint}</span>
    </div>
  );
};

const RegisterStep1Owner: React.FC<Props> = ({ owner }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Owner Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(14,165,233,0.07) 100%)', borderColor: 'rgba(37,99,235,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0, boxShadow: '0 0 18px var(--primary-glow)' }}>
            👤
          </div>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{owner.fullName}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{owner.citizenId}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 'var(--radius-full)', background: 'var(--success-bg)', color: 'var(--success-light)', border: '1px solid var(--success-border)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                ✓ UIDAI Verified
              </span>
            </div>
          </div>
        </div>
        <button className="btn btn-secondary" type="button" style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }} id="update-profile-btn">
          ✏️ Update Profile
        </button>
      </div>

      {/* Info Notice */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.9rem 1rem', background: 'rgba(14,165,233,0.07)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(14,165,233,0.2)' }}>
        <span style={{ flexShrink: 0 }}>ℹ️</span>
        <div>
          <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Identity Lock Notice</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Information is automatically retrieved from your verified citizen profile and cannot be edited here.
            If any details are incorrect, update your master profile before proceeding.
          </p>
        </div>
      </div>

      {/* Locked Fields */}
      <div className="card">
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
          🛡️ Current Owner Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
          <LockedField label="Full Name (as on Aadhaar)" value={owner.fullName} badge="Master Linked" badgeVariant="locked" hint="Verified against National Population Register database" icon="🔗" />
          <LockedField label="Aadhaar Number" value={owner.aadhaarNumber} badge="NIC Verified" badgeVariant="verified" hint="Masked per UIDAI security compliance protocols" icon="✓" />
          <LockedField label="Registered Mobile Number" value={owner.mobileNumber} badge="Verified" badgeVariant="verified" hint="OTP verification key for registration mutations" icon="✓" />
          <LockedField label="Official / Contact Email" value={owner.email} badge="Verified" badgeVariant="verified" hint="All gazette intimations will be delivered to this inbox" icon="✓" />
          <LockedField label="Citizen Identifier (CID)" value={owner.citizenId} badge="Immutable" badgeVariant="immutable" hint="Digital Locker identity anchor for state registry" icon="🔑" />
          <LockedField label="State of Domicile" value={owner.stateOfDomicile} badge="Primary Jurisdiction" badgeVariant="locked" hint="Cadastral survey rules applied per state jurisdiction" icon="📍" />
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1Owner;