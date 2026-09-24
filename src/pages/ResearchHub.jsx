// =============================================================================
// WORKSPACE OS — ResearchHub Page
// Matches Bottom-Center Panel of Product Preview (Empty State + Note Management)
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, BookOpen, Search, SlidersHorizontal, Tag, Trash2 } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import Drawer from '../components/Drawer';
import { useAuth } from '../context/AuthContext';
import { researchService } from '../services/api';
import { researchCategories } from '../data/mockData';
import { formatDate } from '../utils/helpers';

export default function ResearchHub() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [notes, setNotes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Research',
    tags: '',
    source: '',
    content: '',
    status: 'SAVED'
  });

  const loadNotes = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await researchService.getResearchNotes(user.id);
      setNotes(data);
    } catch (err) {
      console.error('Failed to load notes', err);
    }
  }, [user?.id]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesFilter = activeFilter === 'ALL' || n.status.toUpperCase() === activeFilter.toUpperCase();
      const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [notes, activeFilter, searchQuery]);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !user?.id) return;

    await researchService.createResearchNote(user.id, {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setModalOpen(false);
    setForm({
      title: '',
      category: 'Research',
      tags: '',
      source: '',
      content: '',
      status: 'SAVED'
    });

    if (showToast) showToast('Research note saved.', 'success');
    loadNotes();
  };

  const handleDeleteNote = async (noteId) => {
    if (!user?.id) return;
    await researchService.deleteResearchNote(user.id, noteId);
    setActiveNote(null);
    if (showToast) showToast('Note removed.', 'info');
    loadNotes();
  };

  return (
    <div>
      {/* Header section matching preview */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Research Hub
            </h1>
            <p className="ws-page-subtitle">
              Save ideas, notes and resources.
            </p>
          </div>
          <div className="ws-page-actions">
            <button
              type="button"
              className="ws-btn ws-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={14} />
              New Note
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search matching preview */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <FilterBar
          categories={researchCategories}
          active={activeFilter}
          onChange={setActiveFilter}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 260 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
            <input
              type="text"
              className="ws-input"
              style={{ paddingLeft: 34, height: 36, fontSize: '0.8rem' }}
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="ws-btn ws-btn-secondary"
            style={{ height: 36, padding: '0 12px' }}
            onClick={() => showToast && showToast('Filter applied.')}
          >
            <SlidersHorizontal size={13} />
            Filter
          </button>
        </div>
      </div>

      {/* Notes Grid or Empty State matching preview */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No research notes yet"
          description="Save articles, ideas, links and notes to build your knowledge base."
          action="Create Note"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="ws-card ws-card-interactive"
              onClick={() => setActiveNote(note)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveNote(note);
                }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ws-badge violet"><span className="ws-badge-dot" />{note.category}</span>
                <span className="ws-badge blue"><span className="ws-badge-dot" />{note.status}</span>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 700, marginBottom: 4 }}>
                  {note.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {note.content ? note.content.slice(0, 95) + '…' : 'No preview available.'}
                </p>
              </div>

              {note.tags && note.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 'auto' }}>
                  {note.tags.map(t => (
                    <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '2px 6px', borderRadius: 4, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', color: 'var(--text-faint)' }}>
                      <Tag size={9} />
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-faint)' }}>
                <span>{note.source || 'Note'}</span>
                <span>{formatDate(note.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Detail Drawer */}
      <Drawer
        open={Boolean(activeNote)}
        onClose={() => setActiveNote(null)}
        title={activeNote?.title || 'Note'}
      >
        {activeNote && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <span className="ws-badge violet">{activeNote.category}</span>
              <span className="ws-badge blue">{activeNote.status}</span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div className="ws-field-label">CONTENT</div>
              <div style={{ background: 'var(--bg-glass)', padding: 16, borderRadius: 8, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                {activeNote.content || 'Empty note.'}
              </div>
            </div>

            {activeNote.source && (
              <div style={{ marginBottom: 20 }}>
                <div className="ws-field-label">SOURCE / REFERENCE</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeNote.source}</div>
              </div>
            )}

            <div style={{ marginTop: 36 }}>
              <button
                type="button"
                className="ws-btn ws-btn-ghost ws-btn-sm"
                style={{ color: 'var(--status-red)', width: '100%', justifyContent: 'center' }}
                onClick={() => handleDeleteNote(activeNote.id)}
              >
                <Trash2 size={13} />
                Delete Note
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Create Note Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Research Note"
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
              onClick={handleCreateNote}
            >
              Save Note
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateNote}>
          <div className="ws-field">
            <label className="ws-field-label">Note Title *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Distributed Consensus Algorithms"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="ws-field">
              <label className="ws-field-label">Category</label>
              <input
                type="text"
                className="ws-input"
                placeholder="e.g. AI, Systems, Math"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                <option value="READING">Reading</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Source / URL</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. arXiv paper, article URL"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            />
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Note Content</label>
            <textarea
              className="ws-input ws-textarea"
              style={{ minHeight: 120 }}
              placeholder="Synthesized ideas, key takeaways, code snippets..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
