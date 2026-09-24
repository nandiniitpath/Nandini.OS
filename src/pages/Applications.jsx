// =============================================================================
// WORKSPACE OS — Applications Page
// Career & opportunity pipeline tracker (Starts clean at 0 for new users)
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Briefcase, Trash2 } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { applicationService } from '../services/api';
import { applicationStatuses } from '../data/mockData';
import { formatDate } from '../utils/helpers';

export default function Applications() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    company: '',
    position: '',
    location: '',
    country: '',
    status: 'APPLIED',
    applicationDate: new Date().toISOString().split('T')[0],
    notes: '',
    link: ''
  });

  const loadApplications = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await applicationService.getApplications(user.id);
      setApplications(data);
    } catch (err) {
      console.error('Failed to load applications', err);
    }
  }, [user?.id]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  const counts = useMemo(() => {
    return {
      TOTAL: applications.length,
      APPLIED: applications.filter(a => a.status === 'APPLIED').length,
      INTERVIEW: applications.filter(a => a.status === 'INTERVIEW').length,
      OFFER: applications.filter(a => a.status === 'OFFER').length,
      REJECTED: applications.filter(a => a.status === 'REJECTED').length
    };
  }, [applications]);

  const filteredApplications = useMemo(() => {
    if (activeFilter === 'ALL') return applications;
    return applications.filter(a => a.status === activeFilter);
  }, [applications, activeFilter]);

  const handleCreateApplication = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.position.trim() || !user?.id) return;

    await applicationService.createApplication(user.id, form);
    setModalOpen(false);
    setForm({
      company: '',
      position: '',
      location: '',
      country: '',
      status: 'APPLIED',
      applicationDate: new Date().toISOString().split('T')[0],
      notes: '',
      link: ''
    });

    if (showToast) showToast('Application record created.', 'success');
    loadApplications();
  };

  const handleDeleteApplication = async (appId) => {
    if (!user?.id) return;
    await applicationService.deleteApplication(user.id, appId);
    if (showToast) showToast('Application removed.', 'info');
    loadApplications();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'OFFER': return <span className="ws-badge green"><span className="ws-badge-dot" />Offer</span>;
      case 'INTERVIEW': return <span className="ws-badge violet"><span className="ws-badge-dot" />Interview</span>;
      case 'APPLIED': return <span className="ws-badge blue"><span className="ws-badge-dot" />Applied</span>;
      case 'REJECTED': return <span className="ws-badge red"><span className="ws-badge-dot" />Rejected</span>;
      default: return <span className="ws-badge muted"><span className="ws-badge-dot" />{status}</span>;
    }
  };

  return (
    <div>
      {/* Header section */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Applications
            </h1>
            <p className="ws-page-subtitle">
              Track your job, internship and career applications.
            </p>
          </div>
          <div className="ws-page-actions">
            <button
              type="button"
              className="ws-btn ws-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={14} />
              Add Application
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Banner calculated from REAL records */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        <div className="ws-card" style={{ padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {counts.TOTAL}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
            Total Tracked
          </div>
        </div>
        <div className="ws-card" style={{ padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--status-blue)' }}>
            {counts.APPLIED}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
            Applied
          </div>
        </div>
        <div className="ws-card" style={{ padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-lavender)' }}>
            {counts.INTERVIEW}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
            Interviews
          </div>
        </div>
        <div className="ws-card" style={{ padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--status-green)' }}>
            {counts.OFFER}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
            Offers
          </div>
        </div>
        <div className="ws-card" style={{ padding: '14px 16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--status-red)' }}>
            {counts.REJECTED}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
            Rejected
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <FilterBar
        categories={applicationStatuses}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* Table or Empty State */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No applications yet"
          description="Start tracking your job and internship applications to keep your search organized."
          action="Add Application"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="ws-table-container">
          <table className="ws-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Location</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(app => (
                <tr key={app.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.84rem' }}>
                      {app.company}
                    </div>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-secondary)' }}>{app.position}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-muted)' }}>{app.location || 'Remote'}</span>
                  </td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
                      {formatDate(app.applicationDate)}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="ws-icon-btn"
                      style={{ width: 28, height: 28, color: 'var(--text-faint)' }}
                      onClick={() => handleDeleteApplication(app.id)}
                      title="Remove application"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Application Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Application"
        footer={
          <>
            <button
              type="button"
              className="ws-btn ws-btn-ghost ws-btn-sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ws-btn ws-btn-primary ws-btn-sm"
              onClick={handleCreateApplication}
            >
              Save Application
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateApplication}>
          <div className="ws-field">
            <label className="ws-field-label">Company Name *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Stripe, Linear, Vercel"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Position / Role *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Software Engineer, Product Designer"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="ws-field">
              <label className="ws-field-label">Location</label>
              <input
                type="text"
                className="ws-input"
                placeholder="e.g. San Francisco, Remote"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="ws-field">
              <label className="ws-field-label">Status</label>
              <select
                className="ws-input"
                style={{ backgroundColor: 'var(--bg-card)' }}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="SAVED">Saved</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
                <option value="WITHDRAWN">Withdrawn</option>
              </select>
            </div>
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Date Applied</label>
            <input
              type="date"
              className="ws-input"
              value={form.applicationDate}
              onChange={(e) => setForm({ ...form, applicationDate: e.target.value })}
            />
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Notes & Preparation</label>
            <textarea
              className="ws-input ws-textarea"
              placeholder="Notes, contact information, interview round updates..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
