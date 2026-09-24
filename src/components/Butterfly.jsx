// =============================================================================
// WORKSPACE OS — Butterfly Motif Component
// Subtle ethereal glowing butterfly matching the preview
// =============================================================================

export default function Butterfly({ size = 80, opacity = 0.45, style = {} }) {
  return (
    <svg
      width={size}
      height={(size * 2) / 3}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        opacity,
        filter: 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.6))',
        pointerEvents: 'none',
        ...style
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bfWing1" x1="60" y1="40" x2="10" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="bfWing2" x1="60" y1="40" x2="110" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="bfWingLower" x1="60" y1="40" x2="30" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Left Upper Wing */}
      <path
        d="M60 40 C45 15, 15 5, 20 28 C24 45, 48 45, 60 40Z"
        fill="url(#bfWing1)"
      />
      {/* Right Upper Wing */}
      <path
        d="M60 40 C75 15, 105 5, 100 28 C96 45, 72 45, 60 40Z"
        fill="url(#bfWing2)"
      />
      {/* Left Lower Wing */}
      <path
        d="M60 40 C52 48, 35 62, 42 72 C48 78, 62 60, 60 40Z"
        fill="url(#bfWingLower)"
      />
      {/* Right Lower Wing */}
      <path
        d="M60 40 C68 48, 85 62, 78 72 C72 78, 58 60, 60 40Z"
        fill="url(#bfWingLower)"
      />
      {/* Body Core Glow */}
      <ellipse cx="60" cy="40" rx="1.5" ry="12" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}
