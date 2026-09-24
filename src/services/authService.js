// =============================================================================
// WORKSPACE OS — Authentication Service
// Multi-user authentication layer with Google Sign-In session handling
// =============================================================================

const SESSION_KEY = 'workspace_os_active_session';
const USERS_INDEX_KEY = 'workspace_os_registered_users';

// Helper to simulate asynchronous network latency for backend readiness
const delay = (ms = 40) => new Promise((resolve) => setTimeout(resolve, ms));

export const authService = {
  /**
   * Retrieves the currently authenticated session or null.
   */
  async getCurrentUser() {
    await delay();
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  /**
   * Google Sign-In handler.
   * Can accept user profile credentials or initialize a clean Google account.
   */
  async signInWithGoogle(customProfile = null) {
    await delay(120);

    const userProfile = customProfile || {
      id: `usr_${Date.now()}`,
      name: 'Workspace User',
      email: 'user@workspaceos.app',
      avatar: null,
      provider: 'google',
      createdAt: new Date().toISOString()
    };

    try {
      // Store session
      localStorage.setItem(SESSION_KEY, JSON.stringify(userProfile));

      // Register into local users registry
      const rawUsers = localStorage.getItem(USERS_INDEX_KEY);
      const users = rawUsers ? JSON.parse(rawUsers) : [];
      if (!users.some((u) => u.id === userProfile.id)) {
        users.push(userProfile);
        localStorage.setItem(USERS_INDEX_KEY, JSON.stringify(users));
      }

      return userProfile;
    } catch (err) {
      console.error('Failed to persist authentication session', err);
      throw new Error('Authentication failed. Please try again.');
    }
  },

  /**
   * Clears the active session and logs out to public landing page.
   */
  async signOut() {
    await delay(50);
    try {
      localStorage.removeItem(SESSION_KEY);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Deletes all local records associated with the active user account.
   */
  async deleteAccount(userId) {
    await delay(150);
    if (!userId) return false;
    try {
      // Clear all scoped keys for this user
      const prefix = `ws_data_${userId}_`;
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
      localStorage.removeItem(SESSION_KEY);
      return true;
    } catch {
      return false;
    }
  }
};

export default authService;
