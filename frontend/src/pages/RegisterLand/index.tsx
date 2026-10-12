import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  PropertyDetails,
  LandLocation,
  DocumentEntry,
  ReviewConsents,
  INITIAL_PROPERTY_DETAILS,
  INITIAL_LAND_LOCATION,
  REQUIRED_DOCUMENTS,
  INITIAL_CONSENTS,
} from '../../types/landRegistration';
import RegisterStep1Owner from './RegisterStep1Owner';
import RegisterStep2PropertyDetails from './RegisterStep2PropertyDetails';
import RegisterStep3LandLocation from './RegisterStep3LandLocation';
import RegisterStep4DocumentsReview from './RegisterStep4DocumentsReview';

// -------------------------------------------------------------
// Step definitions
// -------------------------------------------------------------
const STEPS = [
  { number: 1, label: 'Current Owner', icon: '👤', description: 'Aadhaar-verified identity' },
  { number: 2, label: 'Property Details', icon: '📋', description: 'Survey & classification' },
  { number: 3, label: 'Land Location', icon: '📍', description: 'Address & geo-coordinates' },
  { number: 4, label: 'Documents & Review', icon: '📑', description: 'Upload & submit' },
];

// -------------------------------------------------------------
// Step Progress Bar
// -------------------------------------------------------------
interface StepBarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const StepBar: React.FC<StepBarProps> = ({ currentStep, onStepClick }) => (
  <div className="card" style={{ padding: '1rem 1.25rem' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', position: 'relative' }}>
      {/* Connector line */}
      <div style={{ position: 'absolute', top: '18px', left: '12.5%', right: '12.5%', height: '2px', background: 'var(--border-default)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '18px', left: '12.5%', width: `${((currentStep - 1) / 3) * 75}%`, height: '2px', background: 'var(--gradient-primary)', zIndex: 1, transition: 'width 0.4s ease' }} />

      {STEPS.map(step => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isClickable = step.number < currentStep;

        return (
          <button
            key={step.number}
            type="button"
            onClick={() => isClickable && onStepClick(step.number)}
            disabled={!isClickable && !isActive}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: isClickable ? 'pointer' : 'default',
              padding: 0,
              zIndex: 2,
              position: 'relative',
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isCompleted ? '0.9rem' : '1rem',
              fontWeight: 700,
              background: isActive
                ? 'var(--primary)'
                : isCompleted
                ? 'var(--success)'
                : 'var(--bg-elevated)',
              color: isCompleted || isActive ? '#fff' : 'var(--text-muted)',
              border: isActive ? '2px solid var(--primary)' : isCompleted ? '2px solid var(--success)' : '2px solid var(--border-default)',
              boxShadow: isActive ? '0 0 14px var(--primary-glow)' : 'none',
              transition: 'all 0.3s ease',
            }}>
              {isCompleted ? '✓' : step.icon}
            </div>
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isActive ? 'var(--primary-light)' : isCompleted ? 'var(--success-light)' : 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                Step {step.number}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {step.label}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'none' /* hidden on small */ }}>
                {step.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

// -------------------------------------------------------------
// Main Wizard Page
// -------------------------------------------------------------
const RegisterLandPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Owner is pre-filled from user profile (locked)
  const ownerData = {
    fullName: user?.fullName ?? 'Rajesh Kumar Sharma',
    aadhaarNumber: user?.aadhaarId ?? 'XXXX-XXXX-9842',
    mobileNumber: user?.phone ?? '+91 98765-43210',
    email: user?.email ?? 'rajesh.sharma@example.com',
    citizenId: `CID-MH-${user?.id?.slice(0, 5).toUpperCase() ?? '94821'}`,
    stateOfDomicile: 'Maharashtra',
  };

  const [property, setProperty] = useState<PropertyDetails>(INITIAL_PROPERTY_DETAILS);
  const [location, setLocation] = useState<LandLocation>(INITIAL_LAND_LOCATION);
  const [documents, setDocuments] = useState<DocumentEntry[]>(REQUIRED_DOCUMENTS.map(d => ({ ...d })));
  const [consents, setConsents] = useState<ReviewConsents>(INITIAL_CONSENTS);

  const handlePropertyChange = useCallback((field: keyof PropertyDetails, value: string) => {
    setProperty(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLocationChange = useCallback((field: keyof LandLocation, value: string) => {
    setLocation(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleDocumentUpload = useCallback((index: number, file: File) => {
    setDocuments(prev => prev.map((d, i) => i === index ? { ...d, file, status: 'uploaded' } : d));
  }, []);

  const handleDocumentRemove = useCallback((index: number) => {
    setDocuments(prev => prev.map((d, i) => i === index ? { ...d, file: null, status: 'pending' } : d));
  }, []);

  const handleConsentChange = useCallback((field: keyof ReviewConsents, value: boolean) => {
    setConsents(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(s => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const currentStepMeta = STEPS[currentStep - 1];

  // Success State
  if (isSubmitted) {
    const txHash = `0x${Math.random().toString(16).slice(2, 18).toUpperCase()}...${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '3rem 1rem', textAlign: 'center' as const }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--success-bg)', border: '2px solid var(--success-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', boxShadow: '0 0 40px rgba(16,185,129,0.2)' }}>
          ✅
        </div>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Registration Submitted!
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '440px' }}>
            Your land registration has been submitted and anchored to the Hyperledger Fabric blockchain. The LRO will review your application and notify you via email.
          </p>
        </div>
        <div className="card" style={{ maxWidth: '420px', width: '100%', textAlign: 'left' as const }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.75rem' }}>Blockchain Transaction</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--primary-light)', wordBreak: 'break-all' as const, padding: '0.75rem', background: 'rgba(37,99,235,0.07)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(37,99,235,0.15)' }}>
            {txHash}
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Status</span>
            <span style={{ color: 'var(--success-light)', fontWeight: 600 }}>🔒 Committed to Ledger</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn" onClick={() => navigate('/dashboard')} id="go-dashboard-btn">Go to Dashboard</button>
          <button className="btn btn-secondary" onClick={() => { setIsSubmitted(false); setCurrentStep(1); setProperty(INITIAL_PROPERTY_DETAILS); setLocation(INITIAL_LAND_LOCATION); setDocuments(REQUIRED_DOCUMENTS.map(d => ({ ...d }))); setConsents(INITIAL_CONSENTS); }} id="register-another-btn">
            Register Another
          </button>
        </div>
      </div>
    );
  }

  // Main Wizard
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Page Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <span>Portal</span>
          <span>&gt;</span>
          <span>Dashboard</span>
          <span>&gt;</span>
          <span style={{ color: 'var(--text-secondary)' }}>Register Land</span>
          <span>&gt;</span>
          <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>Step {currentStep}: {currentStepMeta.label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Register Land</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
              Register an existing property in the national digital land registry.
            </p>
          </div>
          <button className="btn btn-secondary" type="button" id="save-draft-btn" style={{ fontSize: '0.82rem' }}>
            💾 Save Draft
          </button>
        </div>
      </div>

      {/* Step Progress Bar */}
      <StepBar currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Active Step Content */}
      {currentStep === 1 && <RegisterStep1Owner owner={ownerData} />}
      {currentStep === 2 && <RegisterStep2PropertyDetails data={property} onChange={handlePropertyChange} />}
      {currentStep === 3 && <RegisterStep3LandLocation data={location} onChange={handleLocationChange} />}
      {currentStep === 4 && (
        <RegisterStep4DocumentsReview
          documents={documents}
          consents={consents}
          owner={ownerData}
          property={property}
          location={location}
          onDocumentUpload={handleDocumentUpload}
          onDocumentRemove={handleDocumentRemove}
          onConsentChange={handleConsentChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Bottom Navigation */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleBack}
          disabled={currentStep === 1}
          id="step-back-btn"
          style={{ opacity: currentStep === 1 ? 0.4 : 1 }}
        >
          ← Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {STEPS.map((s, idx) => (
            <div key={s.number} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: currentStep > s.number ? 'var(--success)' : currentStep === s.number ? 'var(--primary-light)' : 'var(--text-muted)', fontWeight: currentStep === s.number ? 700 : 400 }}>
                {currentStep > s.number ? '✓' : s.number}
              </span>
              {idx < 3 && <span>•</span>}
            </div>
          ))}
        </div>
        {currentStep < 4 ? (
          <button
            type="button"
            className="btn"
            onClick={handleNext}
            id="step-next-btn"
            style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow)' }}
          >
            Continue to {STEPS[currentStep].label} →
          </button>
        ) : (
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Use the Submit button above to finalize</span>
        )}
      </div>

    </div>
  );
};

export default RegisterLandPage;