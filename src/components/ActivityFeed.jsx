// =============================================================================
// WORKSPACE OS — ActivityFeed Component
// Real-time timeline of recent actions & system updates
// =============================================================================

export default function ActivityFeed({ activities = [] }) {
  if (!activities || activities.length === 0) {
    return (
      <div style={{ padding: 16, color: 'var(--text-faint)', fontSize: '0.8rem' }}>
        No recent activity logged.
      </div>
    );
  }

  return (
    <div className="ws-feed">
      {activities.map((item) => (
        <div key={item.id} className="ws-feed-item">
          <span
            className={`ws-feed-bullet ${item.type || 'violet'}`}
            aria-hidden="true"
          />
          <div style={{ flex: 1 }}>
            <div className="ws-feed-text">{item.text}</div>
            <div className="ws-feed-time">{item.timestamp}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
