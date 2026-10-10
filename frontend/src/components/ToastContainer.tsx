import React from 'react';
import { useToast } from '../contexts/ToastContext';
import type { Toast } from '../types';

const ICONS: Record<Toast['type'], string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => (
  <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
    <span className="toast-icon">{ICONS[toast.type]}</span>
    <div className="toast-body">
      <div className="toast-title">{toast.title}</div>
      {toast.message && <div className="toast-message">{toast.message}</div>}
    </div>
    <button className="toast-close" onClick={onClose} aria-label="Dismiss">✕</button>
  </div>
);

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};
