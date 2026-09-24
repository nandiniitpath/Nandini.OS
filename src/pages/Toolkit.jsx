// =============================================================================
// WORKSPACE OS — Toolkit Page
// Matches Middle-Right Panel of Product Preview (General Productivity Tools Directory)
// =============================================================================

import { useState, useMemo } from 'react';
import { Search, Bookmark, ExternalLink } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import { generalTools, toolkitCategories } from '../data/generalTools';
import { toolIconMap } from '../utils/helpers';

export default function Toolkit() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarked, setBookmarked] = useState({});

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTools = useMemo(() => {
    return generalTools.filter(tool => {
      const matchesCategory = activeCategory === 'ALL' || tool.category === activeCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div>
      {/* Header section matching preview */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Toolkit
            </h1>
            <div className="ws-page-eyebrow" style={{ marginTop: 4, marginBottom: 2 }}>
              Applications • Platforms • Resources
            </div>
            <p className="ws-page-subtitle">
              Explore tools to boost your productivity, learning and creativity.
            </p>
          </div>
          <div style={{ position: 'relative', width: 240 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
            <input
              type="text"
              className="ws-input"
              style={{ paddingLeft: 34, height: 36, fontSize: '0.8rem' }}
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs matching preview */}
      <FilterBar
        categories={toolkitCategories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Grid of Tools matching preview cards */}
      {filteredTools.length === 0 ? (
        <EmptyState
          title="No tools found"
          description="Try selecting another category or refining your search term."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {filteredTools.map(tool => {
            const isBookmarked = Boolean(bookmarked[tool.id]);
            const iconEmoji = toolIconMap[tool.icon] || '🔧';

            return (
              <div
                key={tool.id}
                className="ws-card ws-card-interactive"
                onClick={() => tool.url && window.open(tool.url, '_blank', 'noopener,noreferrer')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (tool.url) window.open(tool.url, '_blank', 'noopener,noreferrer');
                  }
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-glass)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem'
                    }}
                    aria-hidden="true"
                  >
                    {iconEmoji}
                  </div>

                  <button
                    type="button"
                    className="ws-icon-btn"
                    style={{ width: 28, height: 28, color: isBookmarked ? 'var(--accent-lavender)' : 'var(--text-faint)' }}
                    onClick={(e) => toggleBookmark(tool.id, e)}
                    aria-label="Bookmark tool"
                    title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  >
                    <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {tool.name}
                  </h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-lavender)', opacity: 0.8, textTransform: 'uppercase', marginTop: 2 }}>
                    {tool.categoryLabel}
                  </div>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>
                  {tool.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-faint)' }}>
                  <span>Launch External</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
