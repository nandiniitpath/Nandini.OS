// =============================================================================
// WORKSPACE OS — Certifications Page
// Professional credentials and certificate vault (Starts clean at 0 for new users)
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Award, ShieldCheck, ExternalLink, Trash2 } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { certificationService } from '../services/api';
import { certCategories } from '../data/mockData';
import { formatDate } from '../utils/helpers';

export default function Certifications() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [certs, setCerts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    issuer: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Cloud',
    credentialId: '',
    verificationUrl: ''
  });

  const loadCerts = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await certificationService.getCertificates(user.id);
      setCerts(data);
    } catch (err) {
      console.error('Failed to load certificates', err);
    }
  }, [user?.id]);

  useEffect(() => {
    loadCerts();
  }, [loadCerts]);

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'ALL') return certs;
    return certs;
  }, [certs, activeFilter]);

  const handleCreateCert = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.issuer.trim() || !user?.id) return;

    await certificationService.createCertificate(user.id, form);
    setModalOpen(false);
    setForm({
      title: '',
      issuer: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Cloud',
      credentialId: '',
      verificationUrl: ''
    });

    if (showToast) showToast('Certificate added to repository.', 'success');
    loadCerts();
  };

  const handleDeleteCert = async (certId) => {
    if (!user?.id) return;
    await certificationService.deleteCertificate(user.id, certId);
    if (showToast) showToast('Certificate removed.', 'info');
    loadCerts();
  };

  return (
    <div>
      {/* Header section */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Certifications
            </h1>
            <p className="ws-page-subtitle">
              Manage your credentials, licenses and certificates.
            </p>
          </div>
          <div className="ws-page-actions">
            <button
              type="button"
              className="ws-btn ws-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={14} />
              Add Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <FilterBar
        categories={certCategories}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* Grid or Empty State */}
      {filteredCerts.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certifications yet"
          description="Add your earned certifications, licenses, and verified credentials."
          action="Add Certificate"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filteredCerts.map((cert) => (
            <div key={cert.id} className="ws-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ws-badge amber">
                  <ShieldCheck size={11} />
                  {cert.category}
                </span>
                <button
                  type="button"
                  className="ws-icon-btn"
                  style={{ width: 26, height: 26, color: 'var(--text-faint)' }}
                  onClick={() => handleDeleteCert(cert.id)}
                  title="Remove certificate"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 700, marginBottom: 4 }}>
                  {cert.title}
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Issuer: {cert.issuer}
                </div>
              </div>

              {cert.credentialId && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-faint)', background: 'var(--bg-glass)', padding: '6px 8px', borderRadius: 4 }}>
                  ID: {cert.credentialId}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border-subtle)', marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-faint)' }}>
                <span>Issued: {formatDate(cert.date)}</span>
                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ws-btn ws-btn-ghost ws-btn-sm"
                    style={{ fontSize: '0.64rem', padding: '2px 6px' }}
                  >
                    Verify <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Certificate Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Certification"
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
              onClick={handleCreateCert}
            >
              Save Certificate
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateCert}>
          <div className="ws-field">
            <label className="ws-field-label">Certification Name *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. AWS Certified Solutions Architect"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="ws-field">
              <label className="ws-field-label">Issuing Organization *</label>
              <input
                type="text"
                className="ws-input"
                placeholder="e.g. Amazon Web Services, Google"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                required
              />
            </div>
            <div className="ws-field">
              <label className="ws-field-label">Category</label>
              <input
                type="text"
                className="ws-input"
                placeholder="e.g. Cloud, Security, AI"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="ws-field">
              <label className="ws-field-label">Issue Date</label>
              <input
                type="date"
                className="ws-input"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="ws-field">
              <label className="ws-field-label">Credential ID</label>
              <input
                type="text"
                className="ws-input"
                placeholder="e.g. AWS-PSA-99120"
                value={form.credentialId}
                onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
              />
            </div>
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Verification URL</label>
            <input
              type="url"
              className="ws-input"
              placeholder="https://credly.com/..."
              value={form.verificationUrl}
              onChange={(e) => setForm({ ...form, verificationUrl: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
