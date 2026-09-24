// =============================================================================
// WORKSPACE OS — QuickAccess Component
// Direct launcher for frequently used workspaces and external tools
// =============================================================================

import { useNavigate } from 'react-router-dom';
import { FileSpreadsheet, HardDrive, Sparkles, BookOpen, FileText } from 'lucide-react';

// Custom clean GitHub SVG icon to avoid missing exports
function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function QuickAccess({ onNotice }) {
  const navigate = useNavigate();

  const items = [
    {
      name: 'Excel',
      category: 'Data & Sheets',
      icon: <FileSpreadsheet size={18} />,
      action: () => navigate('/workspace/data')
    },
    {
      name: 'Google Drive',
      category: 'Connect later',
      icon: <HardDrive size={18} />,
      action: () => onNotice && onNotice('Google Drive connection can be configured in Settings.')
    },
    {
      name: 'GitHub',
      category: 'Repositories',
      icon: <GithubIcon size={18} />,
      action: () => window.open('https://github.com', '_blank', 'noopener,noreferrer')
    },
    {
      name: 'AI Tools',
      category: 'Toolkit Launcher',
      icon: <Sparkles size={18} />,
      action: () => navigate('/workspace/toolkit')
    },
    {
      name: 'Research',
      category: 'Research Hub',
      icon: <BookOpen size={18} />,
      action: () => navigate('/workspace/research')
    },
    {
      name: 'Notes',
      category: 'Writing Lab',
      icon: <FileText size={18} />,
      action: () => navigate('/workspace/writing')
    }
  ];

  return (
    <div className="ws-quick-grid">
      {items.map((item) => (
        <div
          key={item.name}
          className="ws-quick-card"
          onClick={item.action}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              item.action();
            }
          }}
          aria-label={`Open ${item.name}`}
        >
          <div className="ws-quick-icon" aria-hidden="true">
            {item.icon}
          </div>
          <div>
            <div className="ws-quick-name">{item.name}</div>
            <div className="ws-quick-sub">{item.category}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
