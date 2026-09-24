// =============================================================================
// WORKSPACE OS — SearchCommand Component
// Ctrl+K Global Command Palette searching ACTUAL user data
// =============================================================================

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FolderKanban, Briefcase, BookOpen, PenLine, GraduationCap, Award, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  projectService,
  applicationService,
  researchService,
  writingService,
  learningService,
  certificationService
} from '../services/api';
import { generalTools } from '../data/generalTools';

export default function SearchCommand({ open, onClose }) {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userItems, setUserItems] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Load real user records whenever palette opens
  const loadUserData = useCallback(async () => {
    if (!user?.id) {
      setUserItems([]);
      return;
    }
    try {
      const [projects, apps, notes, writings, learnings, certs] = await Promise.all([
        projectService.getProjects(user.id),
        applicationService.getApplications(user.id),
        researchService.getResearchNotes(user.id),
        writingService.getWritingPieces(user.id),
        learningService.getLearningItems(user.id),
        certificationService.getCertificates(user.id)
      ]);

      const items = [
        ...projects.map(p => ({ id: `p-${p.id}`, title: p.title, group: 'PROJECTS', path: '/workspace/projects', icon: FolderKanban })),
        ...apps.map(a => ({ id: `a-${a.id}`, title: `${a.company} — ${a.position}`, group: 'APPLICATIONS', path: '/workspace/applications', icon: Briefcase })),
        ...notes.map(r => ({ id: `r-${r.id}`, title: r.title, group: 'RESEARCH', path: '/workspace/research', icon: BookOpen })),
        ...writings.map(w => ({ id: `w-${w.id}`, title: w.title, group: 'WRITING', path: '/workspace/writing', icon: PenLine })),
        ...learnings.map(l => ({ id: `l-${l.id}`, title: l.title, group: 'LEARNING', path: '/workspace/learning', icon: GraduationCap })),
        ...certs.map(c => ({ id: `c-${c.id}`, title: c.title, group: 'CERTIFICATIONS', path: '/workspace/certifications', icon: Award })),
        ...generalTools.map(t => ({ id: `t-${t.id}`, title: t.name, group: 'TOOLKIT', path: '/workspace/toolkit', icon: Wrench })),
      ];

      setUserItems(items);
    } catch {
      setUserItems([]);
    }
  }, [user?.id]);

  useEffect(() => {
    if (open) {
      loadUserData();
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open, loadUserData]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return userItems.slice(0, 8);
    const q = query.toLowerCase();
    return userItems.filter(item =>
      item.title.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [userItems, query]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (!open) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        navigate(filteredItems[selectedIndex].path);
        onClose();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredItems, selectedIndex, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="ws-modal-backdrop open"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Global search command palette"
      style={{ alignItems: 'flex-start', paddingTop: '12vh' }}
    >
      <div
        className="ws-modal-dialog"
        style={{
          maxWidth: '560px',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px var(--violet-dim)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)' }}>
          <Search size={16} color="var(--accent-lavender)" />
          <input
            ref={inputRef}
            type="text"
            className="ws-input"
            style={{ border: 'none', background: 'transparent', padding: '4px 0', fontSize: '0.92rem' }}
            placeholder="Search projects, applications, research, writing..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button type="button" className="ws-icon-btn" onClick={onClose} aria-label="Close command palette">
            <X size={15} />
          </button>
        </div>

        <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '8px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-faint)', fontSize: '0.84rem' }}>
              {query.trim() ? `No results found for "${query}"` : 'No results found. Create your first project or note.'}
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--violet-dim)' : 'transparent',
                    border: isSelected ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'background-color var(--trans-fast)'
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: 'var(--bg-glass)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? 'var(--accent-lavender)' : 'var(--text-muted)'
                    }}
                  >
                    <Icon size={14} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.82rem', color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                      {item.title}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-faint)'
                    }}
                  >
                    {item.group}
                  </span>
                </div>
              );
            })
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            borderTop: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.62rem',
            color: 'var(--text-faint)'
          }}
        >
          <span>Use <kbd style={{ padding: '1px 5px', background: 'var(--bg-glass)', borderRadius: 3 }}>↑</kbd> <kbd style={{ padding: '1px 5px', background: 'var(--bg-glass)', borderRadius: 3 }}>↓</kbd> to navigate</span>
          <span><kbd style={{ padding: '1px 5px', background: 'var(--bg-glass)', borderRadius: 3 }}>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
