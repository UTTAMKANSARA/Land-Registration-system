import React from 'react';
import { PropertyDetails, LandType, LandUse, EncumbranceType } from '../../types/landRegistration';

interface Props {
  data: PropertyDetails;
  onChange: (field: keyof PropertyDetails, value: string) => void;
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

interface SelectFieldProps<T extends string> {
  id: string;
  label: string;
  value: T | '';
  onChange: (v: string) => void;
  options: { value: T; label: string }[];
  required?: boolean;
  hint?: string;
}

function SelectField<T extends string>({ id, label, value, onChange, options, required, hint }: SelectFieldProps<T>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
        {label} {required && <span style={{ color: 'var(--error-light)' }}>*</span>}
      </label>
      <select
        id={id}
        className="form-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ cursor: 'pointer' }}
      >
        <option value="">— Select —</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
}

const LAND_TYPES: { value: LandType; label: string }[] = [
  { value: 'Agricultural', label: 'Agricultural' },
  { value: 'Residential', label: 'Residential' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Mixed-Use', label: 'Mixed-Use' },
  { value: 'Forest', label: 'Forest' },
  { value: 'Government', label: 'Government' },
];

const LAND_USES: { value: LandUse; label: string }[] = [
  { value: 'Owner Occupied', label: 'Owner Occupied' },
  { value: 'Leased', label: 'Leased' },
  { value: 'Vacant', label: 'Vacant' },
  { value: 'Under Development', label: 'Under Development' },
  { value: 'Disputed', label: 'Disputed' },
];

const ENCUMBRANCE_TYPES: { value: EncumbranceType; label: string }[] = [
  { value: 'None', label: 'None' },
  { value: 'Mortgage', label: 'Mortgage' },
  { value: 'Lien', label: 'Lien' },
  { value: 'Easement', label: 'Easement' },
  { value: 'Lease', label: 'Lease' },
];

const RegisterStep2PropertyDetails: React.FC<Props> = ({ data, onChange }) => {
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
      {/* Cadastral Identifiers */}
      <div className="card">
        {sectionHeader('🗺️', 'Cadastral Identifiers', 'Official survey and plot numbers for land parcel identification')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <InputField id="surveyNumber" label="Survey Number" value={data.surveyNumber} onChange={v => onChange('surveyNumber', v)} placeholder="e.g. 214/1A" hint="As per State Revenue Records (7/12)" required mono />
          <InputField id="subDivisionNumber" label="Sub-Division Number" value={data.subDivisionNumber} onChange={v => onChange('subDivisionNumber', v)} placeholder="e.g. 214/1A/B" mono />
          <InputField id="khasraNumber" label="Khasra / Survey No." value={data.khasraNumber} onChange={v => onChange('khasraNumber', v)} placeholder="e.g. K-7821" hint="As recorded in village Patwari's Khasra" required mono />
          <InputField id="plotNumber" label="Plot / Gat Number" value={data.plotNumber} onChange={v => onChange('plotNumber', v)} placeholder="e.g. P-2034" mono />
          <InputField id="municipalWardNumber" label="Municipal Ward Number" value={data.municipalWardNumber} onChange={v => onChange('municipalWardNumber', v)} placeholder="e.g. W-08" />
        </div>
      </div>

      {/* Area Details */}
      <div className="card">
        {sectionHeader('📐', 'Land Area & Measurement', 'Specify exact land area in both units')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <InputField id="totalAreaSqFt" label="Total Area (Sq. Ft.)" value={data.totalAreaSqFt} onChange={v => onChange('totalAreaSqFt', v)} placeholder="e.g. 4840" required hint="Measured as per cadastral survey" />
          <InputField id="totalAreaAcres" label="Total Area (Acres)" value={data.totalAreaAcres} onChange={v => onChange('totalAreaAcres', v)} placeholder="e.g. 0.111" hint="Auto-converted from Sq. Ft." />
        </div>
      </div>

      {/* Classification */}
      <div className="card">
        {sectionHeader('🏷️', 'Land Classification', 'Nature and current use of the land parcel')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <SelectField<LandType> id="landType" label="Land Type" value={data.landType} onChange={v => onChange('landType', v)} options={LAND_TYPES} required hint="As classified by Revenue Department" />
          <SelectField<LandUse> id="currentLandUse" label="Current Land Use" value={data.currentLandUse} onChange={v => onChange('currentLandUse', v)} options={LAND_USES} required />
        </div>
      </div>

      {/* Encumbrance */}
      <div className="card">
        {sectionHeader('⚖️', 'Encumbrance Details', 'Any existing legal claims or liabilities on the property')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <SelectField<EncumbranceType> id="encumbrance" label="Encumbrance Type" value={data.encumbrance} onChange={v => onChange('encumbrance', v)} options={ENCUMBRANCE_TYPES} required hint="Obtained from Sub-Registrar Office" />
        </div>
        {data.encumbrance && data.encumbrance !== 'None' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label htmlFor="encumbranceDetails" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
              Encumbrance Details <span style={{ color: 'var(--error-light)' }}>*</span>
            </label>
            <textarea
              id="encumbranceDetails"
              className="form-input"
              value={data.encumbranceDetails}
              onChange={e => onChange('encumbranceDetails', e.target.value)}
              placeholder="Describe the nature of encumbrance, lender details, charge amount, etc."
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>
        )}
      </div>

      {/* Valuation */}
      <div className="card">
        {sectionHeader('💰', 'Property Valuation & Stamp Duty', 'Financial details for registration fee calculation')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <InputField id="registeredPropertyValue" label="Registered Property Value (₹)" value={data.registeredPropertyValue} onChange={v => onChange('registeredPropertyValue', v)} placeholder="e.g. 4500000" hint="Market value as per Circle Rate" required />
          <InputField id="stampDutyPaid" label="Stamp Duty Paid (₹)" value={data.stampDutyPaid} onChange={v => onChange('stampDutyPaid', v)} placeholder="e.g. 270000" hint="6% of registered value (Maharashtra)" />
        </div>
      </div>
    </div>
  );
};

export default RegisterStep2PropertyDetails;