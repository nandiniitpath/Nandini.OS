// =============================================================================
// WORKSPACE OS — ToolCard Component
// Interactive tool representation
// =============================================================================

import { ArrowUpRight } from 'lucide-react';
import { toolIconMap } from '../utils/helpers';

export default function ToolCard({ tool, onClick }) {
  const iconEmoji = toolIconMap[tool.icon] || '🔧';

  return (
    <div
      className="ws-card ws-card-interactive"
      onClick={() => onClick && onClick(tool)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick(tool);
        }
      }}
      aria-label={`View details for ${tool.name}`}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            flexShrink: 0
          }}
          aria-hidden="true"
        >
          {iconEmoji}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {tool.name}
          </h4>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-lavender)',
              opacity: 0.7
            }}
          >
            {tool.categoryLabel || tool.category}
          </span>
        </div>
      </div>

      <p
        style={{
          fontSize: '0.76rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          flex: 1
        }}
      >
        {tool.description}
      </p>

      {/* Usage highlights */}
      {tool.usage && tool.usage.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {tool.usage.slice(0, 3).map((item) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                padding: '2px 7px',
                borderRadius: 4,
                background: 'var(--violet-dim)',
                color: 'var(--accent-lavender)',
                border: '1px solid rgba(139, 92, 246, 0.12)'
              }}
            >
              {item}
            </span>
          ))}
          {tool.usage.length > 3 && (
            <span style={{ fontSize: '0.62rem', color: 'var(--text-faint)', alignSelf: 'center' }}>
              +{tool.usage.length - 3}
            </span>
          )}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 4
        }}
      >
        <span style={{ fontSize: '0.68rem', color: 'var(--text-faint)' }}>
          {tool.relatedProjects?.length > 0
            ? `${tool.relatedProjects.length} related project${tool.relatedProjects.length > 1 ? 's' : ''}`
            : 'Workspace utility'}
        </span>
        <ArrowUpRight size={13} color="var(--text-muted)" />
      </div>
    </div>
  );
}
