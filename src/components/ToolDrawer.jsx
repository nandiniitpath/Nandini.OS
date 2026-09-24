// =============================================================================
// WORKSPACE OS — ToolDrawer Component
// Detailed drawer for selected tool in Toolkit
// =============================================================================

import Drawer from './Drawer';
import { ExternalLink, FolderGit2, CheckCircle2 } from 'lucide-react';
import { toolIconMap } from '../utils/helpers';
import { mockProjects } from '../data/mockData';

export default function ToolDrawer({ tool, open, onClose }) {
  if (!tool) return null;

  const iconEmoji = toolIconMap[tool.icon] || '🔧';
  const relatedProjects = mockProjects.filter(p => tool.relatedProjects?.includes(p.id));

  return (
    <Drawer open={open} onClose={onClose} title={tool.name}>
      <div>
        {/* Header summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              flexShrink: 0
            }}
            aria-hidden="true"
          >
            {iconEmoji}
          </div>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--text-primary)'
              }}
            >
              {tool.name}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-lavender)',
                opacity: 0.8
              }}
            >
              {tool.categoryLabel || tool.category}
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 24
          }}
        >
          {tool.description}
        </p>

        {/* Use Cases */}
        <div style={{ marginBottom: 24 }}>
          <div className="ws-field-label">How I Use This Tool</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tool.usage?.map((use) => (
              <div
                key={use}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <CheckCircle2 size={14} color="var(--accent-violet)" style={{ flexShrink: 0 }} />
                <span>{use}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div className="ws-field-label">Related Projects</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {relatedProjects.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-glass)'
                  }}
                >
                  <FolderGit2 size={15} color="var(--accent-blue)" />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {p.status} · {p.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* External launch link */}
        {tool.url && (
          <div style={{ marginTop: 32 }}>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ws-btn ws-btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <ExternalLink size={14} />
              Open External Tool
            </a>
          </div>
        )}
      </div>
    </Drawer>
  );
}
