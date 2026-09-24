// =============================================================================
// WORKSPACE OS — StatCard Component
// Statistic card with domain-colored square icon badge matching the preview
// =============================================================================

export default function StatCard({ label, value = 0, icon: Icon, color = 'blue' }) {
  return (
    <div className="ws-stat-card">
      <div className={`ws-stat-icon-square ${color}`} aria-hidden="true">
        {Icon && <Icon size={20} />}
      </div>
      <div className="ws-stat-info">
        <span className="ws-stat-title">{label}</span>
        <span className="ws-stat-number">{value}</span>
      </div>
    </div>
  );
}
