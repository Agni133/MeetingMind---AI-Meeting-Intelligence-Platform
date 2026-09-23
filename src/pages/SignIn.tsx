import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignIn as ClerkSignIn } from '@clerk/react';
import { useAuth } from '../context/Authcontext';
import SignInform from '../components/common/SignInform';

// AI MeetingMind Bespoke Vector Logo
export const AIMeetingMindLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; withText?: boolean }> = ({
  size = 'md',
  withText = true,
}) => {
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative ${iconDimensions} rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-[1.5px] shadow-lg shadow-emerald-500/20 group`}>
        {/* Glowing border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/80 via-teal-500/50 to-emerald-600/80 opacity-75 group-hover:opacity-100 transition-opacity" />

        {/* Inner container */}
        <div className="relative w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Subtle backdrop glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-cyan-500/10" />

          {/* Neural Mind + Soundwave SVG */}
          <svg
            className="w-3/4 h-3/4 text-emerald-400 relative z-10"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoBrainGrad" x1="2" y1="4" x2="38" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="0.5" stopColor="#10b981" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="soundBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#6ee7b7" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Neural Synapse Nodes & Arcs (Mind/AI) */}
            <path
              d="M10 13C8 16 8 24 10 27C12 30 15 32 19 32"
              stroke="url(#logoBrainGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M30 13C32 16 32 24 30 27C28 30 25 32 21 32"
              stroke="url(#logoBrainGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M14 9C17 7 23 7 26 9"
              stroke="url(#logoBrainGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Synapse Nodes */}
            <circle cx="10" cy="13" r="2" fill="#34d399" filter="url(#neonGlow)" />
            <circle cx="30" cy="13" r="2" fill="#06b6d4" filter="url(#neonGlow)" />
            <circle cx="20" cy="7" r="2" fill="#6ee7b7" />
            <circle cx="19" cy="32" r="2" fill="#10b981" />
            <circle cx="21" cy="32" r="2" fill="#10b981" />

            {/* Central Meeting Speech Soundwaves (Equalizer Pulse) */}
            <rect x="13" y="16" width="2.4" height="8" rx="1.2" fill="url(#soundBarGrad)" />
            <rect x="17.2" y="12" width="2.4" height="16" rx="1.2" fill="url(#soundBarGrad)" filter="url(#neonGlow)" />
            <rect x="21.4" y="14" width="2.4" height="12" rx="1.2" fill="url(#soundBarGrad)" filter="url(#neonGlow)" />
            <rect x="25.6" y="17" width="2.4" height="6" rx="1.2" fill="url(#soundBarGrad)" />
          </svg>
        </div>
      </div>

      {withText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-white font-sans">
              Meeting<span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Mind</span>
            </span>
            <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AI
            </span>
          </div>
          <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase -mt-0.5">
            Meeting Intelligence
          </span>
        </div>
      )}
    </div>
  );
};

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [authMode, setAuthMode] = useState<'clerk' | 'direct'>('clerk');
  const [showClerkGuide, setShowClerkGuide] = useState(false);

  const handleQuickDemo = async () => {
    await login('alex@meetingmind.ai', 'demo123');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Dynamic Background Glows (Matching Landing Page Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-180px] left-[-150px] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-180px] right-[-150px] w-[550px] h-[550px] bg-green-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/5 rounded-full blur-[160px]" />
      </div>

      {/* Main Container Card (Dual-panel wireframe structure) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2"
      >
        {/* LEFT HERO SECTION (Wireframe 2: Logo, Left Hero, Features + Quotes) */}
        <div className="relative p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="mb-10">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
                <AIMeetingMindLogo size="lg" withText={true} />
              </Link>
            </div>

            {/* Left Hero Section Content */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-emerald-400 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Meeting Intelligence Platform
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Turn Every Meeting into{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                Actionable Clarity
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Capture discussions automatically, generate AI summaries in seconds, and ensure your team never drops an action item.
            </p>

            {/* Features List (Wireframe requirement) */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Real-time 95%+ Transcription</h4>
                  <p className="text-xs text-slate-400">Contextual speech-to-text with multi-speaker identification.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Instant AI Summaries & Actions</h4>
                  <p className="text-xs text-slate-400">Extracts key decisions and assigns deliverables automatically.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Seamless Team Sync</h4>
                  <p className="text-xs text-slate-400">Integrates with Zoom, Google Meet, Teams, and Slack.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Quote Section (Wireframe requirement: Features + Quotes) */}
          <div className="pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic mb-3 leading-relaxed">
                "MeetingMind has saved our product team 10+ hours every week. The instant AI summaries keep all our engineers aligned effortlessly."
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Sarah Johnson</span>
                <span className="text-slate-500">VP of Product, Apex</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                Enterprise Grade Security
              </span>
              <span>•</span>
              <span>2,000+ Teams Active</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Wireframe 2: Sign In Form) */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-slate-900/60 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between mb-4">
            {/* Mode Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <button
                type="button"
                onClick={() => setAuthMode('clerk')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  authMode === 'clerk'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Clerk Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('direct')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  authMode === 'direct'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Direct / Email
              </button>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
          </div>

          {/* Quick Notice: Phone Verification issue guidance & 1-click bypass */}
          <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/30 text-xs text-slate-300 shadow-lg">
            <div className="flex items-start gap-2.5">
              <span className="text-base leading-none mt-0.5">🇮🇳</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-amber-300">India Number / Phone Verification Blocked?</p>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Clerk free tier restricts SMS verification for Indian (+91) numbers. You can bypass this in 1 click to view your dashboard now, or turn off Phone Number in Clerk Dashboard.
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleQuickDemo}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/25 cursor-pointer active:scale-95"
                  >
                    <span>⚡ 1-Click Instant Dashboard Access</span>
                    <span>→</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClerkGuide(!showClerkGuide)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700/80 transition-colors cursor-pointer"
                  >
                    {showClerkGuide ? 'Hide Clerk Instructions' : '⚙️ How to remove phone from Clerk'}
                  </button>
                </div>

                <AnimatePresence>
                  {showClerkGuide && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-slate-700/60 text-[11px] space-y-1.5 text-slate-300"
                    >
                      <p className="font-semibold text-emerald-400">Steps to remove Phone verification permanently in Clerk:</p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300">
                        <li>Open <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-medium">dashboard.clerk.com</a> and select your app.</li>
                        <li>Go to <strong>Configure &rarr; User &amp; Authentication &rarr; Email, phone, username</strong>.</li>
                        <li>Under <strong>Contact information</strong>, turn <strong>Phone number OFF</strong> (set to "Don't use").</li>
                        <li>Ensure <strong>Email address</strong> is set to <strong>Required</strong> (with Password or Email code).</li>
                        <li>Click <strong>Save changes</strong>. Done! Refresh this page to sign in without phone.</li>
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="my-auto flex justify-center py-2">
            {authMode === 'clerk' ? (
              <ClerkSignIn routing="path" path="/SignIn" signUpUrl="/Signup" fallbackRedirectUrl="/dashboard" />
            ) : (
              <SignInform redirectTo="/dashboard" />
            )}
          </div>

          <div className="mt-6 text-center text-[11px] text-slate-500">
            By signing in, you agree to our{' '}
            <a href="#terms" className="text-slate-400 hover:underline">Terms</a> and{' '}
            <a href="#privacy" className="text-slate-400 hover:underline">Privacy Policy</a>.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Signin = SignIn;
export default SignIn;
