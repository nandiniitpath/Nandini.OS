// =============================================================================
// WORKSPACE OS — ErrorState Component
// Graceful error display with retry options
// =============================================================================

import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({
  title = 'Something didn’t sync',
  message = 'Could not load data for this view. Please try again.',
  onRetry
}) {
  return (
    <div className="ws-empty-state" role="alert">
      <div
        className="ws-empty-icon"
        style={{ background: 'var(--red-dim)', borderColor: 'rgba(248, 113, 113, 0.2)', color: 'var(--status-red)' }}
        aria-hidden="true"
      >
        <AlertCircle size={22} />
      </div>
      <h4 className="ws-empty-title">{title}</h4>
      <p className="ws-empty-desc">{message}</p>
      {onRetry && (
        <button
          type="button"
          className="ws-btn ws-btn-secondary ws-btn-sm"
          onClick={onRetry}
        >
          <RefreshCw size={13} />
          Retry
        </button>
      )}
    </div>
  );
}
