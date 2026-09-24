// =============================================================================
// WORKSPACE OS — Drawer Component
// Right-sliding drawer for details and side panels
// =============================================================================

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Drawer({
  open,
  onClose,
  title,
  children,
  width = '520px'
}) {
  const drawerRef = useRef(null);

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
      className="ws-drawer-backdrop open"
      onClick={(e) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target)) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Side panel'}
    >
      <div
        className="ws-drawer-content"
        ref={drawerRef}
        style={{ width: `min(${width}, 100vw)` }}
      >
        <div className="ws-drawer-header">
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)'
          }}>
            {title}
          </h3>
          <button
            type="button"
            className="ws-icon-btn"
            onClick={onClose}
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
        <div className="ws-drawer-body">
          {children}
        </div>
      </div>
    </div>
  );
}
