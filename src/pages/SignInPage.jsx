// =============================================================================
// WORKSPACE OS — Sign In Page
// Matches Top-Right Panel of Product Preview
// =============================================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, LayoutDashboard, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import Butterfly from '../components/Butterfly';
import GoogleIcon from '../components/GoogleIcon';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, loading } = useAuth();
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomOption, setShowCustomOption] = useState(false);

  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    let profile = null;
    if (customEmail.trim()) {
      profile = {
        id: `usr_${customEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
        name: customName.trim() || customEmail.split('@')[0],
        email: customEmail.trim(),
        avatar: null,
        provider: 'google',
        createdAt: new Date().toISOString()
      };
    }
    await loginWithGoogle(profile);
    navigate('/workspace/dashboard');
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
              Continue with your Google account to get started.
            </p>

            {/* Google Sign-In Action */}
            <button
              type="button"
              className="ws-btn-google"
              style={{ width: '100%' }}
              onClick={() => handleSignIn()}
              disabled={loading}
            >
              <GoogleIcon size={18} />
              <span>Continue with Google</span>
            </button>

            {/* Custom Google Account Simulator for testing multi-user isolation */}
            <div style={{ marginTop: 14 }}>
              <button
                type="button"
                className="ws-btn-ghost"
                style={{ fontSize: '0.7rem', color: 'var(--text-faint)', textDecoration: 'underline' }}
                onClick={() => setShowCustomOption(!showCustomOption)}
              >
                {showCustomOption ? 'Hide test account options' : 'Specify test Google account email'}
              </button>
            </div>

            {showCustomOption && (
              <form onSubmit={handleSignIn} style={{ marginTop: 16, textAlign: 'left' }}>
                <div className="ws-field" style={{ marginBottom: 10 }}>
                  <label className="ws-field-label">Account Name</label>
                  <input
                    type="text"
                    className="ws-input"
                    placeholder="e.g. Alex Morgan"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                  />
                </div>
                <div className="ws-field" style={{ marginBottom: 14 }}>
                  <label className="ws-field-label">Google Email</label>
                  <input
                    type="email"
                    className="ws-input"
                    placeholder="alex@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="ws-btn ws-btn-primary ws-btn-sm" style={{ width: '100%' }}>
                  Sign in with this account
                </button>
              </form>
            )}

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
                  Your data is private
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
