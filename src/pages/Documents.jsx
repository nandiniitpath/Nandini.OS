// =============================================================================
// WORKSPACE OS — Documents Page
// Matches Bottom-Left Panel of Product Preview (Google Drive Integration Interface)
// =============================================================================

import { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Folder,
  Cloud,
  FileText,
  Upload,
  Plus
} from 'lucide-react';
import GoogleIcon from '../components/GoogleIcon';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { documentService } from '../services/api';

const FOLDERS = [
  'All Files',
  'Projects',
  'Applications',
  'Certifications',
  'Resume',
  'Research',
  'Writing',
  'Data',
  'Other'
];

export default function Documents() {
  const { user } = useAuth();
  const { showToast } = useOutletContext() || {};

  const [activeFolder, setActiveFolder] = useState('All Files');
  const [isConnected, setIsConnected] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  const checkConnection = useCallback(async () => {
    if (!user?.id) return;
    const connected = await documentService.isGoogleDriveConnected(user.id);
    setIsConnected(connected);
    if (connected) {
      const docs = await documentService.getDocuments(user.id);
      setDocuments(docs);
    }
  }, [user?.id]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const handleConnectDrive = async () => {
    if (!user?.id) return;
    await documentService.connectGoogleDrive(user.id);
    setIsConnected(true);
    if (showToast) showToast('Google Drive account connected.', 'success');
  };

  const handleDisconnectDrive = async () => {
    if (!user?.id) return;
    await documentService.disconnectGoogleDrive(user.id);
    setIsConnected(false);
    if (showToast) showToast('Google Drive disconnected.', 'info');
  };

  const handleCreateMockFile = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const newDoc = {
      id: `doc_${Date.now()}`,
      name: fileName.trim(),
      folder: activeFolder === 'All Files' ? 'Other' : activeFolder,
      type: fileName.endsWith('.pdf') ? 'PDF' : fileName.endsWith('.xlsx') ? 'Sheets' : 'Document',
      size: '12 KB',
      modified: 'Just now'
    };

    setDocuments(prev => [newDoc, ...prev]);
    setFileName('');
    setUploadModalOpen(false);
    if (showToast) showToast(`Added "${newDoc.name}" to ${newDoc.folder}.`, 'success');
  };

  return (
    <div>
      {/* Header section matching preview */}
      <div className="ws-page-header">
        <div className="ws-page-header-row">
          <div>
            <h1 className="ws-page-title" style={{ fontSize: '1.75rem', textTransform: 'none' }}>
              Documents
            </h1>
            <p className="ws-page-subtitle">
              Connect your Google Drive to access and manage your files.
            </p>
          </div>
          <div className="ws-page-actions">
            {isConnected ? (
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="ws-btn ws-btn-primary ws-btn-sm"
                  onClick={() => setUploadModalOpen(true)}
                >
                  <Upload size={13} />
                  Upload File
                </button>
                <button
                  type="button"
                  className="ws-btn ws-btn-ghost ws-btn-sm"
                  onClick={handleDisconnectDrive}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="ws-btn ws-btn-secondary"
                style={{ background: '#FFFFFF', color: '#1F2937', fontWeight: 600 }}
                onClick={handleConnectDrive}
              >
                <GoogleIcon size={16} />
                Connect Google Drive
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Folders + Files Area matching preview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 180px) minmax(0, 1fr)', gap: 20 }}>
        {/* Left: Folders List matching preview */}
        <div className="ws-card" style={{ padding: '12px 10px', height: 'fit-content' }}>
          <div className="ws-field-label" style={{ padding: '4px 8px 8px' }}>FOLDERS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {FOLDERS.map((folder) => {
              const isActive = activeFolder === folder;
              return (
                <button
                  key={folder}
                  type="button"
                  onClick={() => setActiveFolder(folder)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'var(--violet-dim)' : 'transparent',
                    color: isActive ? 'var(--accent-lavender)' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: isActive ? 600 : 400,
                    textAlign: 'left',
                    transition: 'all var(--trans-fast)'
                  }}
                >
                  <Folder size={14} color={isActive ? 'var(--accent-violet)' : 'var(--text-faint)'} />
                  <span>{folder}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center / Right Content matching preview */}
        <div>
          {!isConnected ? (
            <EmptyState
              icon={Cloud}
              title="Google Drive not connected"
              description="Connect your Google Drive account to view, upload and manage your files."
              customButton={
                <button
                  type="button"
                  className="ws-btn-google"
                  onClick={handleConnectDrive}
                  style={{ fontSize: '0.82rem', padding: '10px 22px' }}
                >
                  <GoogleIcon size={18} />
                  <span>Connect Google Drive</span>
                </button>
              }
            />
          ) : documents.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No files in this folder"
              description="Upload documents or synchronize files from your connected Google Drive."
              action="Upload File"
              onAction={() => setUploadModalOpen(true)}
            />
          ) : (
            <div className="ws-table-container">
              <table className="ws-table">
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th>Type</th>
                    <th>Folder</th>
                    <th>Size</th>
                    <th>Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <FileText size={16} color="var(--accent-lavender)" />
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.84rem' }}>
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="ws-badge muted">{doc.type}</span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{doc.folder}</span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>{doc.size}</span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>{doc.modified}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add / Upload File Modal */}
      <Modal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Document"
        footer={
          <>
            <button
              type="button"
              className="ws-btn ws-btn-ghost ws-btn-sm"
              onClick={() => setUploadModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="ws-btn ws-btn-primary ws-btn-sm"
              onClick={handleCreateMockFile}
            >
              Upload to Drive
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateMockFile}>
          <div className="ws-field">
            <label className="ws-field-label">File Name *</label>
            <input
              type="text"
              className="ws-input"
              placeholder="e.g. Q4_Strategy_Roadmap.pdf"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="ws-field">
            <label className="ws-field-label">Target Folder</label>
            <select
              className="ws-input"
              style={{ backgroundColor: 'var(--bg-card)' }}
              value={activeFolder}
              onChange={(e) => setActiveFolder(e.target.value)}
            >
              {FOLDERS.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
