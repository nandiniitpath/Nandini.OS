// =============================================================================
// WORKSPACE OS — Authentication Service
// Bridges Firebase Auth with Workspace OS user storage partitions
// =============================================================================

import {
  signInWithGoogle,
  signInWithGithub,
  signOutUser,
  deleteActiveUser,
  onAuthStateChange
} from './firebase';

export const authService = {
  /**
   * Listen to Firebase auth state changes.
   */
  subscribeToAuth(callback) {
    return onAuthStateChange(callback);
  },

  /**
   * Google Sign-In via Firebase
   */
  async signInWithGoogle() {
    return await signInWithGoogle();
  },

  /**
   * GitHub Sign-In via Firebase
   */
  async signInWithGithub() {
    return await signInWithGithub();
  },

  /**
   * Sign Out via Firebase
   */
  async signOut() {
    await signOutUser();
    return true;
  },

  /**
   * Deletes all local records associated with the user account and deletes Firebase user
   */
  async deleteAccount(userId) {
    if (userId) {
      const prefix = `ws_data_${userId}_`;
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
    }
    await deleteActiveUser();
    return true;
  }
};

export default authService;
