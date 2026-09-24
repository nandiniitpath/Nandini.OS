// =============================================================================
// WORKSPACE OS — WorkspaceLayout Shell
// Protected application wrapper with Sidebar, Topbar, Search, Toast & Outlet
// =============================================================================

import { useState, useCallback } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import SearchCommand from './SearchCommand';
import Toast from './Toast';
import { useCommandPalette } from '../hooks/useCommandPalette';
import { useAuth } from '../context/AuthContext';

export default function WorkspaceLayout() {
  const { isAuthenticated, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const { isOpen: searchOpen, openPalette, closePalette } = useCommandPalette();

  const handleToggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const handleToggleMobileNav = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString();
    const newToast = { id, message, type, show: true };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Loading & protected route check
  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-deep)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: '2px solid rgba(139, 92, 246, 0.2)',
              borderTopColor: 'var(--accent-lavender)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)'
            }}
          >
            INITIALIZING WORKSPACE...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="ws-app">
      {/* Ambient background atmosphere */}
      <div className="ws-atmosphere" aria-hidden="true">
        <div className="ws-glow-orb ws-glow-orb-1" />
        <div className="ws-glow-orb ws-glow-orb-2" />
      </div>

      {/* Navigation Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={handleCloseMobile}
      />

      {/* Top Header */}
      <Topbar
        collapsed={collapsed}
        onToggleMobileNav={handleToggleMobileNav}
        onOpenSearch={openPalette}
        onShowNotice={showToast}
      />

      {/* Main View Area */}
      <main className={`ws-main ${collapsed ? 'collapsed' : ''}`} id="main-content" tabIndex={-1}>
        <Outlet context={{ showToast }} />
      </main>

      {/* Global Command Palette */}
      <SearchCommand open={searchOpen} onClose={closePalette} />

      {/* Discrete Toast Shelf */}
      <div className="ws-toast-shelf">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </div>
  );
}
