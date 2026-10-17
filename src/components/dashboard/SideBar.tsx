import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SideBarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  onUpgrade?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onToggle, onUpgrade }) => {
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      path: '/dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'meetings',
      label: 'Meetings',
      path: '/dashboard/meetings',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'action-items',
      label: 'Action Items',
      path: '/dashboard/action-items',
      badge: '5',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'integrations',
      label: 'Integrations',
      path: '/dashboard/integrations',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      label: 'Calendar',
      path: '/dashboard/calendar',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/dashboard/settings',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-60 h-full bg-slate-950/95 backdrop-blur-2xl text-slate-300 flex flex-col justify-between select-none border-r border-slate-800/80">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/10">
              <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
            <div>
              <div className="text-white font-extrabold text-[16px] tracking-tight leading-none group-hover:text-emerald-300 transition-colors">
                MeetingMind
              </div>
              <div className="text-slate-500 text-[10px] tracking-tight mt-1 leading-none">
                AI Meeting Intelligence
              </div>
            </div>
          </Link>

          {/* Close button for mobile drawer */}
          {onToggle && (
            <button
              onClick={onToggle}
              className="md:hidden w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.id === 'home' &&
                (location.pathname === '/dashboard' || location.pathname === '/dashboard/'));
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => onToggle?.()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs shadow-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Upgrade to Pro Card */}
      <div className="p-3 mb-2">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-emerald-500/20 space-y-3 relative overflow-hidden group shadow-xl shadow-black/40">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Pro Plan
            </span>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs leading-tight">Upgrade to Pro</h4>
            <p className="text-slate-400 text-[11px] mt-1 leading-snug">
              Unlock unlimited AI summaries, live translation &amp; CRM sync.
            </p>
          </div>

          <button
            onClick={onUpgrade}
            className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
