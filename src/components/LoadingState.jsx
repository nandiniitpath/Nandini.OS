// =============================================================================
// WORKSPACE OS — LoadingState Component
// Shimmer skeleton cards & placeholders
// =============================================================================

export function Skeleton({ width = '100%', height = '16px', borderRadius = '4px', style = {} }) {
  return (
    <div
      className="ws-skeleton"
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  );
}

export default function LoadingState({ count = 3, type = 'card' }) {
  if (type === 'table') {
    return (
      <div className="ws-table-container" style={{ padding: 16 }}>
        <Skeleton height="32px" style={{ marginBottom: 16 }} />
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} height="24px" style={{ marginBottom: 10 }} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ws-card">
          <Skeleton width="45%" height="18px" style={{ marginBottom: 12 }} />
          <Skeleton width="90%" height="12px" style={{ marginBottom: 8 }} />
          <Skeleton width="70%" height="12px" style={{ marginBottom: 16 }} />
          <div style={{ display: 'flex', gap: 6 }}>
            <Skeleton width="50px" height="18px" borderRadius="10px" />
            <Skeleton width="60px" height="18px" borderRadius="10px" />
          </div>
        </div>
      ))}
    </div>
  );
}
