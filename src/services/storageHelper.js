// =============================================================================
// WORKSPACE OS — User Scoped Storage Helper
// Ensures strict data isolation between multiple users
// =============================================================================

export function getUserStorageKey(userId, resourceName) {
  if (!userId) {
    throw new Error(`Cannot perform ${resourceName} operation without an authenticated userId.`);
  }
  return `ws_data_${userId}_${resourceName}`;
}

export function loadUserRecords(userId, resourceName) {
  try {
    const key = getUserStorageKey(userId, resourceName);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserRecords(userId, resourceName, records) {
  try {
    const key = getUserStorageKey(userId, resourceName);
    localStorage.setItem(key, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}
