// =============================================================================
// WORKSPACE OS — Dashboard Page
// Matches Middle-Left Panel of Product Preview (Clean 0-State for New Users)
// =============================================================================

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  FolderKanban,
  Briefcase,
  Award,
  FileText,
  Plus,
  Cloud,
  Check,
  HardDrive,
  BookOpen,
  PenLine,
  GraduationCap,
  Wrench
} from 'lucide-react';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import {
  getDashboardStats,
  taskService,
  activityService
} from '../services/api';
import { getGreeting, formatCurrentDate } from '../utils/helpers';

export default function Dashboard() {
  const { user, userId } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useOutletContext() || {};

  const [stats, setStats] = useState({
    projects: 0,
    applications: 0,
    certifications: 0,
    documents: 0
  });
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const loadData = useCallback(async () => {
    if (!userId) return;
    try {
      const [currentStats, currentTasks, currentActs] = await Promise.all([
        getDashboardStats(userId),
        taskService.getTasks(userId),
        activityService.getActivities(userId)
      ]);
      setStats(currentStats);
      setTasks(currentTasks);
      setActivities(currentActs);
    } catch (err) {
      console.error('Error loading dashboard data', err);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !user?.id) return;

    await taskService.createTask(user.id, newTaskTitle.trim());
    activityService.logActivity(user.id, `Added task: "${newTaskTitle.trim()}"`, 'violet');
    setNewTaskTitle('');
    setTaskModalOpen(false);
    if (showToast) showToast('Task added to Current Focus.', 'success');
    loadData();
  };

  const handleToggleTask = async (taskId) => {
    if (!user?.id) return;
    await taskService.toggleTask(user.id, taskId);
    loadData();
  };

  const greeting = getGreeting();
  const currentDateFormatted = formatCurrentDate();

  return (
    <div>
      {/* Header section matching preview */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="ws-page-title" style={{ fontSize: '1.8rem', textTransform: 'none' }}>
            {greeting},
          </h1>
          <p className="ws-page-subtitle" style={{ fontSize: '0.86rem', marginTop: 4 }}>
            Your workspace is ready.
          </p>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-faint)' }}>
          {currentDateFormatted}
        </div>
      </div>

      {/* 4 Stat Cards with Colored Square Badges (Matching Preview) */}
      <div className="ws-stats-grid">
        <StatCard
          label="Projects"
          value={stats.projects}
          icon={FolderKanban}
          color="blue"
        />
        <StatCard
          label="Applications"
          value={stats.applications}
          icon={Briefcase}
          color="red"
        />
        <StatCard
          label="Certifications"
          value={stats.certifications}
          icon={Award}
          color="amber"
        />
        <StatCard
          label="Documents"
          value={stats.documents}
          icon={FileText}
          color="green"
        />
      </div>

      {/* Two Column Layout: Current Focus + Recent Activity (Matching Preview) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 20, marginBottom: 28 }}>
        {/* Left: Current Focus */}
        <div className="ws-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700 }}>
              Current Focus
            </h3>
            {tasks.length > 0 && (
              <button
                type="button"
                className="ws-btn ws-btn-ghost ws-btn-sm"
                onClick={() => setTaskModalOpen(true)}
              >
                <Plus size={12} />
                Add
              </button>
            )}
          </div>

          {tasks.length === 0 ? (
            <div style={{ padding: '24px 12px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                Add your first task to get started.
              </p>
              <button
                type="button"
                className="ws-btn ws-btn-primary ws-btn-sm"
                onClick={() => setTaskModalOpen(true)}
              >
                <Plus size={13} />
                Add Task
              </button>
            </div>
          ) : (
            <div className="ws-tasks">
              {tasks.map(task => {
                const isCompleted = task.status === 'DONE';
                return (
                  <div
                    key={task.id}
                    className={`ws-task-row ${isCompleted ? 'completed' : ''}`}
                    onClick={() => handleToggleTask(task.id)}
                    role="checkbox"
                    aria-checked={isCompleted}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleToggleTask(task.id);
                      }
                    }}
                  >
                    <div className="ws-task-checkbox" aria-hidden="true">
                      {isCompleted && <Check size={10} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                    <span className="ws-task-text">{task.title}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Recent Activity (Matching Preview with cloud icon) */}
        <div className="ws-card">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, marginBottom: 16 }}>
            Recent Activity
          </h3>

          {activities.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 16px', textAlign: 'center' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--violet-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-lavender)',
                  marginBottom: 12
                }}
                aria-hidden="true"
              >
                <Cloud size={20} strokeWidth={1.5} />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: 260, lineHeight: 1.5 }}>
                Your activity will appear here once you start using your workspace.
              </p>
            </div>
          ) : (
            <div className="ws-feed">
              {activities.slice(0, 5).map(act => (
                <div key={act.id} className="ws-feed-item">
                  <span className={`ws-feed-bullet ${act.type || 'violet'}`} />
                  <div style={{ flex: 1 }}>
                    <div className="ws-feed-text">{act.text}</div>
                    <div className="ws-feed-time">{act.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Access Section (Matching Preview: 6 cards) */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, marginBottom: 14 }}>
          Quick Access
        </h3>

        <div className="ws-quick-grid">
          {[
            { name: 'Projects', sub: 'Create & manage', icon: FolderKanban, path: '/workspace/projects' },
            { name: 'Documents', sub: 'Connect Google Drive', icon: HardDrive, path: '/workspace/documents' },
            { name: 'Research', sub: 'Save your notes', icon: BookOpen, path: '/workspace/research' },
            { name: 'Writing', sub: 'Start a draft', icon: PenLine, path: '/workspace/writing' },
            { name: 'Learning', sub: 'Track progress', icon: GraduationCap, path: '/workspace/learning' },
            { name: 'Toolkit', sub: 'Explore tools', icon: Wrench, path: '/workspace/toolkit' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="ws-quick-card"
                onClick={() => navigate(item.path)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(item.path);
                  }
                }}
              >
                <div className="ws-quick-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="ws-quick-name">{item.name}</div>
                  <div className="ws-quick-sub">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal
        open={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        title="Add Focus Task"
        footer={
          <>
            <button
              type="button"
              className="ws-btn ws-btn-ghost ws-btn-sm"
              onClick={() => setTaskModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ws-btn ws-btn-primary ws-btn-sm"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </>
        }
      >
        <form onSubmit={handleAddTask}>
          <div className="ws-field">
            <label className="ws-field-label">Task Description *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Complete quarterly roadmap draft"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              autoFocus
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
