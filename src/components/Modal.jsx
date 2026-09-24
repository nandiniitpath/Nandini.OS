// =============================================================================
// WORKSPACE OS — Modal Component
// =============================================================================

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  maxWidth = '540px'
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    }
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="ws-modal-backdrop open"
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal dialog'}
    >
      <div
        className="ws-modal-dialog"
        ref={modalRef}
        style={{ maxWidth }}
      >
        <div className="ws-modal-header">
          <h3 className="ws-modal-title">{title}</h3>
          <button
            type="button"
            className="ws-icon-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>
        <div className="ws-modal-body">
          {children}
        </div>
        {footer && (
          <div className="ws-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
