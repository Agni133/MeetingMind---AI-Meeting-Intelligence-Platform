import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SignUp as ClerkSignUp } from '@clerk/react';
import { AIMeetingMindLogo } from './SignIn';
import { useAuth } from '../context/Authcontext';
import Signupform from '../components/common/Signupform';

export const Signup: React.FC = () => {
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
      {/* Background Glow Elements (Matching Landing Page Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-180px] right-[-150px] w-[520px] h-[520px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-180px] left-[-150px] w-[550px] h-[550px] bg-green-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Main Container Card (Wireframe 3 Dual-panel layout) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2"
      >
        {/* LEFT HERO SECTION (Wireframe 3: Logo, Left Hero, Trust Indicators, Stats: 95%, 10ms, 99.9%) */}
        <div className="relative p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/40 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="mb-8">
              <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
                <AIMeetingMindLogo size="lg" withText={true} />
              </Link>
            </div>

            {/* Left Hero Section Badge & Heading */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-emerald-400 text-xs font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Join 2,000+ Innovative Teams
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Unlock the Next Generation of{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                Meeting Intelligence
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Automatically transcribe discussions, summarize decisions, and assign action items in real time with precision AI.
            </p>

            {/* WIREFRAME STATS: 95%, 10ms, 99.9% */}
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Proven Platform Performance
              </div>
              <div className="grid grid-cols-3 gap-3">
                {/* Stat 1: 95% */}
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/30 transition-colors">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
                    95%
                  </div>
                  <div className="text-[11px] font-semibold text-slate-200 mt-1">Accuracy</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Speech-to-text precision</div>
                </div>

                {/* Stat 2: 10ms */}
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/30 transition-colors">
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 tracking-tight">
                    10ms
                  </div>
                  <div className="text-[11px] font-semibold text-slate-200 mt-1">Latency</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Real-time processing</div>
                </div>

                {/* Stat 3: 99.9% */}
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 hover:border-emerald-500/30 transition-colors">
                  <div className="text-2xl sm:text-3xl font-extrabold text-green-400 tracking-tight">
                    99.9%
                  </div>
                  <div className="text-[11px] font-semibold text-slate-200 mt-1">Uptime</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Guaranteed enterprise SLA</div>
                </div>
              </div>
            </div>

            {/* Mini AI Extraction Visual Preview */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-slate-200">Live Meeting Demo</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AI Active
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>4 action items assigned to engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>Executive 2-minute summary generated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators (Wireframe requirement) */}
          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                <span>SOC-2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>GDPR & CCPA Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION (Wireframe 3: Create Account Form) */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-slate-900/60 overflow-y-auto max-h-[90vh]">
          <div className="flex items-center justify-between mb-3">
            {/* Mode Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <button
                type="button"
                onClick={() => setAuthMode('clerk')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${authMode === 'clerk'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                Clerk Sign Up
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('direct')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${authMode === 'direct'
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
                        <li>Click <strong>Save changes</strong>. Done! Refresh this page to sign up without phone.</li>
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="my-auto flex justify-center py-2">
            {authMode === 'clerk' ? (
              <ClerkSignUp routing="path" path="/Signup" signInUrl="/SignIn" fallbackRedirectUrl="/dashboard" />
            ) : (
              <Signupform redirectTo="/dashboard" />
            )}
          </div>

          <div className="mt-6 text-center text-[11px] text-slate-500">
            Protected by enterprise encryption. No credit card required for trial.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const SignUp = Signup;
export default Signup;