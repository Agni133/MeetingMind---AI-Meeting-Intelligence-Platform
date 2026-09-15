import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Show, SignUpButton } from '@clerk/react';

const Hero = () => {
  const [activeTab, setActiveTab] = useState<'transcript' | 'actions' | 'summary'>('transcript');
  const [audioBars, setAudioBars] = useState<number[]>([35, 60, 45, 80, 65, 95, 50, 75, 40, 85, 60, 90, 45, 70, 55, 80]);

  // Subtle live audio waveform simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAudioBars(prev =>
        prev.map(() => Math.floor(Math.random() * 65) + 25)
      );
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 z-10 text-center lg:text-left"
          >
            {/* Live Status Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm shadow-emerald-500/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              AI Meeting Intelligence
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6"
            >
              Deliver the{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Perfect Insight
              </span>{' '}
              from Every Meeting
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-300/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8"
            >
              Capture discussions automatically, generate executive summaries in seconds, and ensure your team never drops an action item. 95%+ speech precision across all platforms.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start"
            >
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-[0.99] transition-all duration-200 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 cursor-pointer group">
                    <span>Start Free Trial</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-300 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5"
                >
                  <span>Go to Workspace</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </Show>

              <button
                onClick={() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Explore Features</span>
              </button>
            </motion.div>

            {/* Trust Indicator & User Avatars */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-slate-400"
            >
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Sarah"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="David"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-950 object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Emily"
                />
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-bold text-emerald-300 ring-2 ring-slate-950">
                  +2k
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold text-slate-200">4.9/5</span>
                <span className="text-slate-500">from 2,000+ teams</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT LIVE AI DASHBOARD CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative z-10"
          >
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl opacity-75" />

            <div className="relative bg-slate-900/90 border border-slate-800 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-7">
              {/* Card Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>Product Roadmap Sync</span>
                      <span className="text-[10px] font-normal text-slate-400">(Zoom)</span>
                    </div>
                    <div className="text-[11px] text-slate-400">Duration: 34:12 • 4 Speakers Active</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-semibold">
                  AI Active
                </span>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-5">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono">
                  <span>SPEECH STREAM (96.4% CONFIDENCE)</span>
                  <span className="text-emerald-400 font-bold">12ms LATENCY</span>
                </div>
                <div className="flex items-center justify-between h-9 gap-1 px-1">
                  {audioBars.map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className="w-full bg-gradient-to-t from-emerald-500 via-teal-400 to-cyan-300 rounded-full transition-all duration-300"
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Tabs inside Card */}
              <div className="flex rounded-xl bg-slate-950/70 p-1 mb-5 border border-slate-800/80">
                {(['transcript', 'actions', 'summary'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${activeTab === tab
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[140px] space-y-2.5">
                {activeTab === 'transcript' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-emerald-400">Sarah Johnson (VP Product)</span>
                        <span className="text-[10px] text-slate-500 font-mono">10:42:15 AM</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        "Let's ensure Clerk authentication is fully active before our Friday sprint demo."
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-teal-300">David Patel (Eng Lead)</span>
                        <span className="text-[10px] text-slate-500 font-mono">10:42:28 AM</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        "Confirmed. The SDK is configured and the routes are protected with zero regression."
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'actions' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">
                        ✓
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-100">Review Clerk Auth Scaffolding</div>
                        <div className="text-[11px] text-slate-400">Assigned to: David P. • Due: Today 5 PM</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">
                        ✓
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-100">Publish Sprint Summary to Slack</div>
                        <div className="text-[11px] text-slate-400">Automated by MeetingMind AI Bot</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'summary' && (
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs text-slate-300 space-y-2">
                    <div className="font-bold text-emerald-400">Executive TL;DR:</div>
                    <p className="text-slate-300 leading-relaxed">
                      Team achieved 100% sprint deliverables. Authentication migration is ready for staging deployment. Next meeting scheduled for Monday at 10 AM.
                    </p>
                  </div>
                )}
              </div>

              {/* Floating Stat Pill (Top Right) */}
              <div className="absolute -top-4 -right-4 bg-slate-900 border border-slate-700/80 shadow-2xl rounded-2xl p-3 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">+42% Velocity</div>
                  <div className="text-[9px] text-slate-400">Engineering sync</div>
                </div>
              </div>

              {/* Floating Stat Pill (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 bg-slate-900 border border-slate-700/80 shadow-2xl rounded-2xl p-3 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">99.4% Accuracy</div>
                  <div className="text-[9px] text-slate-400">Multi-speaker recognition</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Integration Logo Strip */}
        <div className="mt-20 pt-10 border-t border-slate-800/80">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8">
            Works natively with your existing conference & work stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {['Zoom', 'Google Meet', 'Microsoft Teams', 'Slack', 'Notion'].map((tool, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-bold text-sm tracking-wide transition-colors">
                <span className="w-2 h-2 rounded-full bg-emerald-500/50" />
                {tool}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;


