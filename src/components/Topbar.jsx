// =============================================================================
// WORKSPACE OS — Topbar Component
// Application header with global search & utility controls
// =============================================================================

import { Search, Bell, Moon, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { initials } from '../utils/helpers';
import Logo from './Logo';

export default function Topbar({
  collapsed,
  onToggleMobileNav,
  onOpenSearch,
  onShowNotice
}) {
  const { user } = useAuth();
  const userInitials = initials(user?.name || 'User');

  return (
    <header className={`ws-topbar ${collapsed ? 'collapsed' : ''}`} role="banner">
      {/* Mobile nav open toggle */}
      <button
        type="button"
        className="ws-mobile-nav-toggle"
        onClick={onToggleMobileNav}
        aria-label="Open sidebar menu"
      >
        <Menu size={18} />
      </button>

      {/* Brand shown on mobile or when sidebar is collapsed */}
      {collapsed && (
        <div style={{ marginRight: 8 }}>
          <Logo size={22} showText={false} />
        </div>
      )}

      {/* Global Search Bar */}
      <button
        type="button"
        className="ws-search-bar"
        onClick={onOpenSearch}
        aria-label="Search your workspace (Press Ctrl+K)"
      >
        <Search size={14} />
        <span>Search... (Ctrl + K)</span>
        <kbd className="ws-search-shortcut">Ctrl K</kbd>
      </button>

      {/* Right Action Tools */}
      <div className="ws-topbar-actions">
        {/* Notification Icon */}
        <button
          type="button"
          className="ws-icon-btn has-dot"
          title="Notifications"
          onClick={() => onShowNotice && onShowNotice('No new unread notifications.')}
          aria-label="Notifications"
        >
          <Bell size={15} />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          className="ws-icon-btn"
          title="Theme"
          onClick={() => onShowNotice && onShowNotice('Dark theme is default for WORKSPACE OS.')}
          aria-label="Toggle theme"
        >
          <Moon size={15} />
        </button>

        {/* Profile Avatar */}
        <div
          className="ws-user-avatar"
          style={{ width: 30, height: 30, fontSize: '0.72rem', cursor: 'pointer' }}
          title={user?.name || 'Account'}
          role="button"
          tabIndex={0}
          aria-label="User account"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            userInitials
          )}
        </div>
      </div>
    </header>
  );
}
