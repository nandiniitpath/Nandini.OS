// =============================================================================
// WORKSPACE OS — Toolkit Page
// 6-Category Responsive Grid with Official Brand Logos & Interactive Tool Cards
// =============================================================================

import { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import { generalTools, toolkitCategories } from '../data/generalTools';

// Resilient Logo Component with official assets & SVG fallbacks
function ToolLogo({ icon, name }) {
  const [imgFailed, setImgFailed] = useState(false);
  const iconSrc = `${import.meta.env.BASE_URL}icons/${icon}`;

  if (imgFailed || !icon) {
    return (
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-lavender)',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700
        }}
        aria-hidden="true"
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={iconSrc}
      alt={name}
      className="tk-tool-icon-img"
      width={34}
      height={34}
      loading="lazy"
      decoding="async"
      onError={() => setImgFailed(true)}
      style={{
        width: 32,
        height: 32,
        maxWidth: 34,
        maxHeight: 34,
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
}

// Category Panel Header Badge Icons
function BadgeIcon({ categoryId }) {
  switch (categoryId) {
    case 'DATA':
      return (
        <svg className="tk-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'AI':
      return (
        <svg className="tk-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      );
    case 'DEV':
      return (
        <svg className="tk-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'CYBER':
      return (
        <svg className="tk-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'RESEARCH':
      return (
        <svg className="tk-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'OTHER':
    default:
      return (
        <svg className="tk-badge-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
  }
}

export default function Toolkit() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // The 6 structured category groups
  const realCategories = useMemo(() => {
    return toolkitCategories.filter(c => c.id !== 'ALL');
  }, []);

  // Filter tools based on activeCategory and search term
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return generalTools.filter(tool => {
      const matchesCategory = activeCategory === 'ALL' || tool.category === activeCategory;
      const matchesSearch = !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        (tool.features && tool.features.some(f => f.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Group filtered tools by category
  const categoriesWithTools = useMemo(() => {
    return realCategories
      .map(cat => ({
        ...cat,
        tools: filteredTools.filter(t => t.category === cat.id)
      }))
      .filter(cat => cat.tools.length > 0);
  }, [realCategories, filteredTools]);

  const handleOpenTool = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      {/* ── Page Header with Butterfly Accent ──────────────────────── */}
      <div className="ws-page-header" style={{ marginBottom: 28, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="ws-page-eyebrow" style={{ margin: 0, letterSpacing: '0.18em' }}>
                · TOOLS THAT HELP ME CREATE ·
              </span>
              {/* Subtle Butterfly Motif */}
              <svg width="26" height="18" viewBox="0 0 120 70" fill="none" style={{ opacity: 0.85 }} aria-hidden="true">
                <path d="M60 35 C52 20, 20 8, 8 24 C-2 36, 12 56, 36 50 C48 46, 56 38, 60 35 Z" fill="rgba(167, 139, 250, 0.45)" stroke="#c4b5fd" strokeWidth="1.2" />
                <path d="M60 35 C68 20, 100 8, 112 24 C122 36, 108 56, 84 50 C72 46, 64 38, 60 35 Z" fill="rgba(167, 139, 250, 0.45)" stroke="#c4b5fd" strokeWidth="1.2" />
                <path d="M60 38 C54 44, 30 52, 26 62 C22 70, 36 74, 48 66 C56 60, 58 46, 60 38 Z" fill="rgba(139, 92, 246, 0.35)" stroke="#a78bfa" strokeWidth="1" />
                <path d="M60 38 C66 44, 90 52, 94 62 C98 70, 84 74, 72 66 C64 60, 62 46, 60 38 Z" fill="rgba(139, 92, 246, 0.35)" stroke="#a78bfa" strokeWidth="1" />
                <ellipse cx="60" cy="38" rx="2" ry="12" fill="#ede9fe" />
              </svg>
            </div>
            <h1 className="ws-page-title" style={{ fontSize: '1.9rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              MY TOOLKIT
            </h1>
            <p className="ws-page-subtitle" style={{ fontSize: '0.86rem', marginTop: 4, color: 'var(--text-secondary)' }}>
              APPLICATIONS • PLATFORMS • RESOURCES — Tools are just the beginning, it's how I use them that matters.
            </p>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', width: 280, maxWidth: '100%' }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
            <input
              type="text"
              className="ws-input"
              style={{ paddingLeft: 36, height: 38, fontSize: '0.82rem', background: 'rgba(15, 23, 42, 0.65)' }}
              placeholder="Search tools, skills, platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ───────────────────────────────────────────── */}
      <div style={{ marginBottom: 28 }}>
        <FilterBar
          categories={toolkitCategories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* ── 6-Category Panels Responsive Grid ─────────────────────── */}
      {categoriesWithTools.length === 0 ? (
        <EmptyState
          title="No tools found"
          description={`No tools match "${searchQuery}". Try selecting another category or resetting the search.`}
        />
      ) : (
        <div className="tk-categories-grid">
          {categoriesWithTools.map(category => {
            // Determine column layout for tools grid based on tool count
            const toolCount = category.tools.length;
            const gridColsClass = toolCount === 5 ? 'cols-5' : toolCount >= 6 ? 'cols-6' : toolCount === 4 ? 'cols-4' : 'cols-3';

            return (
              <article key={category.id} className="tk-panel">
                {/* Panel Header */}
                <div className="tk-panel-header">
                  <div className="tk-panel-meta">
                    <div className="tk-num-wrap">
                      <span className="tk-number">{category.number}</span>
                      <span className="tk-num-line"></span>
                    </div>
                    <h3 className="tk-title">{category.title}</h3>
                    <p className="tk-desc">{category.desc}</p>
                  </div>
                  <div className="tk-badge" aria-hidden="true">
                    <BadgeIcon categoryId={category.id} />
                    <span>{category.badge}</span>
                  </div>
                </div>

                {/* Tools Grid within this Category */}
                <div className={`tk-tools-grid ${gridColsClass}`}>
                  {category.tools.map(tool => (
                    <div
                      key={tool.id}
                      className="tk-tool-card"
                      onClick={() => handleOpenTool(tool.url)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenTool(tool.url);
                        }
                      }}
                      title={`${tool.name} — ${tool.description}`}
                    >
                      <div className="tk-icon-wrap" aria-hidden="true">
                        <ToolLogo icon={tool.icon} name={tool.name} />
                      </div>
                      <h4 className="tk-tool-name">{tool.name}</h4>
                      {tool.features && tool.features.length > 0 && (
                        <ul className="tk-features">
                          {tool.features.map(f => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Panel Footer Action Link */}
                <div className="tk-panel-footer">
                  <button
                    type="button"
                    className="tk-action-btn"
                    onClick={() => handleOpenTool(category.footerUrl)}
                  >
                    <span>{category.footerLabel}</span>
                    <ArrowRight size={13} style={{ marginLeft: 2 }} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ── Bottom Decorative Bar ─────────────────────────────────── */}
      <footer className="tk-bottom-bar" aria-hidden="true">
        <div className="tk-bottom-left">
          BETTER TOOLS.<br />BRIGHTER IDEAS.
        </div>
        <div className="tk-bottom-center">
          <div style={{ width: 180, height: 24, opacity: 0.7, marginBottom: 2 }}>
            <svg viewBox="0 0 240 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <path d="M0,40 L30,22 L65,32 L110,12 L150,28 L195,14 L240,30 L240,40 Z" fill="rgba(139, 92, 246, 0.15)" />
              <path d="M0,40 L45,28 L90,36 L135,18 L175,32 L215,20 L240,32 L240,40 Z" fill="rgba(8, 12, 22, 0.85)" />
              <circle cx="120" cy="8" r="2" fill="#c4b5fd" opacity="0.8" />
              <circle cx="138" cy="14" r="1.2" fill="#ffffff" opacity="0.6" />
            </svg>
          </div>
          <span className="tk-tag-line">BUILT • LEARNED • EXPERIMENTED</span>
          <span className="tk-clearer-me">DIFFERENT TOOLS. A CLEARER ME.</span>
        </div>
        <div className="tk-bottom-right">
          WORKSPACE OS
        </div>
      </footer>
    </div>
  );
}
