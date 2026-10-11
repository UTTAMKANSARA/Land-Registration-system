import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MutationRecord {
  caseNumber: string;
  raiyat: string;
  details: string;
  anchal: string;
  date: string;
  status: 'Approved' | 'Under Review' | 'Disposed';
  actionLabel: string;
}

const MUTATION_DATA: MutationRecord[] = [
  {
    caseNumber: 'BR-2024-0921',
    raiyat: 'Rameshwar Prasad Sinha',
    details: 'Khata No. 142 • Plot 892',
    anchal: 'Danapur, Patna',
    date: '14 May 2024',
    status: 'Approved',
    actionLabel: 'View Panji-II',
  },
  {
    caseNumber: 'BR-2024-1104',
    raiyat: 'Pooja Kumari Devi',
    details: 'Khata No. 89 • Plot 312',
    anchal: 'Kanti, Muzaffarpur',
    date: '12 May 2024',
    status: 'Under Review',
    actionLabel: 'Track Status',
  },
  {
    caseNumber: 'BR-2024-0842',
    raiyat: 'Devendra Kumar Yadav',
    details: 'Khata No. 204 • Plot 1540',
    anchal: 'Patna Sadar, Patna',
    date: '08 May 2024',
    status: 'Approved',
    actionLabel: 'View Panji-II',
  },
  {
    caseNumber: 'BR-2024-0728',
    raiyat: 'Alokba Agro Products Ltd.',
    details: 'Khata No. 511 • Plot 418',
    anchal: 'Nathnagar, Bhagalpur',
    date: '03 May 2024',
    status: 'Disposed',
    actionLabel: 'Order Copy',
  },
  {
    caseNumber: 'BR-2024-0618',
    raiyat: 'Sneha Rai & Manoj Jha',
    details: 'Khata No. 76 • Plot 129',
    anchal: 'Danapur, Patna',
    date: '28 Apr 2024',
    status: 'Approved',
    actionLabel: 'View Panji-II',
  },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  // Active navigation tab
  const [activeNav, setActiveNav] = useState<string>(() => {
    if (location.pathname.includes('settings')) return 'Profile';
    return 'Dashboard';
  });

  const [activeFilter, setActiveFilter] = useState<'All' | 'Danapur' | 'Patna Sadar' | 'Muzaffarpur'>('All');

  // Search Land Records States
  const [searchTab, setSearchTab] = useState<'plot' | 'jamabandi' | 'owner' | 'deed'>('plot');
  const [searchDistrict, setSearchDistrict] = useState('Patna (पटना)');
  const [searchAnchal, setSearchAnchal] = useState('Danapur Anchal');
  const [searchMauza, setSearchMauza] = useState('Danapur (Thana No. 23)');
  const [searchKhataKhesra, setSearchKhataKhesra] = useState('Khata 142, Khesra 892');
  const [searchResultsCount, setSearchResultsCount] = useState(2);

  // Profile & Settings Form States
  const [officerName, setOfficerName] = useState(user?.fullName || 'Rajesh Kumar Sharma');
  const [employeeId] = useState('OFF-MH-2023-94821');
  const [officeEmail, setOfficeEmail] = useState('rajesh.sharma@landrecords.gov.in');
  const [mobileNumber, setMobileNumber] = useState('+91 98201 44521');
  const [districtOffice, setDistrictOffice] = useState('Bihar District Central Registry');
  const [talukaOffice, setTalukaOffice] = useState('Haveli Sub-Registry Office 04');
  const [languagePreference, setLanguagePreference] = useState('English (EN)');

  // Preferences
  const [twoFactor, setTwoFactor] = useState(true);
  const [autoLogout, setAutoLogout] = useState('30 minutes');
  const [darkMode, setDarkMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Hide the global MainLayout navbar/footer to render exact standalone dashboard
  useEffect(() => {
    const nav = document.querySelector('.navbar') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;
    const main = document.querySelector('.main-content') as HTMLElement;

    if (nav) nav.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (main) {
      main.style.padding = '0';
      main.style.maxWidth = '100%';
      main.style.margin = '0';
    }

    return () => {
      if (nav) nav.style.display = '';
      if (footer) footer.style.display = '';
      if (main) {
        main.style.padding = '';
        main.style.maxWidth = '';
        main.style.margin = '';
      }
    };
  }, []);

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleClearSearchFilters = () => {
    setSearchKhataKhesra('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResultsCount(2);
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancelSettings = () => {
    setOfficerName('Rajesh Kumar Sharma');
    setOfficeEmail('rajesh.sharma@landrecords.gov.in');
    setMobileNumber('+91 98201 44521');
    setDistrictOffice('Bihar District Central Registry');
    setTalukaOffice('Haveli Sub-Registry Office 04');
    setLanguagePreference('English (EN)');
    setTwoFactor(true);
    setAutoLogout('30 minutes');
    setDarkMode(false);
  };

  const filteredData = MUTATION_DATA.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.anchal.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className={`bihar-dashboard-wrapper ${darkMode ? 'theme-dark' : ''}`}>
      <style>{`
        .bihar-dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          background-color: #f6f8fb;
          color: #1e293b;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          box-sizing: border-box;
        }

        .bihar-sidebar {
          width: 250px;
          min-width: 250px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem 1.5rem 1.25rem;
          position: sticky;
          top: 0;
          height: 100vh;
          box-sizing: border-box;
        }

        .bihar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 1.5rem;
        }

        .bihar-brand-emblem {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #006747;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #006747;
          font-size: 1.15rem;
          background: #f0fdf4;
          flex-shrink: 0;
        }

        .bihar-brand-title {
          font-size: 1.02rem;
          font-weight: 700;
          color: #004d34;
          line-height: 1.2;
        }

        .bihar-brand-sub {
          font-size: 0.64rem;
          color: #64748b;
          line-height: 1.25;
          margin-top: 2px;
        }

        .bihar-brand-gov {
          font-size: 0.62rem;
          font-weight: 700;
          color: #006747;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }

        .sidebar-section-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 0.6rem;
          padding-left: 0.5rem;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.28rem;
          flex: 1;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.62rem 0.85rem;
          border-radius: 8px;
          font-size: 0.86rem;
          font-weight: 500;
          color: #475569;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.15s ease;
        }

        .sidebar-nav-item:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .sidebar-nav-item.active {
          background: #006747;
          color: #ffffff;
          font-weight: 600;
        }

        .sidebar-nav-item svg {
          width: 17px;
          height: 17px;
          flex-shrink: 0;
        }

        .sidebar-bottom-actions {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }

        .sidebar-profile-link {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.6rem 0.85rem;
          background: none;
          border: none;
          color: #475569;
          font-size: 0.86rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 8px;
          text-align: left;
          width: 100%;
          transition: background 0.15s;
        }

        .sidebar-profile-link:hover,
        .sidebar-profile-link.active {
          background: #f1f5f9;
          color: #0f172a;
        }

        .sidebar-signout {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.6rem 0.85rem;
          background: none;
          border: none;
          color: #dc2626;
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          text-align: left;
          width: 100%;
          transition: background 0.15s;
        }

        .sidebar-signout:hover {
          background: #fef2f2;
        }

        .bihar-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1.5rem 2.2rem 2.5rem 2.2rem;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .bihar-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .bihar-breadcrumbs {
          font-size: 0.75rem;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .bihar-breadcrumbs span.active-crumb {
          color: #006747;
          font-weight: 700;
        }

        .bihar-header {
          margin-bottom: 1.4rem;
        }

        .bihar-header h1 {
          font-size: 1.65rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
        }

        .bihar-header p {
          font-size: 0.88rem;
          color: #64748b;
        }

        /* =============================================
           SEARCH LAND & CADASTRAL RECORDS STYLES
        ============================================= */
        .search-box-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.4rem 1.5rem 1.2rem 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          margin-bottom: 1.75rem;
        }

        .search-tab-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.35rem;
          overflow-x: auto;
          padding-bottom: 0.2rem;
        }

        .search-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 0.95rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
          white-space: nowrap;
        }

        .search-tab-btn:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        .search-tab-btn.active {
          background: #ffffff;
          color: #006747;
          border-color: #006747;
          box-shadow: 0 1px 2px rgba(0, 103, 71, 0.08);
        }

        .search-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1.2fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .search-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .search-input-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
        }

        .search-control {
          width: 100%;
          padding: 0.6rem 0.85rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.82rem;
          color: #1e293b;
          font-weight: 500;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }

        .search-control:focus {
          border-color: #006747;
          box-shadow: 0 0 0 2px rgba(0, 103, 71, 0.1);
        }

        select.search-control {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095.1c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.9z%22%2F%3E%3C%2F%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 0.65rem auto;
          padding-right: 2rem;
          cursor: pointer;
        }

        .search-actions-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }

        .search-sync-note {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          color: #059669;
          font-weight: 500;
        }

        .search-buttons-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-clear-filters {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.52rem 1rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-clear-filters:hover {
          background: #f9fafb;
        }

        .btn-search-submit {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.52rem 1.35rem;
          background: #006747;
          border: none;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.15s;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .btn-search-submit:hover {
          background: #005238;
        }

        /* Results Header */
        .results-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .results-count-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .badge-matched-count {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.18rem 0.55rem;
          border-radius: 9999px;
        }

        .export-buttons-group {
          display: flex;
          gap: 0.5rem;
        }

        .btn-export {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.42rem 0.75rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-export:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        /* Results 2 Cards Grid */
        .results-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .parcel-result-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.35rem 1.45rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
        }

        .parcel-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .parcel-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 0.2rem;
        }

        .parcel-sub {
          font-size: 0.76rem;
          color: #64748b;
        }

        .badge-jamabandi-active {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
          border-radius: 9999px;
          padding: 0.25rem 0.65rem;
          font-size: 0.72rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
        }

        .parcel-grid-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
          margin-bottom: 1.15rem;
        }

        .parcel-detail-item {
          display: flex;
          flex-direction: column;
        }

        .parcel-label {
          font-size: 0.67rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin-bottom: 0.2rem;
        }

        .parcel-val {
          font-size: 0.84rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.3;
        }

        .parcel-val.mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: #006747;
        }

        .parcel-val-sub {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 400;
          margin-top: 1px;
        }

        .parcel-status-banner {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 6px;
          padding: 0.55rem 0.85rem;
          font-size: 0.75rem;
          color: #15803d;
          font-weight: 600;
          margin-bottom: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .parcel-verified-banner {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.55rem 0.85rem;
          font-size: 0.74rem;
          color: #475569;
          font-weight: 500;
          margin-bottom: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .parcel-actions-stack {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: auto;
        }

        .btn-full-details {
          width: 100%;
          padding: 0.5rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          transition: all 0.15s;
        }

        .btn-full-details:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        .parcel-actions-row {
          display: flex;
          gap: 0.6rem;
        }

        .btn-card-action {
          flex: 1;
          padding: 0.5rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .btn-card-action:hover {
          background: #f9fafb;
        }

        .btn-card-action.green-btn {
          color: #006747;
          border-color: #a7f3d0;
          background: #f0fdf4;
        }

        .btn-card-action.green-btn:hover {
          background: #dcfce7;
        }

        /* =============================================
           OWNERSHIP HISTORY STYLES
        ============================================= */
        .ownership-property-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.35rem 1.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          margin-bottom: 1.75rem;
        }

        .ownership-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 1.25rem;
        }

        .ownership-verified-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #f0fdf4;
          color: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #bbf7d0;
          flex-shrink: 0;
        }

        .ownership-prop-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 0.25rem;
        }

        .ownership-prop-sub {
          font-size: 0.77rem;
          color: #64748b;
        }

        .badge-verified-jamabandi {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.74rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .ownership-meta-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .ownership-meta-col {
          display: flex;
          flex-direction: column;
        }

        .ownership-meta-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin-bottom: 0.35rem;
        }

        .ownership-meta-val {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.2rem;
        }

        .ownership-meta-val.green-mono {
          color: #006747;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .ownership-meta-val.green-text {
          color: #16a34a;
        }

        .ownership-meta-sub {
          font-size: 0.73rem;
          color: #64748b;
        }

        .timeline-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .timeline-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.15rem;
        }

        .timeline-sub {
          font-size: 0.78rem;
          color: #64748b;
        }

        .timeline-badge-count {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 600;
        }

        .vertical-timeline-container {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .timeline-entry {
          display: flex;
          gap: 1.25rem;
          position: relative;
        }

        .timeline-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 32px;
          flex-shrink: 0;
        }

        .timeline-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          flex-shrink: 0;
        }

        .timeline-circle.active-green {
          background: #006747;
          color: #ffffff;
          box-shadow: 0 0 0 4px #ecfdf5;
        }

        .timeline-circle.grey-circle {
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #cbd5e1;
        }

        .timeline-line {
          width: 2px;
          flex: 1;
          background: #e2e8f0;
          margin: 6px 0;
        }

        .timeline-card {
          flex: 1;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.25rem 1.4rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          margin-bottom: 1.5rem;
        }

        .timeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.6rem;
        }

        .badge-active-title {
          background: #dcfce7;
          color: #15803d;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .badge-historical {
          background: #f1f5f9;
          color: #475569;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .badge-reg-no {
          background: #f8fafc;
          color: #64748b;
          border: 1px solid #e2e8f0;
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
        }

        .timeline-date {
          font-size: 0.76rem;
          color: #64748b;
          font-weight: 500;
        }

        .timeline-deed-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.25rem;
        }

        .timeline-deed-sub {
          font-size: 0.78rem;
          color: #64748b;
          margin-bottom: 1rem;
        }

        .timeline-details-table {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
        }

        .timeline-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
        }

        .timeline-row-label {
          color: #64748b;
          font-weight: 500;
        }

        .timeline-row-val {
          color: #0f172a;
          font-weight: 600;
          text-align: right;
        }

        .timeline-row-val.green-bold {
          color: #006747;
          font-weight: 700;
        }

        .timeline-row-val.green-text {
          color: #16a34a;
          font-weight: 600;
        }

        .timeline-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-deed-action {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-deed-action:hover {
          background: #f9fafb;
          border-color: #9ca3af;
        }

        /* =============================================
           DASHBOARD & SETTINGS SHARED STYLES
        ============================================= */
        .bihar-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.3rem 0.85rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #334155;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
        }

        .bihar-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }

        .bihar-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
          margin-bottom: 1.5rem;
        }

        .bihar-stat-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.15rem 1.25rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.6rem;
        }

        .stat-card-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #64748b;
          line-height: 1.3;
          max-width: 80%;
        }

        .stat-icon {
          width: 22px;
          height: 22px;
          color: #006747;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-card-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 0.45rem;
        }

        .stat-card-footer {
          font-size: 0.72rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 500;
        }

        .trend-green {
          color: #10b981;
        }

        .trend-orange {
          color: #d97706;
        }

        .trend-muted {
          color: #64748b;
        }

        .bihar-content-layout {
          display: grid;
          grid-template-columns: 2.1fr 1fr;
          gap: 1.25rem;
          align-items: start;
        }

        .bihar-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .panel-header-row {
          padding: 1.2rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #f1f5f9;
        }

        .panel-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.2rem;
        }

        .panel-subtitle {
          font-size: 0.77rem;
          color: #64748b;
        }

        .table-filter-pills {
          display: flex;
          gap: 0.35rem;
          background: #f8fafc;
          padding: 3px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        .filter-pill {
          background: transparent;
          border: none;
          padding: 0.3rem 0.65rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748b;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .filter-pill.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }

        .bihar-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8rem;
          text-align: left;
        }

        .bihar-table th {
          background: #f8fafc;
          color: #64748b;
          font-weight: 600;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.75rem 1.2rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .bihar-table td {
          padding: 0.9rem 1.2rem;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .bihar-table tr:last-child td {
          border-bottom: none;
        }

        .case-cell {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: #006747;
          font-weight: 600;
          font-size: 0.78rem;
        }

        .raiyat-cell-name {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.82rem;
          margin-bottom: 2px;
        }

        .raiyat-cell-sub {
          font-size: 0.72rem;
          color: #64748b;
        }

        .anchal-cell {
          color: #334155;
          font-size: 0.8rem;
        }

        .date-cell {
          color: #64748b;
          font-size: 0.78rem;
        }

        .badge-status {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .badge-approved {
          background: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }

        .badge-review {
          background: #fefce8;
          color: #a16207;
          border: 1px solid #fef08a;
        }

        .badge-disposed {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .action-link {
          color: #006747;
          font-weight: 600;
          font-size: 0.78rem;
          text-decoration: none;
          cursor: pointer;
        }

        .action-link:hover {
          text-decoration: underline;
        }

        .panel-footer-row {
          padding: 0.85rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          font-size: 0.75rem;
          color: #64748b;
        }

        .view-all-link {
          color: #006747;
          font-weight: 600;
          cursor: pointer;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .updates-list {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .update-item {
          display: flex;
          gap: 0.65rem;
          font-size: 0.78rem;
          line-height: 1.4;
        }

        .update-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #006747;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .update-text {
          color: #334155;
          font-weight: 500;
        }

        .update-meta {
          font-size: 0.7rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        .support-panel {
          padding: 1.25rem;
        }

        .support-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.4rem;
        }

        .support-desc {
          font-size: 0.76rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .support-details-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.75rem 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.75rem;
        }

        .support-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .support-label {
          color: #64748b;
          font-weight: 600;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .support-val {
          color: #0f172a;
          font-weight: 600;
        }

        .btn-support-ticket {
          width: 100%;
          padding: 0.65rem;
          background: #ffffff;
          border: 1px solid #006747;
          color: #006747;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.15s;
        }

        .btn-support-ticket:hover {
          background: #f0fdf4;
        }

        /* Settings CSS */
        .settings-notice-bar {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.9rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.02);
          gap: 1rem;
        }

        .settings-notice-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.8rem;
          color: #475569;
        }

        .settings-notice-icon {
          color: #006747;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .settings-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .btn-settings-cancel {
          padding: 0.5rem 1.1rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.15s;
        }

        .btn-settings-cancel:hover {
          background: #f9fafb;
        }

        .btn-settings-save {
          padding: 0.5rem 1.25rem;
          background: #006747;
          border: none;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          transition: background 0.15s;
        }

        .btn-settings-save:hover {
          background: #005238;
        }

        .settings-grid-layout {
          display: grid;
          grid-template-columns: 1.7fr 1.1fr;
          gap: 1.35rem;
          align-items: start;
        }

        .settings-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.4rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .settings-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .settings-card-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .settings-card-title {
          font-size: 0.98rem;
          font-weight: 700;
          color: #0f172a;
        }

        .badge-verified-uidai {
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
          border-radius: 9999px;
          padding: 0.2rem 0.65rem;
          font-size: 0.7rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .profile-user-banner {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 1.1rem;
          margin-bottom: 1.35rem;
        }

        .profile-avatar-wrap {
          position: relative;
          width: 58px;
          height: 58px;
          flex-shrink: 0;
        }

        .profile-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .avatar-cam-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          background: #006747;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          border: 2px solid #ffffff;
          font-size: 0.65rem;
        }

        .profile-info-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 0.2rem;
        }

        .profile-info-role {
          font-size: 0.77rem;
          color: #64748b;
          margin-bottom: 0.35rem;
        }

        .profile-photo-btn {
          background: none;
          border: none;
          color: #006747;
          font-size: 0.76rem;
          font-weight: 600;
          padding: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .profile-photo-btn:hover {
          text-decoration: underline;
        }

        .settings-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-full-width {
          grid-column: span 2;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .field-label {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
        }

        .field-input-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-input {
          width: 100%;
          padding: 0.6rem 0.85rem;
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.82rem;
          color: #1e293b;
          font-weight: 500;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }

        .field-input:focus {
          border-color: #006747;
          box-shadow: 0 0 0 2px rgba(0, 103, 71, 0.1);
        }

        .field-input-addon-right {
          position: absolute;
          right: 0.75rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .badge-locked {
          background: #f1f5f9;
          color: #64748b;
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          border: 1px solid #e2e8f0;
        }

        .badge-verified-green {
          background: #f0fdf4;
          color: #15803d;
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          border: 1px solid #bbf7d0;
        }

        select.field-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095.1c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.9z%22%2F%3E%3C%2F%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 0.65rem auto;
          padding-right: 2rem;
          cursor: pointer;
        }

        .security-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .security-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .security-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .security-item-left {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .security-item-icon {
          color: #475569;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .security-item-title {
          font-size: 0.83rem;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .badge-mandatory {
          background: #ecfdf5;
          color: #059669;
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
          border: 1px solid #a7f3d0;
        }

        .security-item-desc {
          font-size: 0.74rem;
          color: #64748b;
          margin-top: 2px;
        }

        .toggle-switch {
          position: relative;
          width: 44px;
          height: 24px;
          background: #e2e8f0;
          border-radius: 9999px;
          cursor: pointer;
          transition: background 0.2s;
          border: none;
          padding: 0;
          outline: none;
          flex-shrink: 0;
        }

        .toggle-switch.is-active {
          background: #006747;
        }

        .toggle-knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }

        .toggle-switch.is-active .toggle-knob {
          transform: translateX(20px);
        }

        .auto-logout-select {
          padding: 0.4rem 1.6rem 0.4rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
          background: #ffffff;
          cursor: pointer;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095.1c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.9z%22%2F%3E%3C%2F%3E");
          background-repeat: no-repeat;
          background-position: right 0.5rem center;
          background-size: 0.6rem auto;
        }

        @media (max-width: 1100px) {
          .bihar-stats-grid,
          .ownership-meta-grid,
          .results-cards-grid,
          .search-form-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .bihar-content-layout,
          .settings-grid-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Left Sidebar Navigator */}
      <aside className="bihar-sidebar">
        <div className="bihar-brand">
          <div className="bihar-brand-emblem">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="bihar-brand-title">eLand Registration</div>
            <div className="bihar-brand-sub">Dept. of Land Resources &amp; Registration</div>
            <div className="bihar-brand-gov">GOVT OF INDIA</div>
          </div>
        </div>

        <div className="sidebar-section-title">Navigation</div>

        <nav className="sidebar-nav">
          {[
            {
              name: 'Dashboard',
              icon: (
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              ),
            },
            {
              name: 'My Properties',
              icon: (
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              ),
            },
            {
              name: 'Search Land Records',
              icon: (
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              ),
            },
            {
              name: 'Register Property',
              icon: (
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              ),
            },
            {
              name: 'Transfer Property',
              icon: (
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              ),
            },
            {
              name: 'Ownership History',
              icon: (
                <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 14 14" />
                </svg>
              ),
            },
          ].map((item) => (
            <button
              key={item.name}
              className={`sidebar-nav-item ${activeNav === item.name ? 'active' : ''}`}
              onClick={() => setActiveNav(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom-actions">
          <button
            className={`sidebar-profile-link ${activeNav === 'Profile' ? 'active' : ''}`}
            onClick={() => setActiveNav('Profile')}
          >
            <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profile</span>
          </button>

          <button className="sidebar-signout" onClick={handleSignOut}>
            <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="bihar-main">
        {activeNav === 'Search Land Records' ? (
          /* ================= SEARCH LAND & CADASTRAL RECORDS SECTION ================= */
          <div>
            {/* Top Breadcrumb & Badge */}
            <div className="bihar-topbar">
              <div className="bihar-breadcrumbs">
                <span style={{ cursor: 'pointer' }} onClick={() => setActiveNav('Dashboard')}>PORTAL</span>
                <span>&gt;</span>
                <span>LAND RECORDS</span>
                <span>&gt;</span>
                <span className="active-crumb">SEARCH</span>
              </div>
              <div className="badge-verified-jamabandi" style={{ fontSize: '0.78rem', padding: '0.35rem 0.9rem' }}>
                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Bihar Central Land Registry</span>
              </div>
            </div>

            {/* Header */}
            <div className="bihar-header">
              <h1>Search Land &amp; Cadastral Records</h1>
              <p>Search digitized Bihar land records by plot khesra, khata number, Jamabandi, or owner name.</p>
            </div>

            {/* Search Filters Card */}
            <div className="search-box-card">
              {/* Filter Tabs */}
              <div className="search-tab-row">
                <button
                  type="button"
                  className={`search-tab-btn ${searchTab === 'plot' ? 'active' : ''}`}
                  onClick={() => setSearchTab('plot')}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>By Plot / Khesra &amp; Khata</span>
                </button>

                <button
                  type="button"
                  className={`search-tab-btn ${searchTab === 'jamabandi' ? 'active' : ''}`}
                  onClick={() => setSearchTab('jamabandi')}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>By Jamabandi / ULPIN</span>
                </button>

                <button
                  type="button"
                  className={`search-tab-btn ${searchTab === 'owner' ? 'active' : ''}`}
                  onClick={() => setSearchTab('owner')}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>By Owner (Raiyat) Name</span>
                </button>

                <button
                  type="button"
                  className={`search-tab-btn ${searchTab === 'deed' ? 'active' : ''}`}
                  onClick={() => setSearchTab('deed')}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="7" y1="8" x2="17" y2="8" />
                    <line x1="7" y1="12" x2="17" y2="12" />
                    <line x1="7" y1="16" x2="13" y2="16" />
                  </svg>
                  <span>By Deed Number</span>
                </button>
              </div>

              {/* Form Controls Row */}
              <form onSubmit={handleSearchSubmit}>
                <div className="search-form-row">
                  <div className="search-input-group">
                    <label className="search-input-label">DISTRICT (ज़िला)</label>
                    <select
                      className="search-control"
                      value={searchDistrict}
                      onChange={(e) => setSearchDistrict(e.target.value)}
                    >
                      <option>Patna (पटना)</option>
                      <option>Muzaffarpur (मुजफ्फरपुर)</option>
                      <option>Bhagalpur (भागलपुर)</option>
                      <option>Gaya (गया)</option>
                    </select>
                  </div>

                  <div className="search-input-group">
                    <label className="search-input-label">ANCHAL / CIRCLE (अंचल)</label>
                    <select
                      className="search-control"
                      value={searchAnchal}
                      onChange={(e) => setSearchAnchal(e.target.value)}
                    >
                      <option>Danapur Anchal</option>
                      <option>Patna Sadar Anchal</option>
                      <option>Bihta Anchal</option>
                      <option>Phulwari Sharif Anchal</option>
                    </select>
                  </div>

                  <div className="search-input-group">
                    <label className="search-input-label">MAUZA / THANA (मौजा)</label>
                    <select
                      className="search-control"
                      value={searchMauza}
                      onChange={(e) => setSearchMauza(e.target.value)}
                    >
                      <option>Danapur (Thana No. 23)</option>
                      <option>Bihta (Thana No. 45)</option>
                      <option>Digha (Thana No. 12)</option>
                    </select>
                  </div>

                  <div className="search-input-group">
                    <label className="search-input-label">KHATA / KHESRA NO.</label>
                    <input
                      type="text"
                      className="search-control"
                      placeholder="e.g. Khata 142, Khesra 892"
                      value={searchKhataKhesra}
                      onChange={(e) => setSearchKhataKhesra(e.target.value)}
                    />
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="search-actions-bar">
                  <div className="search-sync-note">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <span>Official records synchronized with Bihar Bhumi portal</span>
                  </div>

                  <div className="search-buttons-group">
                    <button type="button" className="btn-clear-filters" onClick={handleClearSearchFilters}>
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                      </svg>
                      <span>Clear Filters</span>
                    </button>
                    <button type="submit" className="btn-search-submit">
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <span>Search Records</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Search Results Section */}
            <div>
              <div className="results-section-header">
                <div className="results-count-title">
                  <span>Search Results ({searchResultsCount} Parcels Found)</span>
                  <span className="badge-matched-count">Matched {searchResultsCount} / 2</span>
                </div>
                <div className="export-buttons-group">
                  <button type="button" className="btn-export">
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="#ef4444" strokeWidth="2" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Export PDF</span>
                  </button>
                  <button type="button" className="btn-export">
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="#10b981" strokeWidth="2" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="3" y1="15" x2="21" y2="15" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>

              {/* 2 Result Cards Grid */}
              <div className="results-cards-grid">
                {/* Result Card 1 */}
                <div className="parcel-result-card">
                  <div className="parcel-card-top">
                    <div>
                      <div className="parcel-title">Khata No. 142, Khesra No. 892</div>
                      <div className="parcel-sub">Mauza Danapur, Patna</div>
                    </div>
                    <span className="badge-jamabandi-active">
                      <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Jamabandi Active &amp; Verified</span>
                    </span>
                  </div>

                  <div className="parcel-grid-details">
                    <div className="parcel-detail-item">
                      <span className="parcel-label">ULPIN</span>
                      <span className="parcel-val mono">BR-10-01-1420-0892</span>
                    </div>
                    <div className="parcel-detail-item">
                      <span className="parcel-label">AREA</span>
                      <span className="parcel-val">3 Katha 12 Dhur</span>
                      <span className="parcel-val-sub">(Residential/Commercial)</span>
                    </div>
                    <div className="parcel-detail-item">
                      <span className="parcel-label">RAIYAT (TITLE HOLDER)</span>
                      <span className="parcel-val" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Rajesh Kumar Sharma
                      </span>
                    </div>
                    <div className="parcel-detail-item">
                      <span className="parcel-label">DEED REF</span>
                      <span className="parcel-val" style={{ fontSize: '0.78rem' }}>
                        Reg No. 4180/2023 (Danapur SRO)
                      </span>
                    </div>
                  </div>

                  <div className="parcel-status-banner">
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Lagan Status: Paid up to date (FY 2024–25)</span>
                  </div>

                  <div className="parcel-actions-stack">
                    <button
                      type="button"
                      className="btn-full-details"
                      onClick={() => setActiveNav('Ownership History')}
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>View Full Details</span>
                    </button>
                    <div className="parcel-actions-row">
                      <button type="button" className="btn-card-action">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span>View Jamabandi Panji-II</span>
                      </button>
                      <button type="button" className="btn-card-action green-btn">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Download Nakal PDF</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Result Card 2 */}
                <div className="parcel-result-card">
                  <div className="parcel-card-top">
                    <div>
                      <div className="parcel-title">Khata No. 78, Khesra No. 314</div>
                      <div className="parcel-sub">Mauza Bihta, Patna</div>
                    </div>
                    <span className="badge-jamabandi-active">
                      <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Jamabandi Active</span>
                    </span>
                  </div>

                  <div className="parcel-grid-details">
                    <div className="parcel-detail-item">
                      <span className="parcel-label">ULPIN</span>
                      <span className="parcel-val mono">BR-10-04-3140-0780</span>
                    </div>
                    <div className="parcel-detail-item">
                      <span className="parcel-label">AREA</span>
                      <span className="parcel-val">1 Bigha 4 Katha</span>
                      <span className="parcel-val-sub">(Agricultural)</span>
                    </div>
                    <div className="parcel-detail-item" style={{ gridColumn: 'span 2' }}>
                      <span className="parcel-label">RAIYAT (CURRENT TITLE HOLDER)</span>
                      <span className="parcel-val" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                          <line x1="8" y1="6" x2="16" y2="6" />
                          <line x1="8" y1="10" x2="16" y2="10" />
                          <line x1="8" y1="14" x2="16" y2="14" />
                        </svg>
                        Verma Agro Storage
                      </span>
                    </div>
                  </div>

                  <div className="parcel-verified-banner">
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="#006747" strokeWidth="2.5" fill="none">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Digitized &amp; Verified by Anchal Bihta Revenue Record Office</span>
                  </div>

                  <div className="parcel-actions-stack">
                    <div className="parcel-actions-row">
                      <button type="button" className="btn-card-action">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span>View Jamabandi Panji-II</span>
                      </button>
                      <button type="button" className="btn-card-action green-btn">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Download Nakal PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeNav === 'Ownership History' ? (
          /* ================= OWNERSHIP HISTORY SECTION ================= */
          <div>
            {/* Top Breadcrumb & User Tag */}
            <div className="bihar-topbar">
              <div className="bihar-breadcrumbs">
                <span style={{ cursor: 'pointer' }} onClick={() => setActiveNav('Dashboard')}>Portal</span>
                <span>&gt;</span>
                <span>Land Records</span>
                <span>&gt;</span>
                <span className="active-crumb">Ownership History</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 500 }}>Patna Sadar Anchal</span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  RS
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="bihar-header">
              <h1>Ownership History</h1>
              <p>Chronological chain of title, registered deeds, and legal mutation records for certified land parcels.</p>
            </div>

            {/* Certified Property Card */}
            <div className="ownership-property-card">
              <div className="ownership-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div className="ownership-verified-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div>
                    <div className="ownership-prop-title">
                      Khata No. 142, Khesra No. 892 • Mauza Danapur, Patna, Bihar
                    </div>
                    <div className="ownership-prop-sub">
                      Sub-Registry Office: Danapur | Anchal: Patna Sadar
                    </div>
                  </div>
                </div>
                <div className="badge-verified-jamabandi">
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Verified Jamabandi</span>
                </div>
              </div>

              {/* 4 Metrics Strip */}
              <div className="ownership-meta-grid">
                <div className="ownership-meta-col">
                  <div className="ownership-meta-label">ULPIN</div>
                  <div className="ownership-meta-val green-mono">BR-10-01-1420-0892</div>
                  <div className="ownership-meta-sub">Unique Land Parcel ID</div>
                </div>
                <div className="ownership-meta-col">
                  <div className="ownership-meta-label">TOTAL AREA</div>
                  <div className="ownership-meta-val">3 Katha 12 Dhur</div>
                  <div className="ownership-meta-sub">~4,950 sq.ft (459.8 sq m)</div>
                </div>
                <div className="ownership-meta-col">
                  <div className="ownership-meta-label">CURRENT OWNER (RAIYAT)</div>
                  <div className="ownership-meta-val">Rajesh Kumar Sharma</div>
                  <div className="ownership-meta-sub">Self &amp; Sole Possession</div>
                </div>
                <div className="ownership-meta-col">
                  <div className="ownership-meta-label">JAMABANDI STATUS</div>
                  <div className="ownership-meta-val green-text">Active (FY 2024–25)</div>
                  <div className="ownership-meta-sub">Lagan Up-to-date Paid</div>
                </div>
              </div>
            </div>

            {/* Title Transfer Timeline */}
            <div className="timeline-section-header">
              <div>
                <div className="timeline-title">Title Transfer Timeline</div>
                <div className="timeline-sub">Chronological record of conveyances, registered deeds &amp; mutations</div>
              </div>
              <div className="timeline-badge-count">3 Recorded Stages</div>
            </div>

            <div className="vertical-timeline-container">
              {/* Stage 1: Current Active Title */}
              <div className="timeline-entry">
                <div className="timeline-track">
                  <div className="timeline-circle active-green">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3" fill="none">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="badge-active-title">CURRENT ACTIVE TITLE</span>
                      <span className="badge-reg-no">Reg No: 4180/2023</span>
                    </div>
                    <span className="timeline-date">14 Oct 2023</span>
                  </div>

                  <div className="timeline-deed-title">Kewala (Sale Deed) Registration</div>
                  <div className="timeline-deed-sub">Absolute sale deed executed at Sub-Registry Office (SRO) Danapur, Patna.</div>

                  <div className="timeline-details-table">
                    <div className="timeline-detail-row">
                      <span className="timeline-row-label">From (Seller / Deni):</span>
                      <span className="timeline-row-val">Late Ramvilas Verma (by legal heir)</span>
                    </div>
                    <div className="timeline-detail-row">
                      <span className="timeline-row-label">To (Purchaser / Leni):</span>
                      <span className="timeline-row-val green-bold">Rajesh Kumar Sharma</span>
                    </div>
                    <div className="timeline-detail-row">
                      <span className="timeline-row-label">Mutation (Dakhil-Kharij):</span>
                      <span className="timeline-row-val green-text">Approved by Circle Officer • Order #DK-2023-8492</span>
                    </div>
                  </div>

                  <div className="timeline-actions">
                    <button type="button" className="btn-deed-action">
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="#ef4444" strokeWidth="2" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>View Kewala Deed PDF</span>
                    </button>
                    <button type="button" className="btn-deed-action">
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="#006747" strokeWidth="2" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>Shuddhi Patra</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stage 2: Historical Partition Deed */}
              <div className="timeline-entry">
                <div className="timeline-track">
                  <div className="timeline-circle grey-circle">
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                      <polyline points="17 1 21 5 17 9" />
                      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                      <polyline points="7 23 3 19 7 15" />
                      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                  </div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="badge-historical">HISTORICAL DEED</span>
                      <span className="badge-reg-no">Reg No: 3481/2016</span>
                    </div>
                    <span className="timeline-date">22 Feb 2016</span>
                  </div>

                  <div className="timeline-deed-title">Bapoti (Family Partition Deed)</div>
                  <div className="timeline-deed-sub">Registered family partition deed registered at SRO Danapur.</div>

                  <div className="timeline-details-table">
                    <div className="timeline-detail-row">
                      <span className="timeline-row-label">Title Transferred To:</span>
                      <span className="timeline-row-val">Ramvilas Verma via registered family partition</span>
                    </div>
                    <div className="timeline-detail-row">
                      <span className="timeline-row-label">Mutation:</span>
                      <span className="timeline-row-val">Recorded in Jamabandi Panji-II</span>
                    </div>
                  </div>

                  <div className="timeline-actions">
                    <button type="button" className="btn-deed-action">
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="#64748b" strokeWidth="2" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>View Deed Summary</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stage 3: Cadastral Survey Genesis Record */}
              <div className="timeline-entry">
                <div className="timeline-track">
                  <div className="timeline-circle grey-circle">
                    <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 14 14" />
                    </svg>
                  </div>
                </div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="badge-historical">GENESIS RECORD</span>
                      <span className="badge-reg-no">Khata No: 142</span>
                    </div>
                    <span className="timeline-date">1985 Revisional Survey</span>
                  </div>

                  <div className="timeline-deed-title">Cadastral Survey Khatian</div>
                  <div className="timeline-deed-sub">Record Room Entry (1985 Revisional Survey), Patna Collectorate.</div>

                  <div className="timeline-details-table" style={{ marginBottom: 0 }}>
                    <div className="timeline-detail-row">
                      <span className="timeline-row-label">Ancestral Ownership:</span>
                      <span className="timeline-row-val">Original Raiyat family title entry recorded at Patna Collectorate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeNav === 'Profile' ? (
          /* ================= PROFILE & SETTINGS SECTION ================= */
          <div>
            {/* Top Breadcrumb */}
            <div className="bihar-topbar">
              <div className="bihar-breadcrumbs">
                <span>Portal</span>
                <span>&gt;</span>
                <span style={{ cursor: 'pointer' }} onClick={() => setActiveNav('Dashboard')}>Dashboard</span>
                <span>&gt;</span>
                <span className="active-crumb">Settings</span>
              </div>
            </div>

            {/* Header */}
            <div className="bihar-header">
              <h1>Profile &amp; Settings</h1>
              <p>Manage your citizen profile, multi-tier authentication, and blockchain ledger credentials.</p>
            </div>

            {/* Cryptographic notice bar */}
            <div className="settings-notice-bar">
              <div className="settings-notice-content">
                <span className="settings-notice-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <span>All setting modifications are cryptographically signed with your UIDAI credential and logged on the audit ledger.</span>
              </div>
              <div className="settings-actions">
                <button type="button" className="btn-settings-cancel" onClick={handleCancelSettings}>
                  Cancel
                </button>
                <button type="button" className="btn-settings-save" onClick={handleSaveSettings}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {saveSuccess && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#15803d',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.82rem',
                marginBottom: '1.25rem',
                fontWeight: 600
              }}>
                ✓ Settings updated and signed with UIDAI credentials successfully.
              </div>
            )}

            {/* 2 Columns: Officer & Citizen Profile + Security Preferences */}
            <div className="settings-grid-layout">
              {/* Left Column: Officer & Citizen Profile */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title-group">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="#006747" strokeWidth="2" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span className="settings-card-title">Officer &amp; Citizen Profile</span>
                  </div>
                  <span className="badge-verified-uidai">
                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span>UIDAI / NIC Verified</span>
                  </span>
                </div>

                {/* Profile Box */}
                <div className="profile-user-banner">
                  <div className="profile-avatar-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150"
                      alt="Rajesh Kumar Sharma"
                      className="profile-avatar-img"
                    />
                    <div className="avatar-cam-badge">
                      <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="profile-info-name">{officerName}</div>
                    <div className="profile-info-role">Citizen / Officer Portal Account • Ministry of Land Revenue</div>
                    <button type="button" className="profile-photo-btn" onClick={() => alert('Photo upload dialog opened')}>
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>Change / Upload Photo</span>
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="settings-form-grid">
                  <div className="form-field-group">
                    <label className="field-label">Officer Name</label>
                    <div className="field-input-box">
                      <input
                        type="text"
                        className="field-input"
                        value={officerName}
                        onChange={(e) => setOfficerName(e.target.value)}
                      />
                      <span className="field-input-addon-right">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">Employee ID</label>
                    <div className="field-input-box">
                      <input
                        type="text"
                        className="field-input"
                        value={employeeId}
                        readOnly
                        style={{ background: '#f8fafc', color: '#475569' }}
                      />
                      <div className="field-input-addon-right">
                        <span className="badge-locked">
                          <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2" fill="none">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Locked
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">Office Email</label>
                    <div className="field-input-box">
                      <input
                        type="email"
                        className="field-input"
                        value={officeEmail}
                        onChange={(e) => setOfficeEmail(e.target.value)}
                      />
                      <span className="field-input-addon-right">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="#006747" strokeWidth="2" fill="none">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">Mobile Number</label>
                    <div className="field-input-box">
                      <input
                        type="text"
                        className="field-input"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <div className="field-input-addon-right">
                        <span className="badge-verified-green">
                          <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" strokeWidth="2.5" fill="none">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">District Office</label>
                    <div className="field-input-box">
                      <select
                        className="field-input"
                        value={districtOffice}
                        onChange={(e) => setDistrictOffice(e.target.value)}
                      >
                        <option>Bihar District Central Registry</option>
                        <option>Patna District Registry</option>
                        <option>Muzaffarpur District Registry</option>
                        <option>Gaya District Registry</option>
                        <option>Bhagalpur District Registry</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="field-label">Taluka Office</label>
                    <div className="field-input-box">
                      <select
                        className="field-input"
                        value={talukaOffice}
                        onChange={(e) => setTalukaOffice(e.target.value)}
                      >
                        <option>Haveli Sub-Registry Office 04</option>
                        <option>Danapur Sub-Registry Office</option>
                        <option>Patna Sadar Sub-Registry Office</option>
                        <option>Kanti Sub-Registry Office</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-group form-full-width">
                    <label className="field-label">Language Preference</label>
                    <div className="field-input-box">
                      <select
                        className="field-input"
                        value={languagePreference}
                        onChange={(e) => setLanguagePreference(e.target.value)}
                      >
                        <option>English (EN)</option>
                        <option>हिन्दी (HI)</option>
                        <option>मराठी (MR)</option>
                      </select>
                      <span className="field-input-addon-right" style={{ right: '2rem' }}>
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Security & Session Preferences */}
              <div className="settings-card">
                <div className="settings-card-header">
                  <div className="settings-card-title-group">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="#006747" strokeWidth="2" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="settings-card-title">Security &amp; Session Preferences</span>
                  </div>
                </div>

                <div className="security-list">
                  {/* 2FA Item */}
                  <div className="security-row">
                    <div className="security-item-left">
                      <span className="security-item-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      </span>
                      <div>
                        <div className="security-item-title">
                          <span>Two-Factor Authentication (2FA)</span>
                          <span className="badge-mandatory">Mandatory</span>
                        </div>
                        <div className="security-item-desc">Aadhaar / Mobile OTP on every officer sign-in</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`toggle-switch ${twoFactor ? 'is-active' : ''}`}
                      onClick={() => setTwoFactor(!twoFactor)}
                      aria-label="Toggle Two-Factor Authentication"
                    >
                      <span className="toggle-knob" />
                    </button>
                  </div>

                  {/* Auto Logout Item */}
                  <div className="security-row">
                    <div className="security-item-left">
                      <span className="security-item-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </span>
                      <div>
                        <div className="security-item-title">Auto Logout</div>
                        <div className="security-item-desc">Inactivity session termination</div>
                      </div>
                    </div>
                    <select
                      className="auto-logout-select"
                      value={autoLogout}
                      onChange={(e) => setAutoLogout(e.target.value)}
                    >
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>

                  {/* Dark Mode Item */}
                  <div className="security-row">
                    <div className="security-item-left">
                      <span className="security-item-icon">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      </span>
                      <div>
                        <div className="security-item-title">Dark Mode</div>
                        <div className="security-item-desc">Toggle dark theme appearance</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`toggle-switch ${darkMode ? 'is-active' : ''}`}
                      onClick={() => setDarkMode(!darkMode)}
                      aria-label="Toggle Dark Mode"
                    >
                      <span className="toggle-knob" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= DASHBOARD OVERVIEW SECTION ================= */
          <div>
            {/* Top Breadcrumb & Status */}
            <div className="bihar-topbar">
              <div className="bihar-breadcrumbs">
                <span>PORTAL</span>
                <span>/</span>
                <span className="active-crumb">DASHBOARD</span>
              </div>
              <div className="bihar-status-badge">
                <span className="bihar-status-dot"></span>
                <span>All 38 Bihar Districts Online</span>
              </div>
            </div>

            {/* Title Section */}
            <div className="bihar-header">
              <h1>Bihar Land Records Dashboard</h1>
              <p>Overview of registered land parcels, mutation applications, and Jamabandi records across Bihar.</p>
            </div>

            {/* Top 4 Metrics Cards */}
            <div className="bihar-stats-grid">
              {/* Card 1 */}
              <div className="bihar-stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Total Registered Parcels</span>
                  <span className="stat-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                </div>
                <div className="stat-card-value">3,42,891</div>
                <div className="stat-card-footer trend-green">
                  <span>↗ +1,280 this month</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bihar-stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Approved Mutations (Dakhil Kharij)</span>
                  <span className="stat-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </span>
                </div>
                <div className="stat-card-value">3,18,450</div>
                <div className="stat-card-footer trend-green">
                  <span>● 92.8% clearance rate</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bihar-stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Pending Reviews (Circle Officer)</span>
                  <span className="stat-icon" style={{ color: '#d97706' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </span>
                </div>
                <div className="stat-card-value">142</div>
                <div className="stat-card-footer trend-orange">
                  <span>⏱ Within statutory 21-day SLA</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bihar-stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-title">Revenue &amp; Stamp Duty</span>
                  <span className="stat-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </span>
                </div>
                <div className="stat-card-value">₹48.6 Cr</div>
                <div className="stat-card-footer trend-muted">
                  <span>Current Fiscal Year 2024-25</span>
                </div>
              </div>
            </div>

            {/* Content Split Layout */}
            <div className="bihar-content-layout">
              {/* Left Table Panel */}
              <div className="bihar-panel">
                <div className="panel-header-row">
                  <div>
                    <div className="panel-title">Recent Mutation Applications (Dakhil-Kharij)</div>
                    <div className="panel-subtitle">Track recent ownership transfer and mutation requests submitted online</div>
                  </div>
                  <div className="table-filter-pills">
                    {(['All', 'Danapur', 'Patna Sadar', 'Muzaffarpur'] as const).map((filter) => (
                      <button
                        key={filter}
                        className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <table className="bihar-table">
                  <thead>
                    <tr>
                      <th>Case Number</th>
                      <th>Property / Raiyat</th>
                      <th>Anchal (Circle)</th>
                      <th>Date Applied</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row) => (
                      <tr key={row.caseNumber}>
                        <td className="case-cell">{row.caseNumber}</td>
                        <td>
                          <div className="raiyat-cell-name">{row.raiyat}</div>
                          <div className="raiyat-cell-sub">{row.details}</div>
                        </td>
                        <td className="anchal-cell">{row.anchal}</td>
                        <td className="date-cell">{row.date}</td>
                        <td>
                          <span
                            className={`badge-status ${
                              row.status === 'Approved'
                                ? 'badge-approved'
                                : row.status === 'Under Review'
                                ? 'badge-review'
                                : 'badge-disposed'
                            }`}
                          >
                            ● {row.status}
                          </span>
                        </td>
                        <td>
                          <span className="action-link">{row.actionLabel}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="panel-footer-row">
                  <span>Showing latest {filteredData.length} of 1,420 registered mutation records</span>
                  <span className="view-all-link">View All Records →</span>
                </div>
              </div>

              {/* Right Column: Notices & Support */}
              <div className="right-column">
                {/* Notices Panel */}
                <div className="bihar-panel">
                  <div className="panel-header-row" style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="#006747" strokeWidth="2" fill="none">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                      <div className="panel-title" style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                        Official Notices &amp; Updates
                      </div>
                    </div>
                    <span className="action-link" style={{ fontSize: '0.75rem' }}>
                      View All
                    </span>
                  </div>

                  <div className="updates-list">
                    <div className="update-item">
                      <div className="update-dot"></div>
                      <div>
                        <div className="update-text">
                          Mandatory digital Jamabandi linkage enabled for all mutation applications in Danapur and Patna Sadar circles.
                        </div>
                        <div className="update-meta">Circular #108 • May 14, 2024</div>
                      </div>
                    </div>

                    <div className="update-item">
                      <div className="update-dot"></div>
                      <div>
                        <div className="update-text">
                          Special clearance drive for pending Dakhil-Kharij cases under 21-day statutory limit across all 38 districts.
                        </div>
                        <div className="update-meta">Order #204 • May 10, 2024</div>
                      </div>
                    </div>

                    <div className="update-item">
                      <div className="update-dot"></div>
                      <div>
                        <div className="update-text">
                          Updated valuation guidelines and stamp duty slabs for urban commercial plots effective June 1.
                        </div>
                        <div className="update-meta">Revenue Dept Notice • May 03, 2024</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Helpline & Support Panel */}
                <div className="bihar-panel support-panel">
                  <div className="support-header">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="#006747" strokeWidth="2" fill="none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Helpline &amp; Support</span>
                  </div>
                  <div className="support-desc">
                    Need assistance with property registration, mutation disputes, or digital record corrections?
                  </div>

                  <div className="support-details-box">
                    <div className="support-detail-row">
                      <span className="support-label">Toll-Free Helpline</span>
                      <span className="support-val" style={{ color: '#006747' }}>
                        1800-345-6214
                      </span>
                    </div>
                    <div className="support-detail-row">
                      <span className="support-label">Working Hours</span>
                      <span className="support-val">10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="support-detail-row">
                      <span className="support-label">Revenue Desk</span>
                      <span className="support-val" style={{ fontSize: '0.7rem' }}>
                        revenue-helpdesk@bihar.gov.in
                      </span>
                    </div>
                  </div>

                  <button className="btn-support-ticket">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Open Support Ticket</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
