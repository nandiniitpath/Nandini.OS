// =============================================================================
// WORKSPACE OS — Settings Page
// Account profile, data connections, appearance, backups, and security
// =============================================================================

import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  User,
  Moon,
  Sun,
  Monitor,
  Shield,
  Download,
  Trash2,
  LogOut,
  FileSpreadsheet,
  Cloud,
  X,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { initials } from '../utils/helpers';
import GoogleIcon from '../components/GoogleIcon';
import { loadUserRecords } from '../services/storageHelper';

const RESOURCES = [
  'projects',
  'applications',
  'certifications',
  'documents',
  'research',
  'writing',
  'learning',
  'datasets',
  'tasks',
  'activity'
];

export default function Settings() {
  const { user, userId, logout, deleteAccount } = useAuth();
  const { showToast } = useOutletContext() || {};
  const navigate = useNavigate();

  const [theme, setTheme] = useState('dark');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [density, setDensity] = useState('comfortable');

  // Connection modals state
  const [activeModal, setActiveModal] = useState(null); // 'drive' | 'sheets' | 'delete'
  const [isDeleting, setIsDeleting] = useState(false);
  const [connectedDrive, setConnectedDrive] = useState(false);
  const [connectedSheets, setConnectedSheets] = useState(false);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    if (showToast) {
      showToast(`Theme set to ${selectedTheme}. (Dark midnight navy is default)`);
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      if (showToast) {
        showToast('Your workspace data has been completely erased.', 'info');
      }
      navigate('/');
    } catch {
      if (showToast) {
        showToast('Failed to erase account data.', 'error');
      }
    } finally {
      setIsDeleting(false);
      setActiveModal(null);
    }
  };

  const handleExportData = () => {
    if (!userId) return;
    try {
      const exportPayload = {
        meta: {
          exportDate: new Date().toISOString(),
          userId: user.id,
          userEmail: user.email,
          product: 'WORKSPACE OS',
          version: '1.0.0'
        },
        data: {}
      };

      RESOURCES.forEach((resource) => {
        exportPayload.data[resource] = loadUserRecords(userId, resource);
      });

      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `workspace-os-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (showToast) {
        showToast('Workspace backup downloaded successfully.', 'success');
      }
    } catch {
      if (showToast) {
        showToast('Failed to export workspace backup.', 'error');
      }
    }
  };

  const userName = user?.name || 'Workspace User';
  const userEmail = user?.email || 'user@workspaceos.app';
  const userInitials = initials(userName);

  return (
    <div>
      {/* Page Header */}
      <div className="ws-page-header">
        <div className="ws-page-eyebrow">SYSTEM & CONFIGURATION</div>
        <h1 className="ws-page-title">Settings</h1>
        <p className="ws-page-subtitle">
          Manage your personal workspace preferences, data sync pipelines, and security.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: '820px' }}>
        {/* Account & Profile Card */}
        <div className="ws-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <User size={18} color="var(--accent-lavender)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Account Profile
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(74, 142, 255, 0.25))',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.94rem',
                  color: 'var(--text-primary)',
                  overflow: 'hidden'
                }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  userInitials
                )}
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {userName}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  {userEmail}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="ws-badge violet" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <GoogleIcon size={13} />
                <span>Google Account</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                User Identifier
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                {userId || 'Anonymous'}
              </div>
            </div>
            <span className="ws-badge green">
              <span className="ws-badge-dot" />
              Active Session
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Data Partitioning
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Strict multi-tenant isolation scoped to current user key
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-lavender)' }}>
              ws_data_{userId ? `${userId.substring(0, 10)}...` : 'scoped'}
            </span>
          </div>
        </div>

        {/* Data Connections Section */}
        <div className="ws-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Cloud size={18} color="var(--accent-lavender)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Data Connections & Sync
            </h3>
          </div>

          {/* Google Drive */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Google Drive
                </span>
                {connectedDrive ? (
                  <span className="ws-badge green">
                    <span className="ws-badge-dot" />
                    CONNECTED
                  </span>
                ) : (
                  <span className="ws-badge muted">NOT CONNECTED</span>
                )}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', marginTop: 2 }}>
                Cloud file repository, document indexing, and PDF viewer sync
              </div>
            </div>
            <button
              type="button"
              className={`ws-btn ${connectedDrive ? 'ws-btn-ghost' : 'ws-btn-secondary'} ws-btn-sm`}
              onClick={() => setActiveModal('drive')}
            >
              {connectedDrive ? 'Manage' : 'Configure'}
            </button>
          </div>

          {/* Google Sheets */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Google Sheets
                </span>
                {connectedSheets ? (
                  <span className="ws-badge green">
                    <span className="ws-badge-dot" />
                    CONNECTED
                  </span>
                ) : (
                  <span className="ws-badge muted">NOT CONNECTED</span>
                )}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', marginTop: 2 }}>
                Structured datastore for tasks, job tracker entries, and telemetry
              </div>
            </div>
            <button
              type="button"
              className={`ws-btn ${connectedSheets ? 'ws-btn-ghost' : 'ws-btn-secondary'} ws-btn-sm`}
              onClick={() => setActiveModal('sheets')}
            >
              {connectedSheets ? 'Manage' : 'Configure'}
            </button>
          </div>
        </div>

        {/* Appearance & Interface */}
        <div className="ws-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Moon size={18} color="var(--accent-lavender)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Interface & Appearance
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Interface Theme
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Midnight navy aesthetic with violet atmospheric glow
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                className={`ws-btn ws-btn-sm ${theme === 'dark' ? 'ws-btn-primary' : 'ws-btn-ghost'}`}
                onClick={() => handleThemeChange('dark')}
                style={{ padding: '6px 12px', fontSize: '0.76rem' }}
              >
                <Moon size={13} style={{ marginRight: 6 }} />
                Dark
              </button>
              <button
                type="button"
                className={`ws-btn ws-btn-sm ${theme === 'light' ? 'ws-btn-primary' : 'ws-btn-ghost'}`}
                onClick={() => handleThemeChange('light')}
                style={{ padding: '6px 12px', fontSize: '0.76rem' }}
              >
                <Sun size={13} style={{ marginRight: 6 }} />
                Light
              </button>
              <button
                type="button"
                className={`ws-btn ws-btn-sm ${theme === 'system' ? 'ws-btn-primary' : 'ws-btn-ghost'}`}
                onClick={() => handleThemeChange('system')}
                style={{ padding: '6px 12px', fontSize: '0.76rem' }}
              >
                <Monitor size={13} style={{ marginRight: 6 }} />
                System
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Reduced Motion
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Minimize animations and decorative floating particle effects
              </div>
            </div>
            <button
              type="button"
              className={`ws-btn ws-btn-sm ${reducedMotion ? 'ws-btn-primary' : 'ws-btn-ghost'}`}
              onClick={() => {
                setReducedMotion(!reducedMotion);
                if (showToast) {
                  showToast(reducedMotion ? 'Animations restored.' : 'Motion effects reduced.');
                }
              }}
              style={{ fontSize: '0.76rem' }}
            >
              {reducedMotion ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Information Density
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Comfortable card spacing versus compact view
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                type="button"
                className={`ws-btn ws-btn-sm ${density === 'comfortable' ? 'ws-btn-primary' : 'ws-btn-ghost'}`}
                onClick={() => setDensity('comfortable')}
                style={{ fontSize: '0.76rem' }}
              >
                Comfortable
              </button>
              <button
                type="button"
                className={`ws-btn ws-btn-sm ${density === 'compact' ? 'ws-btn-primary' : 'ws-btn-ghost'}`}
                onClick={() => setDensity('compact')}
                style={{ fontSize: '0.76rem' }}
              >
                Compact
              </button>
            </div>
          </div>
        </div>

        {/* Data Portability & Backup */}
        <div className="ws-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Database size={18} color="var(--accent-lavender)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Data Portability & Backup
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Export Workspace Archive
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Download a complete JSON export of all your projects, records, notes, and metrics
              </div>
            </div>
            <button
              type="button"
              className="ws-btn ws-btn-secondary ws-btn-sm"
              onClick={handleExportData}
            >
              <Download size={14} style={{ marginRight: 6 }} />
              Export JSON
            </button>
          </div>
        </div>

        {/* Security & System Architecture */}
        <div className="ws-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Shield size={18} color="var(--accent-lavender)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
              Security & Environment
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Authentication Provider
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                OAuth 2.0 Google Identity Services protocol
              </div>
            </div>
            <span className="ws-badge blue">
              <span className="ws-badge-dot" />
              Verified Protocol
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Credential Hygiene
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Zero secrets in client bundle; scoped local storage with per-user partition keys
              </div>
            </div>
            <span className="ws-badge green">
              <span className="ws-badge-dot" />
              Isolated
            </span>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="ws-card" style={{ borderColor: 'rgba(239, 68, 68, 0.25)', background: 'rgba(239, 68, 68, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Trash2 size={18} color="var(--accent-rose)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', textTransform: 'uppercase', letterSpacing: '-0.01em', color: 'var(--accent-rose)' }}>
              Account Actions & Danger Zone
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Sign Out
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Close active workspace session on this device
              </div>
            </div>
            <button
              type="button"
              className="ws-btn ws-btn-secondary ws-btn-sm"
              onClick={handleSignOut}
            >
              <LogOut size={14} style={{ marginRight: 6 }} />
              Sign Out
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontSize: '0.84rem', color: 'var(--accent-rose)' }}>
                Delete Account & Reset Workspace
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>
                Irreversibly delete all records, projects, documents, and settings scoped to your account
              </div>
            </div>
            <button
              type="button"
              className="ws-btn ws-btn-danger ws-btn-sm"
              onClick={() => setActiveModal('delete')}
            >
              <Trash2 size={14} style={{ marginRight: 6 }} />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Google Drive Connection Modal */}
      {activeModal === 'drive' && (
        <div className="ws-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="ws-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="ws-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Cloud size={20} color="var(--accent-lavender)" />
                <h3 className="ws-modal-title">Google Drive Integration</h3>
              </div>
              <button
                type="button"
                className="ws-btn ws-btn-ghost ws-btn-icon"
                onClick={() => setActiveModal(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Connect your Google Drive to index documents, preview PDF reports, and sync files directly inside WORKSPACE OS.
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  OAuth 2.0 Scopes Required:
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  • https://www.googleapis.com/auth/drive.readonly
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  • https://www.googleapis.com/auth/drive.file
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
                <span className="ws-badge muted">
                  Status: {connectedDrive ? 'CONNECTED' : 'NOT CONNECTED'}
                </span>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    className="ws-btn ws-btn-ghost ws-btn-sm"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ws-btn ws-btn-primary ws-btn-sm"
                    onClick={() => {
                      setConnectedDrive(!connectedDrive);
                      setActiveModal(null);
                      if (showToast) {
                        showToast(connectedDrive ? 'Google Drive disconnected.' : 'Google Drive connected successfully!', 'success');
                      }
                    }}
                  >
                    {connectedDrive ? 'Disconnect' : 'Connect Google Drive'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Sheets Connection Modal */}
      {activeModal === 'sheets' && (
        <div className="ws-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="ws-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div className="ws-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileSpreadsheet size={20} color="var(--accent-emerald)" />
                <h3 className="ws-modal-title">Google Sheets Integration</h3>
              </div>
              <button
                type="button"
                className="ws-btn ws-btn-ghost ws-btn-icon"
                onClick={() => setActiveModal(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Connect Google Sheets to stream tasks, track applications, and sync tabular datasets with continuous bidirectional updates.
              </p>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 10,
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  OAuth 2.0 Scopes Required:
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  • https://www.googleapis.com/auth/spreadsheets
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
                <span className="ws-badge muted">
                  Status: {connectedSheets ? 'CONNECTED' : 'NOT CONNECTED'}
                </span>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    className="ws-btn ws-btn-ghost ws-btn-sm"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ws-btn ws-btn-primary ws-btn-sm"
                    onClick={() => {
                      setConnectedSheets(!connectedSheets);
                      setActiveModal(null);
                      if (showToast) {
                        showToast(connectedSheets ? 'Google Sheets disconnected.' : 'Google Sheets connected successfully!', 'success');
                      }
                    }}
                  >
                    {connectedSheets ? 'Disconnect' : 'Connect Google Sheets'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {activeModal === 'delete' && (
        <div className="ws-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="ws-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 480 }}>
            <div className="ws-modal-header" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Trash2 size={20} color="var(--accent-rose)" />
                <h3 className="ws-modal-title" style={{ color: 'var(--accent-rose)' }}>
                  Confirm Account Deletion
                </h3>
              </div>
              <button
                type="button"
                className="ws-btn ws-btn-ghost ws-btn-icon"
                onClick={() => setActiveModal(null)}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Are you sure you want to permanently delete your account and all associated workspace data?
              </p>
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: 8,
                  padding: '12px 14px',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.5
                }}
              >
                <strong>Warning:</strong> This will erase all your projects, job applications, documents, notes, courses, and settings. This action cannot be undone.
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
                <button
                  type="button"
                  className="ws-btn ws-btn-ghost ws-btn-sm"
                  onClick={() => setActiveModal(null)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="ws-btn ws-btn-danger ws-btn-sm"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete Everything'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
