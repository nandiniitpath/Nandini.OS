// =============================================================================
// WORKSPACE OS — Application Router & Root
// Public SaaS Landing Page + Google Auth + Private User Workspaces
// =============================================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import WorkspaceLayout from './components/WorkspaceLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';

// Workspace Modules
import Dashboard from './pages/Dashboard';
import Toolkit from './pages/Toolkit';
import Projects from './pages/Projects';
import Applications from './pages/Applications';
import Certifications from './pages/Certifications';
import Documents from './pages/Documents';
import ResearchHub from './pages/ResearchHub';
import WritingLab from './pages/WritingLab';
import Learning from './pages/Learning';
import DataCenter from './pages/DataCenter';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Google Sign In */}
          <Route path="/signin" element={<SignInPage />} />

          {/* Authenticated Workspace Shell */}
          <Route path="/workspace" element={<WorkspaceLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="applications" element={<Applications />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="documents" element={<Documents />} />
            <Route path="research" element={<ResearchHub />} />
            <Route path="writing" element={<WritingLab />} />
            <Route path="learning" element={<Learning />} />
            <Route path="data" element={<DataCenter />} />
            <Route path="toolkit" element={<Toolkit />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
