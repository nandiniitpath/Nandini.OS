// =============================================================================
// WORKSPACE OS — Projects Page
// Matches Middle-Center Panel of Product Preview (Empty State + Real Project CRUD)
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, FolderKanban, Search, SlidersHorizontal, Calendar, Trash2 } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import Drawer from '../components/Drawer';
import { useAuth } from '../context/AuthContext';
import { projectService } from '../services/api';
import { projectCategories } from '../data/mockData';
import { formatDate } from '../utils/helpers';

export default function Projects() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // New project form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Engineering',
    status: 'PLANNING',
    priority: 'MEDIUM',
    notes: '',
    tags: ''
  });

  const loadProjects = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await projectService.getProjects(user.id);
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects', err);
    }
  }, [user?.id]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = activeFilter === 'ALL' || p.status.toUpperCase() === activeFilter.toUpperCase();
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !user?.id) return;

    await projectService.createProject(user.id, {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setModalOpen(false);
    setForm({
      title: '',
      description: '',
      category: 'Engineering',
      status: 'PLANNING',
      priority: 'MEDIUM',
      notes: '',
      tags: ''
    });

    if (showToast) showToast('Project created successfully.', 'success');
    loadProjects();
  };

  const handleDeleteProject = async (projectId) => {
    if (!user?.id) return;
    await projectService.deleteProject(user.id, projectId);
    setSelectedProject(null);
    if (showToast) showToast('Project deleted.', 'info');
    loadProjects();
  };

  return (
    <div>
      {/* Header section matching preview */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Projects
            </h1>
            <p className="ws-page-subtitle">
              Plan, build and track your projects.
            </p>
          </div>
          <div className="ws-page-actions">
            <button
              type="button"
              className="ws-btn ws-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={14} />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Row matching preview */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <FilterBar
          categories={projectCategories}
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
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="ws-btn ws-btn-secondary"
            style={{ height: 36, padding: '0 12px' }}
            onClick={() => showToast && showToast('Filters active.')}
          >
            <SlidersHorizontal size={13} />
            Filter
          </button>
        </div>
      </div>

      {/* Projects List or Clean Empty State matching preview */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Start your first project to organize your ideas, track your progress and keep everything in one place."
          action="Create Project"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16 }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="ws-card ws-card-interactive"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ws-badge violet">
                  <span className="ws-badge-dot" />
                  {project.category}
                </span>
                <span className="ws-badge blue">
                  <span className="ws-badge-dot" />
                  {project.status}
                </span>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 700, marginBottom: 4 }}>
                  {project.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {project.description || 'No description provided.'}
                </p>
              </div>

              {project.tags && project.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 'auto' }}>
                  {project.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', padding: '2px 6px', borderRadius: 4, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)', color: 'var(--text-faint)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-faint)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={11} />
                  {formatDate(project.createdAt)}
                </span>
                <span>{project.priority} priority</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Details Drawer */}
      <Drawer
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || 'Project'}
      >
        {selectedProject && (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <span className="ws-badge violet"><span className="ws-badge-dot" />{selectedProject.category}</span>
              <span className="ws-badge blue"><span className="ws-badge-dot" />{selectedProject.status}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-faint)' }}>
                {formatDate(selectedProject.createdAt)}
              </span>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div className="ws-field-label">DESCRIPTION</div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {selectedProject.description || 'No description provided.'}
              </p>
            </div>

            {selectedProject.notes && (
              <div style={{ marginBottom: 20 }}>
                <div className="ws-field-label">INTERNAL NOTES</div>
                <div style={{ background: 'var(--bg-glass)', padding: 14, borderRadius: 8, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {selectedProject.notes}
                </div>
              </div>
            )}

            <div style={{ marginTop: 36 }}>
              <button
                type="button"
                className="ws-btn ws-btn-ghost ws-btn-sm"
                style={{ color: 'var(--status-red)', width: '100%', justifyContent: 'center' }}
                onClick={() => handleDeleteProject(selectedProject.id)}
              >
                <Trash2 size={13} />
                Delete Project
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Create Project Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Project"
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
              onClick={handleCreateProject}
            >
              Create Project
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateProject}>
          <div className="ws-field">
            <label className="ws-field-label">Project Title *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Mobile Application Redesign"
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
                placeholder="e.g. Design, Engineering"
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
                <option value="PLANNING">Planning</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Description</label>
            <textarea
              className="ws-input ws-textarea"
              placeholder="Brief summary of project goals and scope..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Tags (comma separated)</label>
            <input
              type="text"
              className="ws-input"
              placeholder="React, Architecture, UI"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
