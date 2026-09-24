// =============================================================================
// WORKSPACE OS — Brand Logo Component
// =============================================================================

import logoImg from '../assets/logo.jpg';

export default function Logo({ size = 28, showText = true, className = '' }) {
  // Vite imported asset handles base path automatically; fallback to BASE_URL + logo.jpg
  const logoSrc = logoImg || `${import.meta.env.BASE_URL}logo.jpg`;

  return (
    <div
      className={`ws-brand-container ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, userSelect: 'none' }}
    >
      <img
        src={logoSrc}
        alt="Workspace OS Logo"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: Math.max(4, Math.round(size * 0.22)),
          objectFit: 'cover',
          flexShrink: 0,
          boxShadow: '0 0 12px rgba(139, 92, 246, 0.35)'
        }}
      />

      {showText && (
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.98rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap'
          }}
        >
          WORKSPACE <span style={{ color: 'var(--accent-violet)' }}>OS</span>
        </span>
      )}
    </div>
  );
}
