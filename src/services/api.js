// =============================================================================
// WORKSPACE OS — Domain Service Layer
// Future-proof, user-scoped service endpoints for all workspace modules.
// Returns real user data scoped strictly to the authenticated user ID.
// =============================================================================

import { loadUserRecords, saveUserRecords } from './storageHelper';

const delay = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Projects Service ──────────────────────────────────────────────
export const projectService = {
  async getProjects(userId) {
    await delay();
    return loadUserRecords(userId, 'projects');
  },
  async createProject(userId, projectData) {
    await delay();
    const existing = loadUserRecords(userId, 'projects');
    const newProject = {
      id: `proj_${Date.now()}`,
      title: projectData.title,
      description: projectData.description || '',
      category: projectData.category || 'General',
      status: projectData.status || 'PLANNING',
      priority: projectData.priority || 'MEDIUM',
      tags: projectData.tags || [],
      tools: projectData.tools || [],
      links: projectData.links || [],
      notes: projectData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updated = [newProject, ...existing];
    saveUserRecords(userId, 'projects', updated);
    activityService.logActivity(userId, `Created project "${newProject.title}"`, 'violet');
    return newProject;
  },
  async updateProject(userId, projectId, updates) {
    await delay();
    const existing = loadUserRecords(userId, 'projects');
    const updated = existing.map((p) =>
      p.id === projectId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    saveUserRecords(userId, 'projects', updated);
    return updated.find((p) => p.id === projectId);
  },
  async deleteProject(userId, projectId) {
    await delay();
    const existing = loadUserRecords(userId, 'projects');
    const filtered = existing.filter((p) => p.id !== projectId);
    saveUserRecords(userId, 'projects', filtered);
    return true;
  }
};

// ── Applications Service ──────────────────────────────────────────
export const applicationService = {
  async getApplications(userId) {
    await delay();
    return loadUserRecords(userId, 'applications');
  },
  async createApplication(userId, appData) {
    await delay();
    const existing = loadUserRecords(userId, 'applications');
    const newApp = {
      id: `app_${Date.now()}`,
      company: appData.company,
      position: appData.position,
      location: appData.location || '',
      country: appData.country || '',
      status: appData.status || 'APPLIED',
      applicationDate: appData.applicationDate || new Date().toISOString().split('T')[0],
      notes: appData.notes || '',
      link: appData.link || '',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    const updated = [newApp, ...existing];
    saveUserRecords(userId, 'applications', updated);
    activityService.logActivity(userId, `Added application for ${newApp.company}`, 'blue');
    return newApp;
  },
  async updateApplication(userId, appId, updates) {
    await delay();
    const existing = loadUserRecords(userId, 'applications');
    const updated = existing.map((a) =>
      a.id === appId ? { ...a, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : a
    );
    saveUserRecords(userId, 'applications', updated);
    return updated.find((a) => a.id === appId);
  },
  async deleteApplication(userId, appId) {
    await delay();
    const existing = loadUserRecords(userId, 'applications');
    const filtered = existing.filter((a) => a.id !== appId);
    saveUserRecords(userId, 'applications', filtered);
    return true;
  }
};

// ── Certifications Service ────────────────────────────────────────
export const certificationService = {
  async getCertificates(userId) {
    await delay();
    return loadUserRecords(userId, 'certifications');
  },
  async createCertificate(userId, certData) {
    await delay();
    const existing = loadUserRecords(userId, 'certifications');
    const newCert = {
      id: `cert_${Date.now()}`,
      title: certData.title,
      issuer: certData.issuer,
      date: certData.date || new Date().toISOString().split('T')[0],
      category: certData.category || 'General',
      credentialId: certData.credentialId || '',
      verificationUrl: certData.verificationUrl || '',
      createdAt: new Date().toISOString()
    };
    const updated = [newCert, ...existing];
    saveUserRecords(userId, 'certifications', updated);
    activityService.logActivity(userId, `Added certification: ${newCert.title}`, 'cyan');
    return newCert;
  },
  async deleteCertificate(userId, certId) {
    await delay();
    const existing = loadUserRecords(userId, 'certifications');
    const filtered = existing.filter((c) => c.id !== certId);
    saveUserRecords(userId, 'certifications', filtered);
    return true;
  }
};

// ── Documents Service ─────────────────────────────────────────────
export const documentService = {
  async getDocuments(userId) {
    await delay();
    return loadUserRecords(userId, 'documents');
  },
  async isGoogleDriveConnected(userId) {
    await delay();
    const key = `ws_gdrive_connected_${userId}`;
    return localStorage.getItem(key) === 'true';
  },
  async connectGoogleDrive(userId) {
    await delay(200);
    const key = `ws_gdrive_connected_${userId}`;
    localStorage.setItem(key, 'true');
    return true;
  },
  async disconnectGoogleDrive(userId) {
    await delay(100);
    const key = `ws_gdrive_connected_${userId}`;
    localStorage.removeItem(key);
    return true;
  }
};

// ── Research Hub Service ──────────────────────────────────────────
export const researchService = {
  async getResearchNotes(userId) {
    await delay();
    return loadUserRecords(userId, 'research');
  },
  async createResearchNote(userId, noteData) {
    await delay();
    const existing = loadUserRecords(userId, 'research');
    const newNote = {
      id: `res_${Date.now()}`,
      title: noteData.title,
      category: noteData.category || 'General',
      tags: noteData.tags || [],
      source: noteData.source || '',
      url: noteData.url || '',
      content: noteData.content || '',
      status: noteData.status || 'SAVED',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newNote, ...existing];
    saveUserRecords(userId, 'research', updated);
    activityService.logActivity(userId, `Saved research note "${newNote.title}"`, 'green');
    return newNote;
  },
  async deleteResearchNote(userId, noteId) {
    await delay();
    const existing = loadUserRecords(userId, 'research');
    const filtered = existing.filter((r) => r.id !== noteId);
    saveUserRecords(userId, 'research', filtered);
    return true;
  }
};

// ── Writing Lab Service ───────────────────────────────────────────
export const writingService = {
  async getWritingPieces(userId) {
    await delay();
    return loadUserRecords(userId, 'writing');
  },
  async createWritingPiece(userId, pieceData) {
    await delay();
    const existing = loadUserRecords(userId, 'writing');
    const newPiece = {
      id: `write_${Date.now()}`,
      title: pieceData.title,
      type: pieceData.type || 'ESSAY',
      category: pieceData.category || 'Drafts',
      status: pieceData.status || 'DRAFT',
      content: pieceData.content || '',
      wordCount: pieceData.content ? pieceData.content.trim().split(/\s+/).filter(Boolean).length : 0,
      lastEdited: new Date().toISOString().split('T')[0]
    };
    const updated = [newPiece, ...existing];
    saveUserRecords(userId, 'writing', updated);
    activityService.logActivity(userId, `Drafted piece "${newPiece.title}"`, 'amber');
    return newPiece;
  },
  async updateWritingPiece(userId, pieceId, updates) {
    await delay();
    const existing = loadUserRecords(userId, 'writing');
    const updated = existing.map((p) => {
      if (p.id === pieceId) {
        const merged = { ...p, ...updates };
        const wordCount = merged.content ? merged.content.trim().split(/\s+/).filter(Boolean).length : 0;
        return {
          ...merged,
          wordCount,
          lastEdited: new Date().toISOString().split('T')[0]
        };
      }
      return p;
    });
    saveUserRecords(userId, 'writing', updated);
    return updated.find((p) => p.id === pieceId);
  },
  async deleteWritingPiece(userId, pieceId) {
    await delay();
    const existing = loadUserRecords(userId, 'writing');
    const filtered = existing.filter((p) => p.id !== pieceId);
    saveUserRecords(userId, 'writing', filtered);
    return true;
  }
};

// ── Learning Service ──────────────────────────────────────────────
export const learningService = {
  async getLearningItems(userId) {
    await delay();
    return loadUserRecords(userId, 'learning');
  },
  async createLearningItem(userId, itemData) {
    await delay();
    const existing = loadUserRecords(userId, 'learning');
    const newItem = {
      id: `learn_${Date.now()}`,
      title: itemData.title,
      platform: itemData.platform || '',
      category: itemData.category || 'General',
      progress: Number(itemData.progress) || 0,
      status: itemData.status || 'IN PROGRESS',
      notes: itemData.notes || '',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newItem, ...existing];
    saveUserRecords(userId, 'learning', updated);
    activityService.logActivity(userId, `Enrolled in ${newItem.title}`, 'violet');
    return newItem;
  },
  async updateLearningProgress(userId, itemId, progress) {
    await delay();
    const existing = loadUserRecords(userId, 'learning');
    const updated = existing.map((item) => {
      if (item.id === itemId) {
        const p = Math.min(100, Math.max(0, Number(progress)));
        return {
          ...item,
          progress: p,
          status: p === 100 ? 'COMPLETED' : 'IN PROGRESS',
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    });
    saveUserRecords(userId, 'learning', updated);
    return updated.find((item) => item.id === itemId);
  },
  async deleteLearningItem(userId, itemId) {
    await delay();
    const existing = loadUserRecords(userId, 'learning');
    const filtered = existing.filter((item) => item.id !== itemId);
    saveUserRecords(userId, 'learning', filtered);
    return true;
  }
};

// ── Datasets Service ──────────────────────────────────────────────
export const datasetService = {
  async getDatasets(userId) {
    await delay();
    return loadUserRecords(userId, 'datasets');
  },
  async createDataset(userId, datasetData) {
    await delay();
    const existing = loadUserRecords(userId, 'datasets');
    const newDataset = {
      id: `ds_${Date.now()}`,
      name: datasetData.name,
      description: datasetData.description || '',
      source: datasetData.source || 'Manual Upload',
      rowsCount: datasetData.rowsCount || 0,
      columnsCount: datasetData.columnsCount || 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newDataset, ...existing];
    saveUserRecords(userId, 'datasets', updated);
    activityService.logActivity(userId, `Imported dataset "${newDataset.name}"`, 'blue');
    return newDataset;
  },
  async deleteDataset(userId, datasetId) {
    await delay();
    const existing = loadUserRecords(userId, 'datasets');
    const filtered = existing.filter((ds) => ds.id !== datasetId);
    saveUserRecords(userId, 'datasets', filtered);
    return true;
  }
};

// ── Tasks Service ─────────────────────────────────────────────────
export const taskService = {
  async getTasks(userId) {
    await delay();
    return loadUserRecords(userId, 'tasks');
  },
  async createTask(userId, title) {
    await delay();
    const existing = loadUserRecords(userId, 'tasks');
    const newTask = {
      id: `task_${Date.now()}`,
      title,
      status: 'TODO',
      createdAt: new Date().toISOString()
    };
    const updated = [newTask, ...existing];
    saveUserRecords(userId, 'tasks', updated);
    return newTask;
  },
  async toggleTask(userId, taskId) {
    await delay();
    const existing = loadUserRecords(userId, 'tasks');
    const updated = existing.map((t) =>
      t.id === taskId ? { ...t, status: t.status === 'DONE' ? 'TODO' : 'DONE' } : t
    );
    saveUserRecords(userId, 'tasks', updated);
    return updated;
  },
  async deleteTask(userId, taskId) {
    await delay();
    const existing = loadUserRecords(userId, 'tasks');
    const filtered = existing.filter((t) => t.id !== taskId);
    saveUserRecords(userId, 'tasks', filtered);
    return true;
  }
};

// ── Activity Service ──────────────────────────────────────────────
export const activityService = {
  async getActivities(userId) {
    await delay();
    return loadUserRecords(userId, 'activities');
  },
  logActivity(userId, text, type = 'violet') {
    try {
      const existing = loadUserRecords(userId, 'activities');
      const item = {
        id: `act_${Date.now()}`,
        text,
        type,
        timestamp: 'Just now'
      };
      const updated = [item, ...existing].slice(0, 20);
      saveUserRecords(userId, 'activities', updated);
    } catch {
      // safe fallback
    }
  }
};

// ── Dashboard Metrics Service ─────────────────────────────────────
export async function getDashboardStats(userId) {
  await delay();
  const projects = loadUserRecords(userId, 'projects');
  const applications = loadUserRecords(userId, 'applications');
  const certifications = loadUserRecords(userId, 'certifications');
  const documents = loadUserRecords(userId, 'documents');

  return {
    projects: projects.length,
    applications: applications.length,
    certifications: certifications.length,
    documents: documents.length
  };
}
