import React, { useRef } from 'react';
import { DocumentEntry, ReviewConsents, PropertyDetails, LandLocation, OwnerDetails } from '../../types/landRegistration';

interface Props {
  documents: DocumentEntry[];
  consents: ReviewConsents;
  owner: OwnerDetails;
  property: PropertyDetails;
  location: LandLocation;
  onDocumentUpload: (index: number, file: File) => void;
  onDocumentRemove: (index: number) => void;
  onConsentChange: (field: keyof ReviewConsents, value: boolean) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

interface DocUploadRowProps {
  doc: DocumentEntry;
  index: number;
  onUpload: (index: number, file: File) => void;
  onRemove: (index: number) => void;
}

const DocUploadRow: React.FC<DocUploadRowProps> = ({ doc, index, onUpload, onRemove }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const statusColor = doc.status === 'uploaded' ? 'var(--success-light)' :
    doc.status === 'verified' ? 'var(--success)' :
    doc.status === 'rejected' ? 'var(--error-light)' : 'var(--text-muted)';
  const statusBg = doc.status === 'uploaded' ? 'var(--success-bg)' :
    doc.status === 'verified' ? 'var(--success-bg)' :
    doc.status === 'rejected' ? 'var(--error-bg)' : 'rgba(51,65,85,0.35)';
  const statusLabel = doc.status === 'uploaded' ? '✓ Uploaded' :
    doc.status === 'verified' ? '✓ Verified' :
    doc.status === 'rejected' ? '✗ Rejected' : 'Pending';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.85rem 1rem',
      background: doc.file ? 'rgba(16,185,129,0.05)' : 'var(--bg-elevated)',
      borderRadius: 'var(--radius-md)',
      border: `1px solid ${doc.file ? 'var(--success-border)' : 'var(--border-subtle)'}`,
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: '160px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.label}</span>
          {doc.required && (
            <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '3px', background: 'rgba(239,68,68,0.12)', color: 'var(--error-light)', border: '1px solid var(--error-border)', textTransform: 'uppercase' as const }}>Required</span>
          )}
        </div>
        {doc.file && (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{doc.file.name} ({(doc.file.size / 1024).toFixed(0)} KB)</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.55rem', borderRadius: '4px', background: statusBg, color: statusColor }}>{statusLabel}</span>
        {doc.file ? (
          <button type="button" className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={() => onRemove(index)} id={`remove-doc-${index}`}>
            Remove
          </button>
        ) : (
          <>
            <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) onUpload(index, e.target.files[0]); }} />
            <button type="button" className="btn" style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }} onClick={() => inputRef.current?.click()} id={`upload-doc-${index}`}>
              📁 Upload
            </button>
          </>
        )}
      </div>
    </div>
  );
};

interface ReviewRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

const ReviewRow: React.FC<ReviewRowProps> = ({ label, value, mono }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.4rem 0', borderBottom: '1px solid var(--border-subtle)', gap: '1rem' }}>
    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{label}</span>
    <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600, fontFamily: mono ? 'monospace' : 'inherit', textAlign: 'right' as const, wordBreak: 'break-all' as const }}>{value || '-'}</span>
  </div>
);

export const RegisterStep4DocumentsReview: React.FC<Props> = ({
  documents,
  consents,
  owner,
  property,
  location,
  onDocumentUpload,
  onDocumentRemove,
  onConsentChange,
  onSubmit,
  isSubmitting,
}) => {
  const totalRequired = documents.filter(d => d.required).length;
  const uploadedRequired = documents.filter(d => d.required && d.file !== null).length;
  const allConsentsAccepted = consents.declarationAccepted && consents.detailsAccurate && consents.blockchainConsent;
  const canSubmit = uploadedRequired === totalRequired && allConsentsAccepted;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Upload Progress Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.10) 0%, rgba(14,165,233,0.06) 100%)', borderColor: 'rgba(37,99,235,0.22)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>Document Upload Progress</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{uploadedRequired}/{totalRequired} required documents uploaded</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
            <div style={{ width: '200px', height: '6px', background: 'var(--border-default)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(uploadedRequired / totalRequired) * 100}%`, background: 'var(--gradient-primary)', borderRadius: '3px', transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{Math.round((uploadedRequired / totalRequired) * 100)}% complete</span>
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="card">
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
          📁 Required Documents
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {documents.map((doc, i) => (
            <DocUploadRow key={doc.type} doc={doc} index={i} onUpload={onDocumentUpload} onRemove={onDocumentRemove} />
          ))}
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
          Accepted formats: PDF, JPG, JPEG, PNG. Max file size: 10 MB per document.
        </p>
      </div>

      {/* Application Review Summary */}
      <div className="card">
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
          📋 Application Review Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Owner Details</p>
            <ReviewRow label="Full Name" value={owner.fullName} />
            <ReviewRow label="Aadhaar" value={owner.aadhaarNumber} mono />
            <ReviewRow label="CID" value={owner.citizenId} mono />
            <ReviewRow label="Email" value={owner.email} />
            <ReviewRow label="State" value={owner.stateOfDomicile} />
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Property Details</p>
            <ReviewRow label="Survey No." value={property.surveyNumber} mono />
            <ReviewRow label="Khasra No." value={property.khasraNumber} mono />
            <ReviewRow label="Area" value={property.totalAreaSqFt ? `${property.totalAreaSqFt} sq.ft.` : ''} />
            <ReviewRow label="Land Type" value={property.landType} />
            <ReviewRow label="Encumbrance" value={property.encumbrance} />
            <ReviewRow label="Value (₹)" value={property.registeredPropertyValue ? `₹ ${Number(property.registeredPropertyValue).toLocaleString('en-IN')}` : ''} />
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>Location</p>
            <ReviewRow label="Address" value={[location.addressLine1, location.addressLine2].filter(Boolean).join(', ')} />
            <ReviewRow label="Village" value={location.village} />
            <ReviewRow label="District" value={location.district} />
            <ReviewRow label="State" value={location.state} />
            <ReviewRow label="PIN" value={location.pinCode} mono />
            <ReviewRow label="GPS" value={location.latitude && location.longitude ? `${location.latitude}, ${location.longitude}` : ''} mono />
          </div>
        </div>
      </div>

      {/* Consents & Declaration */}
      <div className="card" style={{ borderColor: allConsentsAccepted ? 'var(--success-border)' : 'var(--border-subtle)', background: allConsentsAccepted ? 'rgba(16,185,129,0.04)' : undefined }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
          ⚖️ Declaration & Consent
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { field: 'declarationAccepted' as keyof ReviewConsents, label: 'I hereby declare that all information provided is true, accurate, and complete to the best of my knowledge and belief.', },
            { field: 'detailsAccurate' as keyof ReviewConsents, label: 'I confirm that the property details, boundaries, and ownership information accurately represent the land being registered.' },
            { field: 'blockchainConsent' as keyof ReviewConsents, label: 'I consent to this registration being recorded on the Hyperledger Fabric blockchain as an immutable and legally binding entry.' },
          ].map(({ field, label }) => (
            <label key={field} className="checkbox-wrapper" htmlFor={`consent-${field}`} style={{ cursor: 'pointer', alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                id={`consent-${field}`}
                className="checkbox-wrapper"
                checked={consents[field]}
                onChange={e => onConsentChange(field, e.target.checked)}
                style={{ marginTop: '2px', flexShrink: 0, width: '16px', height: '16px', accentColor: 'var(--primary)' }}
              />
              <span className="checkbox-label" style={{ lineHeight: 1.5 }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
        <button
          type="button"
          className="btn"
          id="submit-registration-btn"
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          style={{
            padding: '0.9rem 2.5rem',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.03em',
            opacity: (!canSubmit || isSubmitting) ? 0.5 : 1,
            cursor: (!canSubmit || isSubmitting) ? 'not-allowed' : 'pointer',
            background: canSubmit ? 'var(--gradient-primary)' : undefined,
            boxShadow: canSubmit ? 'var(--shadow-glow)' : 'none',
          }}
        >
          {isSubmitting ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="spinner" />
              Submitting to Blockchain...
            </span>
          ) : (
            '⚡ Submit Registration to Blockchain'
          )}
        </button>
      </div>

      {!canSubmit && (
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {uploadedRequired < totalRequired
            ? `Upload all ${totalRequired} required documents to continue.`
            : 'Please accept all declarations to submit.'}
        </p>
      )}
    </div>
  );
};

export default RegisterStep4DocumentsReview;