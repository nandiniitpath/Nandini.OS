// =============================================================================
// WORKSPACE OS — Utilities & Helpers
// =============================================================================

import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

// Date helpers
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return format(d, 'dd MMM yyyy');
  } catch {
    return dateStr;
  }
}

export function formatDateShort(dateStr) {
  if (!dateStr) return '—';
  try {
    return format(new Date(dateStr), 'dd MMM');
  } catch {
    return dateStr;
  }
}

export function formatRelative(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isToday(d)) return 'Today';
    if (isYesterday(d)) return 'Yesterday';
    return formatDistanceToNow(d, { addSuffix: true });
  } catch {
    return dateStr;
  }
}

export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatCurrentDate() {
  return format(new Date(), 'EEEE, d MMMM yyyy');
}

export function formatCurrentDateShort() {
  return format(new Date(), 'EEE d MMM');
}

// String helpers
export function truncate(str, n = 60) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '…' : str;
}

export function initials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

// Tool icon emoji/symbol mapping
export const toolIconMap = {
  chatgpt: '🤖',
  gemini: '✨',
  notion: '📝',
  vscode: '💻',
  drive: '☁️',
  github: '🐙',
  figma: '🎨',
  kali: '🛡️',
  sheets: '📊',
  wireshark: '🔍',
  linear: '📐',
  scholar: '🎓'
};

// Filter helper
export function filterByCategory(items, activeFilter, categoryField = 'category') {
  if (!activeFilter || activeFilter === 'ALL' || activeFilter === 'All') return items;
  return items.filter((item) => item[categoryField] === activeFilter);
}

// Search helper
export function searchItems(items, query, fields) {
  if (!query || !query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter((item) =>
    fields.some((f) => {
      const val = item[f];
      if (!val) return false;
      if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(q));
      return String(val).toLowerCase().includes(q);
    })
  );
}
