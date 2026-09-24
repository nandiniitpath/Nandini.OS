// =============================================================================
// WORKSPACE OS — FilterBar Component
// Category / Status pill filter bar
// =============================================================================

export default function FilterBar({ categories = [], active, onChange }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="ws-filter-bar" role="tablist" aria-label="Filter categories">
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`ws-filter-btn ${isActive ? 'active' : ''}`}
            onClick={() => onChange(cat.id)}
            role="tab"
            aria-selected={isActive}
          >
            {cat.label}
            {cat.count !== undefined && (
              <span
                style={{
                  marginLeft: 6,
                  opacity: 0.6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem'
                }}
              >
                {cat.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
