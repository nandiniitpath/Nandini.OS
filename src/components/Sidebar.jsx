// =============================================================================
// WORKSPACE OS — Sidebar Component
// Persistent navigation shell matching the product direction
// =============================================================================

import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Award,
  FileText,
  BookOpen,
  PenLine,
  GraduationCap,
  BarChart3,
  Wrench,
  Settings,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import { initials } from '../utils/helpers';

const NAV_ITEMS = [
  { path: '/workspace/dashboard',     label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/workspace/projects',      label: 'Projects',      icon: FolderKanban },
  { path: '/workspace/applications',  label: 'Applications',  icon: Briefcase },
  { path: '/workspace/certifications',label: 'Certifications',icon: Award },
  { path: '/workspace/documents',     label: 'Documents',     icon: FileText },
  { path: '/workspace/research',      label: 'Research',      icon: BookOpen },
  { path: '/workspace/writing',       label: 'Writing',       icon: PenLine },
  { path: '/workspace/learning',      label: 'Learning',      icon: GraduationCap },
  { path: '/workspace/data',          label: 'Data Center',   icon: BarChart3 },
  { path: '/workspace/toolkit',       label: 'Toolkit',       icon: Wrench },
];

export default function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const userName = user?.name || 'Workspace User';
  const userInitials = initials(userName);

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="ws-drawer-backdrop open"
          style={{ zIndex: 99 }}
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`ws-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
        aria-label="Workspace navigation"
      >
        {/* Brand Header */}
        <div className="ws-sidebar-brand">
          <NavLink to="/workspace/dashboard" style={{ textDecoration: 'none' }}>
            <Logo size={26} showText={!collapsed} />
          </NavLink>
          <button
            type="button"
            className="ws-sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft size={16} />
          </button>
        </div>

        {/* Navigation Link Items */}
        <nav className="ws-sidebar-nav" role="navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) => `ws-nav-item ${isActive ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="ws-nav-icon">
                  <Icon size={16} />
                </span>
                <span className="ws-nav-label">{item.label}</span>
              </NavLink>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: 16 }}>
            <NavLink
              to="/workspace/settings"
              onClick={onCloseMobile}
              className={({ isActive }) => `ws-nav-item ${isActive ? 'active' : ''}`}
              title={collapsed ? 'Settings' : undefined}
            >
              <span className="ws-nav-icon">
                <Settings size={16} />
              </span>
              <span className="ws-nav-label">Settings</span>
            </NavLink>

            <button
              type="button"
              onClick={handleSignOut}
              className="ws-nav-item"
              style={{ width: '100%', textAlign: 'left', background: 'transparent' }}
              title={collapsed ? 'Sign out' : undefined}
            >
              <span className="ws-nav-icon">
                <LogOut size={16} />
              </span>
              <span className="ws-nav-label">Sign out</span>
            </button>
          </div>
        </nav>

        {/* User Profile Widget */}
        <div className="ws-sidebar-footer">
          <div
            className="ws-user-widget"
            onClick={() => navigate('/workspace/settings')}
            title="Account Settings"
          >
            <div className="ws-user-avatar" aria-hidden="true">
              {user?.avatar ? (
                <img src={user.avatar} alt={userName} />
              ) : (
                userInitials
              )}
            </div>
            <div className="ws-user-meta">
              <div className="ws-user-name">{userName}</div>
              <div className="ws-user-status">{user?.email || 'Authenticated'}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
