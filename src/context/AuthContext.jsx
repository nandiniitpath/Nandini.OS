// =============================================================================
// WORKSPACE OS — AuthContext & User Session Provider
// =============================================================================

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    async function initAuth() {
      try {
        const active = await authService.getCurrentUser();
        setUser(active);
      } catch (err) {
        console.error('Session retrieval error:', err);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const loginWithGoogle = useCallback(async (customProfile = null) => {
    setLoading(true);
    try {
      const authenticatedUser = await authService.signInWithGoogle(customProfile);
      setUser(authenticatedUser);
      return authenticatedUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      await authService.deleteAccount(user.id);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const value = {
    user,
    userId: user?.id,
    isAuthenticated: Boolean(user),
    loading,
    loginWithGoogle,
    logout,
    deleteAccount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an AuthProvider.');
  }
  return ctx;
}

export default AuthContext;
