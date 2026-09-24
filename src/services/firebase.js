// =============================================================================
// WORKSPACE OS — Firebase Configuration & Authentication Service
// Centralized Firebase module for authentication and provider configurations
// =============================================================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  deleteUser
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'workspace-os-d400e.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'workspace-os-d400e',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'workspace-os-d400e.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Safe initialization of Firebase App instance (singleton pattern)
let app = null;
let auth = null;
let googleProvider = null;
let githubProvider = null;

try {
  if (firebaseConfig.apiKey) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);

    // Configure Google Auth Provider (basic profile & email only, no Drive/Sheets scopes yet)
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });

    // Configure GitHub Auth Provider
    githubProvider = new GithubAuthProvider();
    githubProvider.addScope('read:user');
    githubProvider.addScope('user:email');
  }
} catch (err) {
  console.warn('Firebase initialization warning:', err);
}

export { auth, googleProvider, githubProvider };

/**
 * Format Firebase user into the standardized Workspace OS profile schema.
 * Uses the authenticated Firebase user's UID as the user's primary identity.
 */
export function formatUserProfile(firebaseUser) {
  if (!firebaseUser) return null;

  const providerId = firebaseUser.providerData?.[0]?.providerId || 'firebase';

  return {
    uid: firebaseUser.uid,
    id: firebaseUser.uid, // Scopes local storage partition keys to the user's UID
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Workspace User',
    email: firebaseUser.email || '',
    avatar: firebaseUser.photoURL || null,
    provider: providerId.includes('github') ? 'github' : 'google',
    providerId: providerId,
    createdAt: firebaseUser.metadata?.creationTime || new Date().toISOString()
  };
}

/**
 * Friendly error message parser for Firebase authentication errors.
 */
export function parseAuthError(error) {
  if (!error) return 'An unexpected authentication error occurred.';
  const code = error.code || '';
  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in cancelled: The authentication popup was closed before completing.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
    case 'auth/cancelled-popup-request':
      return 'The authentication request was cancelled.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email address using a different sign-in method.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in your Firebase Console. Please add it under Authentication → Settings → Authorized domains.';
    case 'auth/operation-not-allowed':
      return 'This authentication provider is not enabled in your Firebase Console.';
    case 'auth/invalid-api-key':
    case 'auth/api-key-not-valid':
      return 'Invalid Firebase API Key. Please verify your VITE_FIREBASE_API_KEY environment variable.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/requires-recent-login':
      return 'For security reasons, this action requires a recent sign-in. Please log in again.';
    default:
      return error.message || 'Authentication failed. Please try again.';
  }
}

/**
 * Google Sign-In with popup
 */
export async function signInWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error('Firebase Authentication is not initialized. Please ensure VITE_FIREBASE_API_KEY is configured.');
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return formatUserProfile(result.user);
  } catch (err) {
    console.error('Google Sign-In Error:', err);
    throw new Error(parseAuthError(err));
  }
}

/**
 * GitHub Sign-In with popup
 */
export async function signInWithGithub() {
  if (!auth || !githubProvider) {
    throw new Error('Firebase Authentication is not initialized. Please ensure VITE_FIREBASE_API_KEY is configured.');
  }
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return formatUserProfile(result.user);
  } catch (err) {
    console.error('GitHub Sign-In Error:', err);
    throw new Error(parseAuthError(err));
  }
}

/**
 * Sign out of Firebase
 */
export async function signOutUser() {
  if (!auth) return;
  try {
    await fbSignOut(auth);
  } catch (err) {
    console.error('Sign Out Error:', err);
    throw new Error(parseAuthError(err));
  }
}

/**
 * Delete the currently authenticated Firebase user
 */
export async function deleteActiveUser() {
  if (!auth || !auth.currentUser) return;
  try {
    await deleteUser(auth.currentUser);
  } catch (err) {
    console.error('Delete User Error:', err);
    throw new Error(parseAuthError(err));
  }
}

/**
 * Subscribe to Firebase onAuthStateChanged
 */
export function onAuthStateChange(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return fbOnAuthStateChanged(auth, (firebaseUser) => {
    callback(formatUserProfile(firebaseUser));
  });
}
