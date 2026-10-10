import React from 'react';
import type { UserRole } from '../types';

interface RoleOption {
  role: UserRole;
  icon: string;
  iconClass: string;
  title: string;
  description: string;
}

const ROLES: RoleOption[] = [
  {
    role: 'CITIZEN',
    icon: '👤',
    iconClass: 'citizen',
    title: 'Citizen / Property Owner',
    description: 'Buy, sell, or transfer land properties',
  },
  {
    role: 'LRO',
    icon: '⚖️',
    iconClass: 'lro',
    title: 'Registration Officer (LRO)',
    description: 'Verify documents and approve mutations',
  },
  {
    role: 'ADMIN',
    icon: '🛡️',
    iconClass: 'admin',
    title: 'Government Administrator',
    description: 'System monitoring and audit oversight',
  },
];

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  label?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onChange,
  label = 'Select your role',
}) => {
  return (
    <div className="form-group">
      <span className="form-label required">{label}</span>
      <div className="role-selector" role="radiogroup" aria-label={label}>
        {ROLES.map(({ role, icon, iconClass, title, description }) => (
          <button
            key={role}
            type="button"
            className={`role-option${value === role ? ' selected' : ''}`}
            onClick={() => onChange(role)}
            aria-checked={value === role}
            aria-label={title}
            id={`role-${role.toLowerCase()}`}
          >
            <span className={`role-option-icon ${iconClass}`}>{icon}</span>
            <span className="role-option-info">
              <span className="role-option-title">{title}</span>
              <span className="role-option-desc">{description}</span>
            </span>
            <span className="role-option-radio" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
};
