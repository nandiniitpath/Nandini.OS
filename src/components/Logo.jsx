// =============================================================================
// WORKSPACE OS — Brand Logo Component
// Isometric 3D Hexagonal Cube with Violet/Indigo Gradient
// =============================================================================

export default function Logo({ size = 26, showText = true, className = '' }) {
  return (
    <div
      className={`ws-brand-container ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, userSelect: 'none' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.45))' }}
      >
        <defs>
          <linearGradient id="logoCubeTop" x1="20" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="logoCubeLeft" x1="6" y1="12" x2="20" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="logoCubeRight" x1="20" y1="12" x2="34" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
        </defs>
        {/* Top Face */}
        <polygon points="20,4 34,12 20,20 6,12" fill="url(#logoCubeTop)" />
        {/* Left Face */}
        <polygon points="6,12 20,20 20,36 6,28" fill="url(#logoCubeLeft)" />
        {/* Right Face */}
        <polygon points="20,20 34,12 34,28 20,36" fill="url(#logoCubeRight)" />
        {/* Inner Cutouts */}
        <polygon points="20,8 29,13 20,18 11,13" fill="#070914" opacity="0.65" />
        <polygon points="11,15 18,19 18,29 11,25" fill="#070914" opacity="0.65" />
        <polygon points="22,19 29,15 29,25 22,29" fill="#070914" opacity="0.65" />
      </svg>

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
