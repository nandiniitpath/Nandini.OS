// =============================================================================
// WORKSPACE OS — WritingLab Page
// Distraction-free writing studio & drafts archive (Starts clean at 0 for new users)
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, PenLine, Trash2 } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { writingService } from '../services/api';
import { writingCategories } from '../data/mockData';
import { formatDate } from '../utils/helpers';

export default function WritingLab() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [pieces, setPieces] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPiece, setEditingPiece] = useState({
    title: '',
    type: 'ESSAY',
    category: 'Drafts',
    status: 'DRAFT',
    content: ''
  });

  const loadPieces = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await writingService.getWritingPieces(user.id);
      setPieces(data);
    } catch (err) {
      console.error('Failed to load writing pieces', err);
    }
  }, [user?.id]);

  useEffect(() => {
    loadPieces();
  }, [loadPieces]);

  const filteredPieces = useMemo(() => {
    if (activeFilter === 'ALL') return pieces;
    return pieces.filter(p => p.category.toUpperCase() === activeFilter.toUpperCase());
  }, [pieces, activeFilter]);

  const handleOpenEditor = (piece = null) => {
    if (piece) {
      setEditingPiece(piece);
    } else {
      setEditingPiece({
        title: '',
        type: 'ESSAY',
        category: 'Drafts',
        status: 'DRAFT',
        content: ''
      });
    }
    setEditorOpen(true);
  };

  const handleSavePiece = async (e) => {
    e.preventDefault();
    if (!editingPiece.title.trim() || !user?.id) return;

    if (editingPiece.id) {
      await writingService.updateWritingPiece(user.id, editingPiece.id, editingPiece);
      if (showToast) showToast(`Updated "${editingPiece.title}".`, 'success');
    } else {
      await writingService.createWritingPiece(user.id, editingPiece);
      if (showToast) showToast(`Saved draft "${editingPiece.title}".`, 'success');
    }

    setEditorOpen(false);
    loadPieces();
  };

  const handleDeletePiece = async (pieceId) => {
    if (!user?.id) return;
    await writingService.deleteWritingPiece(user.id, pieceId);
    if (showToast) showToast('Piece removed.', 'info');
    loadPieces();
  };

  return (
    <div>
      {/* Header section */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Writing Lab
            </h1>
            <p className="ws-page-subtitle">
              Focus on your ideas, stories, and drafts.
            </p>
          </div>
          <div className="ws-page-actions">
            <button
              type="button"
              className="ws-btn ws-btn-primary"
              onClick={() => handleOpenEditor()}
            >
              <Plus size={14} />
              New Piece
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <FilterBar
        categories={writingCategories}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* Grid or Empty State */}
      {filteredPieces.length === 0 ? (
        <EmptyState
          icon={PenLine}
          title="No writing drafts yet"
          description="Start your first piece in a distraction-free writing space."
          action="New Piece"
          onAction={() => handleOpenEditor()}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filteredPieces.map((piece) => (
            <div
              key={piece.id}
              className="ws-card ws-card-interactive"
              onClick={() => handleOpenEditor(piece)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenEditor(piece);
                }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ws-badge violet">{piece.type}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="ws-badge blue">{piece.status}</span>
                  <button
                    type="button"
                    className="ws-icon-btn"
                    style={{ width: 22, height: 22, color: 'var(--text-faint)' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePiece(piece.id);
                    }}
                    title="Delete piece"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 700, marginBottom: 4 }}>
                  {piece.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {piece.content ? piece.content.slice(0, 100) + '…' : 'No draft content yet.'}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border-subtle)', marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.64rem', color: 'var(--text-faint)' }}>
                <span>{piece.wordCount || 0} words</span>
                <span>Edited {formatDate(piece.lastEdited)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <Modal
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        title={editingPiece.id ? `Edit: ${editingPiece.title}` : 'New Manuscript'}
        maxWidth="680px"
        footer={
          <>
            <button
              type="button"
              className="ws-btn ws-btn-ghost ws-btn-sm"
              onClick={() => setEditorOpen(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="ws-btn ws-btn-primary ws-btn-sm"
              onClick={handleSavePiece}
            >
              Save Manuscript
            </button>
          </>
        }
      >
        <form onSubmit={handleSavePiece}>
          <div className="ws-field">
            <label className="ws-field-label">Piece Title *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. The Architecture of Focus"
              value={editingPiece.title}
              onChange={(e) => setEditingPiece({ ...editingPiece, title: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div className="ws-field">
              <label className="ws-field-label">Type</label>
              <select
                className="ws-input"
                style={{ backgroundColor: 'var(--bg-card)' }}
                value={editingPiece.type}
                onChange={(e) => setEditingPiece({ ...editingPiece, type: e.target.value })}
              >
                <option value="ESSAY">Essay</option>
                <option value="ARTICLE">Article</option>
                <option value="STORY">Story</option>
                <option value="SCRIPT">Script</option>
                <option value="NOTE">Note</option>
              </select>
            </div>
            <div className="ws-field">
              <label className="ws-field-label">Category</label>
              <select
                className="ws-input"
                style={{ backgroundColor: 'var(--bg-card)' }}
                value={editingPiece.category}
                onChange={(e) => setEditingPiece({ ...editingPiece, category: e.target.value })}
              >
                <option value="Ideas">Ideas</option>
                <option value="Drafts">Drafts</option>
                <option value="Articles">Articles</option>
                <option value="Stories">Stories</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div className="ws-field">
              <label className="ws-field-label">Status</label>
              <select
                className="ws-input"
                style={{ backgroundColor: 'var(--bg-card)' }}
                value={editingPiece.status}
                onChange={(e) => setEditingPiece({ ...editingPiece, status: e.target.value })}
              >
                <option value="DRAFT">Draft</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Draft Manuscript</label>
            <textarea
              className="ws-input ws-textarea"
              style={{ minHeight: '220px', lineHeight: 1.7, fontSize: '0.86rem' }}
              placeholder="Start drafting freely in your distraction-free workspace..."
              value={editingPiece.content}
              onChange={(e) => setEditingPiece({ ...editingPiece, content: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-faint)' }}>
            <span>Live Word Count: {editingPiece.content ? editingPiece.content.trim().split(/\s+/).filter(Boolean).length : 0} words</span>
            <span>Local Studio Storage</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}
