// =============================================================================
// WORKSPACE OS — Public SaaS Landing Page
// Matches Top-Left Panel of Product Preview
// =============================================================================

import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Briefcase,
  HardDrive,
  BookOpen,
  PenLine,
  GraduationCap,
  BarChart3,
  Shield,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Logo from '../components/Logo';
import Butterfly from '../components/Butterfly';
import GoogleIcon from '../components/GoogleIcon';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithGoogle } = useAuth();

  const handleGoogleCTA = async () => {
    if (isAuthenticated) {
      navigate('/workspace/dashboard');
    } else {
      await loginWithGoogle();
      navigate('/workspace/dashboard');
    }
  };

  return (
    <div className="landing-page">
      {/* Background glow orbs */}
      <div className="ws-atmosphere" aria-hidden="true">
        <div className="ws-glow-orb ws-glow-orb-1" />
        <div className="ws-glow-orb ws-glow-orb-2" />
      </div>

      {/* Navigation Header */}
      <nav className="landing-nav" role="navigation">
        <Logo size={28} showText={true} />

        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#tools" className="landing-nav-link">Tools</a>
          <a href="#use-cases" className="landing-nav-link">Use Cases</a>
          <a href="#security" className="landing-nav-link">Security</a>
          <a href="#faq" className="landing-nav-link">FAQ</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isAuthenticated ? (
            <button
              type="button"
              className="ws-btn ws-btn-primary ws-btn-sm"
              onClick={() => navigate('/workspace/dashboard')}
            >
              Open Workspace
              <ArrowRight size={13} />
            </button>
          ) : (
            <>
              <button
                type="button"
                className="ws-btn ws-btn-ghost ws-btn-sm"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </button>
              <button
                type="button"
                className="ws-btn ws-btn-primary ws-btn-sm"
                onClick={() => navigate('/signin')}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-badge">
          <Sparkles size={11} color="var(--accent-lavender)" />
          <span>YOUR SPACE. YOUR FLOW.</span>
        </div>

        <h1 className="landing-title">
          A personal operating system for <span>modern life.</span>
        </h1>

        <p className="landing-subtitle">
          Organize your projects, applications, documents, research, learning, writing and data — all in one place.
        </p>

        {/* Primary Call to Action */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <button
            type="button"
            className="ws-btn-google"
            onClick={handleGoogleCTA}
            aria-label="Continue with Google"
          >
            <GoogleIcon size={20} />
            <span>Continue with Google</span>
          </button>

          {/* Value Props Checkmarks */}
          <div className="landing-checkmarks">
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Check size={14} color="var(--status-green)" />
              Free to get started
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Check size={14} color="var(--status-green)" />
              Secure Google Sign-In
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Check size={14} color="var(--status-green)" />
              Your data, always private
            </span>
          </div>
        </div>

        {/* 3D Perspective Dashboard Mockup matching preview */}
        <div className="landing-mockup-wrapper">
          {/* Floating Tag Chips */}
          <div className="floating-pill" style={{ top: '6%', left: '8%', animationDelay: '0s' }}>
            ✦ Organize
          </div>
          <div className="floating-pill" style={{ top: '48%', right: '4%', animationDelay: '1.5s' }}>
            ✦ Create
          </div>
          <div className="floating-pill" style={{ bottom: '12%', left: '4%', animationDelay: '2.5s' }}>
            ✦ Track
          </div>
          <div className="floating-pill" style={{ bottom: '4%', right: '14%', animationDelay: '3.5s' }}>
            ✦ Learn
          </div>

          {/* Butterfly Accent in upper right corner of preview */}
          <div style={{ position: 'absolute', top: -24, right: 32, zIndex: 10 }}>
            <Butterfly size={110} opacity={0.7} />
          </div>

          {/* Angled Glass Mockup Card */}
          <div className="landing-mockup-card">
            {/* Mockup Mini Topbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)', marginBottom: 20 }}>
              <Logo size={20} showText={true} />
              <div style={{ width: 180, height: 24, borderRadius: 12, background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-glass)' }} />
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--violet-dim)' }} />
              </div>
            </div>

            {/* Mockup Dashboard Body */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { title: 'Projects', count: '0', color: '#2563EB' },
                { title: 'Applications', count: '0', color: '#DC2626' },
                { title: 'Certifications', count: '0', color: '#D97706' },
                { title: 'Documents', count: '0', color: '#059669' },
              ].map(card => (
                <div key={card.title} style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#FFF' }}>
                    ●
                  </div>
                  <div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--text-faint)' }}>{card.title}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>{card.count}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mockup Lower Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
              <div style={{ padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8 }}>Current Focus</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Add your first task to get started.</div>
              </div>
              <div style={{ padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8 }}>Recent Activity</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>Your activity will appear here.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Section */}
      <section id="features" style={{ maxWidth: 1100, margin: '60px auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="landing-badge">CAPABILITIES</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Built for deep work and clarity.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 540, margin: '12px auto 0' }}>
            Every module is designed to eliminate context-switching and keep your knowledge organized.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { icon: FolderKanban, title: 'Project Management', desc: 'Plan roadmaps, define problem statements, and track milestones with clear execution steps.' },
            { icon: Briefcase, title: 'Application Tracking', desc: 'Track your career applications, interviews, test schedules, and offers in an organized pipeline.' },
            { icon: HardDrive, title: 'Document Hub', desc: 'Seamlessly prepare your file repository for direct Google Drive synchronization and cloud backups.' },
            { icon: BookOpen, title: 'Research & Synthesis', desc: 'Collect articles, research notes, technical references, and study guides with tag filtering.' },
            { icon: PenLine, title: 'Writing Studio', desc: 'Distraction-free workspace for essays, creative fiction, scripts, and drafts with live word counters.' },
            { icon: GraduationCap, title: 'Learning & Skills', desc: 'Track courses, languages, and technical certifications with progress bars and completion records.' },
            { icon: BarChart3, title: 'Data Center', desc: 'Connect, visualize, and query datasets with responsive interactive charts.' },
            { icon: Shield, title: 'Private & Secure', desc: 'Multi-user architecture ensuring your data is isolated, encrypted, and accessible only by you.' },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="ws-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', background: 'var(--violet-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-lavender)' }}>
                  <Icon size={18} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700 }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security & Multi-User Architecture */}
      <section id="security" style={{ background: 'rgba(7, 9, 20, 0.6)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div className="landing-badge">SECURITY FIRST</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, marginBottom: 16 }}>
            Your data belongs to you. Always.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 32 }}>
            WORKSPACE OS is built with strict multi-user tenant isolation. Your records, notes, files, and applications are never shared, never exposed to other accounts, and never used to train public models.
          </p>
          <button
            type="button"
            className="ws-btn-google"
            onClick={handleGoogleCTA}
          >
            <GoogleIcon size={18} />
            <span>Get Your Private Workspace</span>
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ maxWidth: 780, margin: '80px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700 }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { q: 'Is WORKSPACE OS free to use?', a: 'Yes. You can sign in with your Google account and immediately use your personal workspace with unlimited projects, notes, and task tracking.' },
            { q: 'How does Google authentication work?', a: 'We use OAuth 2.0. We only request basic profile authentication. We do not store or expose any private OAuth secrets on client machines.' },
            { q: 'Can other users see my projects or documents?', a: 'Never. Every user receives a private, isolated workspace. User A cannot view User B’s data under any circumstance.' },
            { q: 'Can I connect Google Drive and Google Sheets?', a: 'Yes. The integration architecture is pre-configured, and cloud connection hooks are provided inside Documents and Settings.' },
          ].map((faq) => (
            <div key={faq.q} className="ws-card">
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, marginBottom: 6 }}>
                {faq.q}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '36px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Logo size={22} showText={true} />
        <div style={{ fontSize: '0.74rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
          © {new Date().getFullYear()} WORKSPACE OS. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
