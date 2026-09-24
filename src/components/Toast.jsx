// =============================================================================
// WORKSPACE OS — Toast Component
// Discrete notification snackbar
// =============================================================================

import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

export default function Toast({ toast, onDismiss }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={15} style={{ color: 'var(--status-green)' }} />;
      case 'warning':
        return <AlertTriangle size={15} style={{ color: 'var(--status-amber)' }} />;
      case 'error':
        return <AlertCircle size={15} style={{ color: 'var(--status-red)' }} />;
      default:
        return <Info size={15} style={{ color: 'var(--accent-lavender)' }} />;
    }
  };

  return (
    <div
      className={`ws-toast-bubble ${toast.show ? 'visible' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
        {getIcon()}
        <span>{toast.message}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="ws-icon-btn"
          style={{ width: 20, height: 20, marginLeft: 8 }}
          aria-label="Dismiss notification"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
