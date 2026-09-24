// =============================================================================
// WORKSPACE OS — DataCenter Page
// Matches Bottom-Right Panel of Product Preview (Empty State + Dataset Studio)
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, BarChart3, Database, Trash2 } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { datasetService } from '../services/api';
import { datasetCategories } from '../data/mockData';
import { formatDate } from '../utils/helpers';

export default function DataCenter() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [datasets, setDatasets] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    source: 'Manual Upload',
    rowsCount: 100,
    columnsCount: 5
  });

  const loadDatasets = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await datasetService.getDatasets(user.id);
      setDatasets(data);
    } catch (err) {
      console.error('Failed to load datasets', err);
    }
  }, [user?.id]);

  useEffect(() => {
    loadDatasets();
  }, [loadDatasets]);

  const filteredDatasets = useMemo(() => {
    if (activeFilter === 'ALL') return datasets;
    return datasets;
  }, [datasets, activeFilter]);

  const handleCreateDataset = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !user?.id) return;

    await datasetService.createDataset(user.id, {
      ...form,
      rowsCount: Number(form.rowsCount) || 0,
      columnsCount: Number(form.columnsCount) || 0
    });

    setModalOpen(false);
    setForm({
      name: '',
      description: '',
      source: 'Manual Upload',
      rowsCount: 100,
      columnsCount: 5
    });

    if (showToast) showToast('Dataset connected successfully.', 'success');
    loadDatasets();
  };

  const handleDeleteDataset = async (datasetId) => {
    if (!user?.id) return;
    await datasetService.deleteDataset(user.id, datasetId);
    if (showToast) showToast('Dataset removed.', 'info');
    loadDatasets();
  };

  return (
    <div>
      {/* Header section matching preview */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Data Center
            </h1>
            <p className="ws-page-subtitle">
              Analyze, visualize and explore your data.
            </p>
          </div>
          <div className="ws-page-actions">
            <button
              type="button"
              className="ws-btn ws-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={14} />
              New Dataset
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs matching preview */}
      <FilterBar
        categories={datasetCategories}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* Data Center Grid or Empty State matching preview */}
      {filteredDatasets.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="No datasets yet"
          description="Connect a dataset or upload your data to start analyzing."
          action="Add Dataset"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16 }}>
          {filteredDatasets.map((ds) => (
            <div key={ds.id} className="ws-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ws-badge blue">
                  <Database size={11} />
                  {ds.source}
                </span>
                <button
                  type="button"
                  className="ws-icon-btn"
                  style={{ width: 26, height: 26, color: 'var(--text-faint)' }}
                  onClick={() => handleDeleteDataset(ds.id)}
                  title="Remove dataset"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 700, marginBottom: 4 }}>
                  {ds.name}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {ds.description || 'Connected data source.'}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '10px 12px', background: 'var(--bg-glass)', borderRadius: 8, textAlign: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {ds.rowsCount.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                    Rows
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-lavender)' }}>
                    {ds.columnsCount}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                    Columns
                  </div>
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-faint)', paddingTop: 6, borderTop: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
                Connected {formatDate(ds.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Dataset Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Data Source"
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
              onClick={handleCreateDataset}
            >
              Connect Dataset
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateDataset}>
          <div className="ws-field">
            <label className="ws-field-label">Dataset Name *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Q3 Sales & Performance Records"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Data Source</label>
            <select
              className="ws-input"
              style={{ backgroundColor: 'var(--bg-card)' }}
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            >
              <option value="Manual Upload">CSV / Excel Upload</option>
              <option value="Google Sheets">Google Sheets Sync</option>
              <option value="REST API">External REST API</option>
              <option value="PostgreSQL">PostgreSQL / SQL Database</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="ws-field">
              <label className="ws-field-label">Approximate Rows</label>
              <input
                type="number"
                className="ws-input"
                value={form.rowsCount}
                onChange={(e) => setForm({ ...form, rowsCount: e.target.value })}
              />
            </div>
            <div className="ws-field">
              <label className="ws-field-label">Columns Count</label>
              <input
                type="number"
                className="ws-input"
                value={form.columnsCount}
                onChange={(e) => setForm({ ...form, columnsCount: e.target.value })}
              />
            </div>
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Description & Notes</label>
            <textarea
              className="ws-input ws-textarea"
              placeholder="Summary of metrics, variables, and columns..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
