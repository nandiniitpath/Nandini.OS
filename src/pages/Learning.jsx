// =============================================================================
// WORKSPACE OS — Learning Page
// Curriculum & skill acquisition progress tracker (Starts clean at 0 for new users)
// =============================================================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, GraduationCap, CheckCircle, Trash2 } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { learningService } from '../services/api';
import { learningCategories } from '../data/mockData';

export default function Learning() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [courses, setCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    platform: '',
    category: 'Computer Science',
    progress: 10,
    status: 'IN PROGRESS',
    notes: ''
  });

  const loadCourses = useCallback(async () => {
    if (!user?.id) return;
    try {
      const data = await learningService.getLearningItems(user.id);
      setCourses(data);
    } catch (err) {
      console.error('Failed to load courses', err);
    }
  }, [user?.id]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'ALL') return courses;
    return courses.filter(c => c.status.toUpperCase() === activeFilter.toUpperCase());
  }, [courses, activeFilter]);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !user?.id) return;

    await learningService.createLearningItem(user.id, form);
    setModalOpen(false);
    setForm({
      title: '',
      platform: '',
      category: 'Computer Science',
      progress: 10,
      status: 'IN PROGRESS',
      notes: ''
    });

    if (showToast) showToast('Course added to learning curriculum.', 'success');
    loadCourses();
  };

  const handleUpdateProgress = async (courseId, newProgress) => {
    if (!user?.id) return;
    await learningService.updateLearningProgress(user.id, courseId, newProgress);
    loadCourses();
  };

  const handleDeleteCourse = async (courseId) => {
    if (!user?.id) return;
    await learningService.deleteLearningItem(user.id, courseId);
    if (showToast) showToast('Course removed.', 'info');
    loadCourses();
  };

  return (
    <div>
      {/* Header section */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Learning Center
            </h1>
            <p className="ws-page-subtitle">
              Track courses, skills and certifications in progress.
            </p>
          </div>
          <div className="ws-page-actions">
            <button
              type="button"
              className="ws-btn ws-btn-primary"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={14} />
              Track Course
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <FilterBar
        categories={learningCategories}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* Grid or Empty State */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="No learning records yet"
          description="Add a course, language goal, or technical skill you are currently studying."
          action="Track Learning"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16 }}>
          {filteredCourses.map((item) => (
            <div key={item.id} className="ws-card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="ws-badge violet">{item.category}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className={`ws-badge ${item.progress === 100 ? 'green' : 'blue'}`}>
                    {item.status}
                  </span>
                  <button
                    type="button"
                    className="ws-icon-btn"
                    style={{ width: 22, height: 22, color: 'var(--text-faint)' }}
                    onClick={() => handleDeleteCourse(item.id)}
                    title="Remove course"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 700, marginBottom: 4 }}>
                  {item.title}
                </h4>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Platform: {item.platform || 'Self-study'}
                </div>
              </div>

              {/* Progress Slider / Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--text-faint)' }}>Progress</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600, color: item.progress === 100 ? 'var(--status-green)' : 'var(--accent-lavender)' }}>
                    {item.progress}%
                  </span>
                </div>
                <div style={{ height: 6, backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${item.progress}%`,
                      backgroundColor: item.progress === 100 ? 'var(--status-green)' : 'var(--accent-violet)',
                      borderRadius: 10,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    className="ws-btn ws-btn-ghost ws-btn-sm"
                    style={{ fontSize: '0.62rem', padding: '2px 8px' }}
                    onClick={() => handleUpdateProgress(item.id, Math.min(100, item.progress + 25))}
                  >
                    +25% Progress
                  </button>
                  {item.progress < 100 && (
                    <button
                      type="button"
                      className="ws-btn ws-btn-ghost ws-btn-sm"
                      style={{ fontSize: '0.62rem', padding: '2px 8px', color: 'var(--status-green)' }}
                      onClick={() => handleUpdateProgress(item.id, 100)}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>

              {item.notes && (
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.notes}
                </p>
              )}

              {item.progress === 100 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--status-green)', fontSize: '0.74rem', marginTop: 'auto' }}>
                  <CheckCircle size={14} />
                  <span>Curriculum Completed</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Course Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Track New Learning"
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
              onClick={handleCreateCourse}
            >
              Save Course
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateCourse}>
          <div className="ws-field">
            <label className="ws-field-label">Course / Skill Name *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Modern Full-Stack System Architecture"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="ws-field">
              <label className="ws-field-label">Platform / Provider</label>
              <input
                type="text"
                className="ws-input"
                placeholder="e.g. Coursera, MIT OpenCourseWare"
                value={form.platform}
                onChange={(e) => setForm({ ...form, platform: e.target.value })}
              />
            </div>
            <div className="ws-field">
              <label className="ws-field-label">Category</label>
              <input
                type="text"
                className="ws-input"
                placeholder="e.g. Systems, AI, Language"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Current Progress: {form.progress}%</label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              style={{ width: '100%' }}
              value={form.progress}
              onChange={(e) => setForm({ ...form, progress: e.target.value })}
            />
          </div>

          <div className="ws-field">
            <label className="ws-field-label">Notes & Syllabus Highlights</label>
            <textarea
              className="ws-input ws-textarea"
              placeholder="Key concepts covered, weekly milestones..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
