// =============================================================================
// WORKSPACE OS — ProjectCard Component
// Project display card with status and tag metadata
// =============================================================================

import { ArrowUpRight, Calendar } from 'lucide-react';
import { formatDate, truncate } from '../utils/helpers';

export default function ProjectCard({ project, onClick }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="ws-badge green"><span className="ws-badge-dot" />Completed</span>;
      case 'IN PROGRESS':
        return <span className="ws-badge blue"><span className="ws-badge-dot" />In Progress</span>;
      case 'PLANNING':
        return <span className="ws-badge amber"><span className="ws-badge-dot" />Planning</span>;
      default:
        return <span className="ws-badge muted"><span className="ws-badge-dot" />{status}</span>;
    }
  };

  return (
    <div
      className="ws-card ws-card-interactive"
      onClick={() => onClick && onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick(project);
        }
      }}
      aria-label={`View project details for ${project.title}`}
      style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-lavender)',
            opacity: 0.75
          }}
        >
          {project.category}
        </span>
        {getStatusBadge(project.status)}
      </div>

      <div>
        <h4
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.98rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: 6
          }}
        >
          {project.title}
        </h4>
        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5
          }}
        >
          {truncate(project.description, 95)}
        </p>
      </div>

      {/* Tool tags */}
      {project.tools && project.tools.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
          {project.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                padding: '2px 6px',
                borderRadius: 4,
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)'
              }}
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span style={{ fontSize: '0.6rem', color: 'var(--text-faint)', alignSelf: 'center' }}>
              +{project.tools.length - 4}
            </span>
          )}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 10,
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            color: 'var(--text-faint)'
          }}
        >
          <Calendar size={11} />
          {formatDate(project.updatedAt)}
        </span>
        <ArrowUpRight size={13} color="var(--text-muted)" />
      </div>
    </div>
  );
}
