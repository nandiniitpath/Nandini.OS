// =============================================================================
// WORKSPACE OS — Sign In Page
// Matches Top-Right Panel of Product Preview (Real Firebase Auth)
// =============================================================================

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, LayoutDashboard, ArrowLeft, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import Butterfly from '../components/Butterfly';
import GoogleIcon from '../components/GoogleIcon';
import GithubIcon from '../components/GithubIcon';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithGithub, isAuthenticated, loading } = useAuth();
  const [authError, setAuthError] = useState(null);

  // If already authenticated, immediately proceed to workspace
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/workspace/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await loginWithGoogle();
      navigate('/workspace/dashboard');
    } catch (err) {
      setAuthError(err.message || 'Google authentication failed. Please try again.');
    }
  };

  const handleGithubSignIn = async () => {
    setAuthError(null);
    try {
      await loginWithGithub();
      navigate('/workspace/dashboard');
    } catch (err) {
      setAuthError(err.message || 'GitHub authentication failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px'
      }}
    >
      {/* Background glow atmosphere */}
      <div className="ws-atmosphere" aria-hidden="true">
        <div className="ws-glow-orb ws-glow-orb-1" style={{ top: '-10%', right: '10%' }} />
        <div className="ws-glow-orb ws-glow-orb-2" style={{ bottom: '-10%', left: '5%' }} />
      </div>

      {/* Back to landing page button */}
      <Link
        to="/"
        className="ws-btn ws-btn-ghost ws-btn-sm"
        style={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}
      >
        <ArrowLeft size={14} />
        Back to Home
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 440px) minmax(280px, 380px)',
          gap: 60,
          alignItems: 'center',
          maxWidth: 960,
          width: '100%',
          zIndex: 1
        }}
      >
        {/* Left: Sign-In Card */}
        <div>
          <div
            className="ws-card"
            style={{
              padding: '40px 32px',
              textAlign: 'center',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            {/* Hex Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <Logo size={36} showText={false} />
            </div>

            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.86rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: 6
              }}
            >
              WORKSPACE OS
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: 8
              }}
            >
              Sign in to your workspace
            </h2>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 28 }}>
              Choose your preferred sign-in provider to continue.
            </p>

            {/* Error Message Notice */}
            {authError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  color: '#FCA5A5',
                  fontSize: '0.78rem',
                  lineHeight: 1.45,
                  marginBottom: 20,
                  textAlign: 'left'
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{authError}</span>
              </div>
            )}

            {/* Authentication Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Google Sign-In */}
              <button
                type="button"
                className="ws-btn-google"
                style={{ width: '100%' }}
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <GoogleIcon size={18} />
                <span>Continue with Google</span>
              </button>

              {/* GitHub Sign-In */}
              <button
                type="button"
                className="ws-btn-github"
                style={{ width: '100%' }}
                onClick={handleGithubSignIn}
                disabled={loading}
              >
                <GithubIcon size={18} />
                <span>Continue with GitHub</span>
              </button>
            </div>

            <p
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-faint)',
                marginTop: 24,
                lineHeight: 1.5
              }}
            >
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Footer Security Badges below card matching preview */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              padding: '0 8px',
              gap: 16
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={16} color="var(--accent-lavender)" />
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Secure
                </div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)' }}>
                  Firebase OAuth 2.0
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <LayoutDashboard size={16} color="var(--accent-blue)" />
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Your Workspace
                </div>
                <div style={{ fontSize: '0.64rem', color: 'var(--text-faint)' }}>
                  Access anywhere
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Floating Glass Cards with Butterfly & Slogan matching preview */}
        <div
          style={{
            position: 'relative',
            height: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="sign-in-art-panel"
        >
          {/* Layered Glass Panels */}
          <div
            style={{
              position: 'absolute',
              width: '260px',
              height: '340px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(255, 255, 255, 0.02))',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              transform: 'rotate(12deg) translateX(20px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '260px',
              height: '340px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(74, 142, 255, 0.1), rgba(139, 92, 246, 0.05))',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              transform: 'rotate(-4deg)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '28px 24px'
            }}
          >
            {/* Butterfly Accent */}
            <div style={{ alignSelf: 'flex-end', marginTop: 10 }}>
              <Butterfly size={90} opacity={0.85} />
            </div>

            {/* Slogan */}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--accent-lavender)',
                lineHeight: 1.3
              }}
            >
              A clearer space for your ideas.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
