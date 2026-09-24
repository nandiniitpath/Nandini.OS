// =============================================================================
// WORKSPACE OS — AuthContext & User Session Provider
// Reactive Firebase session management using onAuthStateChanged()
// =============================================================================

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Subscribe to real-time Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuth((authenticatedProfile) => {
      setUser(authenticatedProfile);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const profile = await authService.signInWithGoogle();
      setUser(profile);
      return profile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const loginWithGithub = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const profile = await authService.signInWithGithub();
      setUser(profile);
      return profile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.signOut();
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      await authService.deleteAccount(user.uid || user.id);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const value = {
    user,
    userId: user?.uid || user?.id,
    isAuthenticated: Boolean(user),
    loading,
    error,
    clearError,
    loginWithGoogle,
    loginWithGithub,
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
