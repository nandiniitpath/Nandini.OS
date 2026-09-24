// =============================================================================
// WORKSPACE OS — ApplicationTable Component
// Application tracking data table and responsive view
// =============================================================================

import { formatDate } from '../utils/helpers';

export default function ApplicationTable({ applications = [], onSelect }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'APPLIED':
        return <span className="ws-badge blue"><span className="ws-badge-dot" />Applied</span>;
      case 'TEST':
        return <span className="ws-badge amber"><span className="ws-badge-dot" />Test</span>;
      case 'INTERVIEW':
        return <span className="ws-badge violet"><span className="ws-badge-dot" />Interview</span>;
      case 'OFFER':
        return <span className="ws-badge green"><span className="ws-badge-dot" />Offer</span>;
      case 'REJECTED':
        return <span className="ws-badge red"><span className="ws-badge-dot" />Rejected</span>;
      default:
        return <span className="ws-badge muted"><span className="ws-badge-dot" />{status}</span>;
    }
  };

  if (!applications || applications.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-faint)' }}>
        No application records match this filter.
      </div>
    );
  }

  return (
    <div className="ws-table-container">
      <table className="ws-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Location</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.id}
              onClick={() => onSelect && onSelect(app)}
              style={{ cursor: onSelect ? 'pointer' : 'default' }}
            >
              <td>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.84rem' }}>
                  {app.company}
                </div>
                {app.country && (
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-faint)' }}>
                    {app.country}
                  </div>
                )}
              </td>
              <td>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {app.position}
                </span>
              </td>
              <td>
                <span style={{ color: 'var(--text-muted)' }}>
                  {app.location}
                </span>
              </td>
              <td>{getStatusBadge(app.status)}</td>
              <td>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                  {formatDate(app.applicationDate)}
                </span>
              </td>
              <td>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                  {formatDate(app.lastUpdated)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
