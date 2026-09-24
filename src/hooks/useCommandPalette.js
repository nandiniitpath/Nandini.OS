// =============================================================================
// WORKSPACE OS — useCommandPalette Hook
// Manages global command palette (Ctrl+K / Cmd+K) visibility & shortcuts
// =============================================================================

import { useState, useEffect, useCallback } from 'react';

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = useCallback(() => setIsOpen(true), []);
  const closePalette = useCallback(() => setIsOpen(false), []);
  const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        togglePalette();
      } else if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        closePalette();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePalette, closePalette]);

  return {
    isOpen,
    openPalette,
    closePalette,
    togglePalette,
  };
}

export default useCommandPalette;
