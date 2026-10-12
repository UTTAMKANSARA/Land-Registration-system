import React from 'react';
import { LandLocation } from '../../types/landRegistration';

interface Props {
  data: LandLocation;
  onChange: (field: keyof LandLocation, value: string) => void;
}

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  mono?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, placeholder, hint, required, mono }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
    <label htmlFor={id} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
      {label} {required && <span style={{ color: 'var(--error-light)' }}>*</span>}
    </label>
    <input
      id={id}
      className="form-input"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ fontFamily: mono ? 'monospace' : 'inherit', letterSpacing: mono ? '0.05em' : 'normal' }}
    />
    {hint && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{hint}</span>}
  </div>
);

const INDIA_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir',
  'Ladakh','Lakshadweep','Puducherry',
];

const RegisterStep3LandLocation: React.FC<Props> = ({ data, onChange }) => {
  const sectionHeader = (icon: string, title: string, subtitle?: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
        {subtitle && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Postal Address */}
      <div className="card">
        {sectionHeader('🏠', 'Property Postal Address', 'Full civic address of the land parcel')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField id="addressLine1" label="Address Line 1" value={data.addressLine1} onChange={v => onChange('addressLine1', v)} placeholder="House No. / Plot No. / Survey No., Street Name" required />
          <InputField id="addressLine2" label="Address Line 2" value={data.addressLine2} onChange={v => onChange('addressLine2', v)} placeholder="Locality, Landmark (optional)" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <InputField id="village" label="Village / Town" value={data.village} onChange={v => onChange('village', v)} placeholder="e.g. Wadgaonsheri" required />
            <InputField id="taluka" label="Taluka / Tehsil" value={data.taluka} onChange={v => onChange('taluka', v)} placeholder="e.g. Haveli" required />
            <InputField id="district" label="District" value={data.district} onChange={v => onChange('district', v)} placeholder="e.g. Pune" required />
            <InputField id="pinCode" label="PIN Code" value={data.pinCode} onChange={v => onChange('pinCode', v)} placeholder="e.g. 411014" required />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="state" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
              State <span style={{ color: 'var(--error-light)' }}>*</span>
            </label>
            <select id="state" className="form-input" value={data.state} onChange={e => onChange('state', e.target.value)} style={{ cursor: 'pointer' }}>
              <option value="">— Select State —</option>
              {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Geo-coordinates */}
      <div className="card">
        {sectionHeader('🌐', 'Geo-Spatial Coordinates', 'GPS coordinates for blockchain-anchored cadastral mapping')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <InputField id="latitude" label="Latitude" value={data.latitude} onChange={v => onChange('latitude', v)} placeholder="e.g. 18.5204" hint="Decimal degrees (WGS 84)" mono />
          <InputField id="longitude" label="Longitude" value={data.longitude} onChange={v => onChange('longitude', v)} placeholder="e.g. 73.8567" hint="Decimal degrees (WGS 84)" mono />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem 0.9rem', background: 'rgba(37,99,235,0.07)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(37,99,235,0.15)' }}>
          <span style={{ flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            GPS coordinates will be cryptographically hashed and anchored to the blockchain ledger for immutable geospatial verification. Ensure accuracy to at least 4 decimal places.
          </p>
        </div>
      </div>

      {/* Boundary Description */}
      <div className="card">
        {sectionHeader('🧭', 'Boundary Description', 'Cardinal boundary landmarks as per field survey')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {(['North', 'South', 'East', 'West'] as const).map(dir => {
            const dirEmoji = { North: '⬆️', South: '⬇️', East: '➡️', West: '⬅️' };
            const field = `boundary${dir}` as keyof LandLocation;
            return (
              <div key={dir} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor={`boundary${dir}`} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                  {dirEmoji[dir]} Boundary: {dir}
                </label>
                <input
                  id={`boundary${dir}`}
                  className="form-input"
                  value={data[field]}
                  onChange={e => onChange(field, e.target.value)}
                  placeholder={`Describe ${dir} boundary landmark`}
                />
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
          Example: "North: Survey No. 215, South: Public Road (12m width), East: Nalah (drainage channel), West: Agricultural Plot No. 213"
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="card" style={{ textAlign: 'center' as const }}>
        {sectionHeader('🗺️', 'Interactive Cadastral Map', 'Visual boundary verification — GIS module')}
        <div style={{
          height: '200px',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(14,165,233,0.04) 100%)',
          borderRadius: 'var(--radius-md)',
          border: '1px dashed var(--border-emphasis)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: 'var(--text-muted)',
        }}>
          <span style={{ fontSize: '2rem' }}>🗺️</span>
          <p style={{ fontSize: '0.85rem', fontWeight: 500 }}>GIS Map Integration</p>
          <p style={{ fontSize: '0.75rem' }}>Enter coordinates above to load the cadastral map overlay</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep3LandLocation;