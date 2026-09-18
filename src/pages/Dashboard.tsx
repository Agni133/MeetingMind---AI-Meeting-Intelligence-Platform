import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/Authcontext';
import SideBar from '../components/dashboard/SideBar';
import Header from '../components/dashboard/Header';

// ─── Stat Card ───────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  color: 'emerald' | 'teal' | 'cyan' | 'violet';
  delay?: number;
}

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    trend: 'text-emerald-400',
    glow: 'shadow-emerald-500/10',
  },
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    icon: 'text-teal-400',
    trend: 'text-teal-400',
    glow: 'shadow-teal-500/10',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'text-cyan-400',
    trend: 'text-cyan-400',
    glow: 'shadow-cyan-500/10',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    icon: 'text-violet-400',
    trend: 'text-violet-400',
    glow: 'shadow-violet-500/10',
  },
};

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, icon, trend, trendUp, color, delay = 0 }) => {
  const c = colorMap[color];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`relative bg-slate-900/80 border ${c.border} rounded-2xl p-5 shadow-xl ${c.glow} backdrop-blur-sm overflow-hidden group`}
    >
      {/* Background glow on hover */}
      <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

      <div className="relative flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.icon}`}>
          {icon}
        </div>
        <span className={`flex items-center gap-1 text-xs font-bold ${trendUp ? c.trend : 'text-rose-400'} bg-slate-800/80 border ${trendUp ? c.border : 'border-rose-500/20'} px-2 py-0.5 rounded-lg`}>
          {trendUp ? (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {trend}
        </span>
      </div>
      <div className="relative">
        <motion.p
          className="text-3xl font-extrabold text-white tracking-tight"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
        >
          {value}
        </motion.p>
        <p className="text-sm font-semibold text-slate-300 mt-0.5">{label}</p>
        <p className="text-xs text-slate-500 mt-1">{sub}</p>
      </div>
    </motion.div>
  );
};

// ─── Meeting Trend Chart (SVG sparkline) ─────────────────────────────────────
const MeetingTrendChart: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];
  const data = [18, 25, 21, 34, 28, 42, 38, 51];
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);

  const width = 400;
  const height = 100;
  const padX = 20;
  const padY = 10;

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * (width - 2 * padX);
    const y = padY + (1 - (v - minVal) / (maxVal - minVal)) * (height - 2 * padY);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M ${points[0]} L ${points.join(' L ')} L ${parseFloat(points[points.length - 1].split(',')[0])},${height} L ${parseFloat(points[0].split(',')[0])},${height} Z`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white">Meeting Trends</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 8 weeks</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-bold text-emerald-400">+34% MoM</span>
        </div>
      </div>

      <div className="relative">
        <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          <defs>
            <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((t, i) => (
            <line
              key={i}
              x1={padX}
              y1={padY + t * (height - 2 * padY)}
              x2={width - padX}
              y2={padY + t * (height - 2 * padY)}
              stroke="#1e293b"
              strokeWidth="1"
            />
          ))}

          {/* Area fill */}
          <motion.path
            d={areaD}
            fill="url(#trendGrad)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Dots */}
          {points.map((pt, i) => {
            const [cx, cy] = pt.split(',').map(Number);
            return (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={4}
                fill="#10b981"
                stroke="#020617"
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
              />
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-4">
          {weeks.map((w) => (
            <span key={w} className="text-[10px] text-slate-600">{w}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Accuracy Donut Chart ─────────────────────────────────────────────────────
const AccuracyDonut: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const accuracy = 95;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (accuracy / 100) * circumference;

  const segments = [
    { label: 'English', pct: 45, color: '#10b981' },
    { label: 'Spanish', pct: 28, color: '#06b6d4' },
    { label: 'French', pct: 18, color: '#818cf8' },
    { label: 'Others', pct: 9, color: '#f59e0b' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-white">AI Accuracy</h3>
          <p className="text-xs text-slate-500 mt-0.5">Transcription by language</p>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-lg font-mono">This Month</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut */}
        <div className="relative shrink-0">
          <svg width="110" height="110" viewBox="0 0 110 110">
            {/* Track */}
            <circle cx="55" cy="55" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
            {/* Progress */}
            <motion.circle
              cx="55"
              cy="55"
              r={radius}
              fill="none"
              stroke="url(#donutGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset: circumference - strokeDash } : {}}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              transform="rotate(-90 55 55)"
            />
            <defs>
              <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <text x="55" y="51" textAnchor="middle" className="fill-white text-2xl font-extrabold" style={{ fontSize: '18px', fontWeight: 800, fill: 'white' }}>
              {accuracy}%
            </text>
            <text x="55" y="64" textAnchor="middle" style={{ fontSize: '8px', fill: '#64748b' }}>
              Accuracy
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-2.5 flex-1">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-slate-400">{s.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${s.pct}%` } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-300 w-7 text-right">{s.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Recent Meetings Table ────────────────────────────────────────────────────
const recentMeetings = [
  {
    id: 1,
    title: 'Q3 Planning Session',
    type: 'Zoom',
    duration: '45 min',
    date: '12 Feb',
    attendees: 6,
    status: 'completed',
    accuracy: '97%',
    actions: 8,
  },
  {
    id: 2,
    title: 'Design Review',
    type: 'Google Meet',
    duration: '30 min',
    date: '11 Feb',
    attendees: 4,
    status: 'completed',
    accuracy: '95%',
    actions: 5,
  },
  {
    id: 3,
    title: 'Sprint Retrospective',
    type: 'Teams',
    duration: '60 min',
    date: '10 Feb',
    attendees: 8,
    status: 'completed',
    accuracy: '94%',
    actions: 12,
  },
  {
    id: 4,
    title: 'Sales Pipeline Sync',
    type: 'Zoom',
    duration: '20 min',
    date: '9 Feb',
    attendees: 3,
    status: 'processing',
    accuracy: '—',
    actions: 0,
  },
  {
    id: 5,
    title: 'Investor Update Call',
    type: 'Google Meet',
    duration: '90 min',
    date: '8 Feb',
    attendees: 5,
    status: 'completed',
    accuracy: '98%',
    actions: 4,
  },
];

const platformBadge: Record<string, string> = {
  Zoom: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'Google Meet': 'bg-green-500/10 border-green-500/20 text-green-400',
  Teams: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
};

const RecentMeetings: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-sm font-bold text-white">Recent Meetings</h3>
          <p className="text-xs text-slate-500 mt-0.5">Your last 5 recorded sessions</p>
        </div>
        <Link
          to="/dashboard/meetings"
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          View all
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800/50">
              {['Meeting', 'Platform', 'Duration', 'Date', 'Attendees', 'Accuracy', 'Status', ''].map((h) => (
                <th key={h} className="text-left text-[10px] font-bold uppercase tracking-widest text-slate-500 px-5 py-3 first:pl-5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentMeetings.map((m, i) => (
              <motion.tr
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/30 transition-colors group"
              >
                {/* Title */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-sm">
                      🎙️
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">{m.title}</p>
                      <p className="text-[10px] text-slate-500">{m.actions} action items</p>
                    </div>
                  </div>
                </td>
                {/* Platform */}
                <td className="px-5 py-3.5">
                  <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-lg ${platformBadge[m.type]}`}>{m.type}</span>
                </td>
                {/* Duration */}
                <td className="px-5 py-3.5">
                  <span className="text-xs text-slate-400">{m.duration}</span>
                </td>
                {/* Date */}
                <td className="px-5 py-3.5">
                  <span className="text-xs text-slate-400">{m.date}</span>
                </td>
                {/* Attendees */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs text-slate-400">{m.attendees}</span>
                  </div>
                </td>
                {/* Accuracy */}
                <td className="px-5 py-3.5">
                  <span className="text-xs font-bold text-emerald-400">{m.accuracy}</span>
                </td>
                {/* Status */}
                <td className="px-5 py-3.5">
                  {m.status === 'completed' ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Done
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Processing
                    </span>
                  )}
                </td>
                {/* Action */}
                <td className="px-5 py-3.5">
                  <button className="text-[11px] font-semibold text-slate-400 hover:text-emerald-400 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 px-2.5 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    View →
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// ─── Live AI Activity Feed ────────────────────────────────────────────────────
const ActivityFeed: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const activities = [
    { icon: '🎙️', text: 'Transcript generated for "Q3 Planning"', time: '2m ago', color: 'emerald' },
    { icon: '✅', text: 'Action item auto-assigned to David P.', time: '15m ago', color: 'teal' },
    { icon: '📊', text: 'Monthly accuracy report ready', time: '1h ago', color: 'cyan' },
    { icon: '🔔', text: 'Design Review summary shared to Slack', time: '2h ago', color: 'violet' },
    { icon: '🎯', text: '3 decisions extracted from Sprint Retro', time: '3h ago', color: 'emerald' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">AI Activity</h3>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Live
        </span>
      </div>

      <div className="relative space-y-0">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-800" />

        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            className="flex items-start gap-3 py-2.5 relative"
          >
            {/* Dot on timeline */}
            <div className="relative z-10 w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sm shrink-0">
              {a.icon}
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-xs text-slate-300 leading-snug">{a.text}</p>
              <p className="text-[10px] text-slate-600 mt-0.5">{a.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Team Members Widget ──────────────────────────────────────────────────────
const teamMembers = [
  { name: 'Sarah Johnson', role: 'VP Product', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80', meetings: 18, active: true },
  { name: 'David Patel', role: 'Eng Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80', meetings: 24, active: true },
  { name: 'Emily Chen', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80', meetings: 12, active: false },
  { name: 'Marcus Lee', role: 'Sales', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80', meetings: 31, active: true },
];

const TeamWidget: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Team Members</h3>
        <span className="text-[10px] text-slate-400 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-lg">4 active</span>
      </div>
      <div className="space-y-3">
        {teamMembers.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.06 }}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/40 transition-colors cursor-pointer group"
          >
            <div className="relative shrink-0">
              <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-emerald-500/30 transition-all" />
              {m.active && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-white transition-colors">{m.name}</p>
              <p className="text-[10px] text-slate-500">{m.role}</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
              {m.meetings} mtgs
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Close mobile sidebar on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileSidebarOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const stats: StatCardProps[] = [
    {
      label: 'Total Meetings',
      value: '1,024',
      sub: 'All time recorded sessions',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      trend: '12%',
      trendUp: true,
      color: 'emerald',
      delay: 0,
    },
    {
      label: 'AI Accuracy',
      value: '95%',
      sub: 'Average transcription quality',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      trend: '2.1%',
      trendUp: true,
      color: 'teal',
      delay: 0.07,
    },
    {
      label: 'Hours Saved',
      value: '42h',
      sub: 'This month vs manual notes',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      trend: '8h',
      trendUp: true,
      color: 'cyan',
      delay: 0.14,
    },
    {
      label: 'Team Members',
      value: '8',
      sub: 'Active workspace users',
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      trend: '2',
      trendUp: true,
      color: 'violet',
      delay: 0.21,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-60 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-60 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      {/* ── Sidebar (Desktop) ── */}
      <div className="hidden md:flex h-screen sticky top-0 z-30">
        <SideBar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              key="mobile-sidebar"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-60 md:hidden"
            >
              <SideBar collapsed={false} onToggle={() => setMobileSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-hidden">
        <Header
          onSidebarToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6 space-y-6">
          {/* Quick Alert Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <p className="text-xs font-semibold text-slate-200">
                <span className="text-emerald-400">New:</span> Sprint Retro recording is ready — 12 action items extracted automatically.
              </p>
            </div>
            <button className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ml-4">
              View now →
            </button>
          </motion.div>

          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div className="grid lg:grid-cols-2 gap-4">
            <MeetingTrendChart />
            <AccuracyDonut />
          </div>

          {/* ── Main Table + Side Widgets ── */}
          <div className="grid xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <RecentMeetings />
            </div>
            <div className="space-y-4">
              <ActivityFeed />
              <TeamWidget />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
